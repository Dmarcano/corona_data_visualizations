const fetch = require('node-fetch')
const jsondb = require('node-json-db')
const Papa = require('papaparse')
const config = require('node-json-db/dist/lib/JsonDBConfig')

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate < stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}


async function parse_repository()
{
  // function that parses the JHU github repo for updated coronavirus data
  let base_url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/"
  // helper function that slices dates in to format for easy string formatting
  function slice_date(date){
    let string = date.toISOString()
    let slice = string.slice(0,10)
    return slice.split('-')
  }
  let date_arr = getDates( new Date("January 22 2020"), new Date())  
  date_arr = date_arr.map(slice_date) // get the date in year, month, day format
  // string format to get the urls required to get all the data
  let url_query_arr = date_arr.map(date => base_url +  `${date[1]}-${date[2]}-${date[0]}.csv`) 
  url_query_arr.pop()
  let output = new Object()
  
  for(let i = 0; i < url_query_arr.length; i++)
  {
    let url = url_query_arr[i];
    let raw_data = await(fetch(url).then(resp => resp.text()))
    
    let parsed_data = corona_csv_parser(raw_data)
    let date = date_arr[i];
    output[`${date[1]}-${date[2]}-${date[0]}`] = parsed_data
  }
  
  let debug = output 
  return debug
}


function corona_csv_parser(data){
    /*
    function that parses a CSV file from the JHU corona github repo and returns an object with an array of each
    row of the table marked by what category it belongs in
    */
    
    // start by taking apart the string from the new-line characters and 
    let lines = data.split('\n')
    let output_data = {data : [] };
    let categories = lines.splice(0,1)
    categories = categories[0].split(',')
    
    // iterate array across all categories available and parse the data into object format for ease of use
    for(let i = 0; i < lines.length; i++)
    {
     let row = new Object();
     let cur_line = lines[i].split(',');

     let index = cur_line[0].indexOf('\r') 

     if (index != - 1){
          cur_line[0] = cur_line[0].slice(index); // removes \r
     }
      for(let j = 0; j < categories.length; j++)
      {
        if ( isNaN(cur_line[j]) || cur_line[j] == ""  ){  
          row[categories[j]] = cur_line[j]
        }
        else{
          row[categories[j]] = parseInt(cur_line[j])
        }
      }
      output_data.data.push(row)
    }
    let debug = output_data
    return debug 
  }


async function update_db()
    {  

        corona_data =  await parse_time_series().catch(err => console.log(err))

        // let db = new JsonDB(new Config ('db/corona_data_pure', true, true, '/'))

        let db = new jsondb.JsonDB(new config.Config('db/corona_data_pure.json', true, true, '/')  )

        db.push("/data1/time_series", corona_data );

}


async function parse_time_series()
{
  let time_series_url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv";
  let raw_data = await(fetch(time_series_url).then(resp => resp.text()))
  let time_series = {data:{}, labels: [], totals: {}}

  let rows = Papa.parse(raw_data);
  // let rows = (raw_data.split('\n')).map(row => split_rows_sout_korea(row))
  let labels = rows.data.shift()

  // for each row,  create a time series hiearchy, country => region =>  time_series and location
  
  rows.data.forEeach = Array.prototype.forEach

  rows.data.forEeach( row => assign_row(row, labels, time_series.data) )
  time_series.labels = labels.splice(4)

  return time_series

  

}


function country_wide_data()
{
    // function that compiles all data 

    let data = load_db()

    let country_data = data.data;
    let labels = data.labels;

    function merge_providence_data(country_data, country_key, label_idx, total_country_data)
    {   
        let country = country_data[country_key];
        let providence_keys = Object.keys(country)

        let accumulator = (acc, curr) => acc + parseInt(curr[label_idx])

        let accum = providence_keys.map(providence_keys => country[providence_keys].time_series).reduce(accumulator,0)

        if(! total_country_data.hasOwnProperty(country_key))
        {
            total_country_data[country_key] = {}
        }

    
        total_country_data[country_key][label_idx] = accum
    }

    let total_country_data = {data : {}}
    for(let i = 0; i < labels.length; i++)
    {
        // iterate across all the time series data. 
        // for each label get the ith value and sum it into a total =
        let country_keys = Object.keys(country_data);
        country_keys.forEach = Array.prototype.forEach
        country_keys.forEach(country_key =>merge_providence_data(country_data, country_key, i, total_country_data.data))
    }

    total_country_data.labels = labels;
    return total_country_data
}

function assign_row(row, labels, time_series){
    // for each row check if it has a "Providence or State" if not then we set providence to '0
    var providence = row[0] == "" ? 0 : row[0]

    let providence_data = {
      lat:row[2],
      long: row[3],
      time_series: {}
    }

    for(let i = 4; i < labels.length; i++)
    {
      providence_data.time_series[i-4] = row[i]
    }

    if(!time_series.hasOwnProperty(row[1])){
      time_series[row[1]] = {}
    }
    
    time_series[row[1]][providence] = providence_data 
  }



    module.exports = {
      update_db : update_db,
      parse_time_series : parse_time_series
    }
