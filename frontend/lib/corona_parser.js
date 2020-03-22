/*
Corona Github Repository Data Parser

A set of library functions meant to parse the Johns Hopkins University (JHU) COVID-19 Rate repositories
found at  https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series
HTTP requests are made on the raw mode of the CSV files and the files are parsed and returns an object with the following hierarchy:

country_data/time_series_labels -> Country Name -> providences/State Names -> data labels (confirmed cases, dead cases, recovered cases) ->

In a nutshell each providence/State of a nation as given by the JHU data carries with it data on the number of confirmed, dead, and recovered 
COVID-19 Cases

*/

const fetch = require('node-fetch')
const Papa = require('papaparse')

function calculate_country_totals(data, data_label)
{
    // function that compiles all data 

    let country_data = data.data;
    let labels = data.labels;

    function merge_providence_data(country_data, country_key, label_idx, total_country_data, data_label)
    {   
      
        let country = country_data[country_key];
        let providence_keys = Object.keys(country.providences)

        let accumulator = (acc, curr) => acc + curr[label_idx]

        let accum = providence_keys.map(providence_keys => country.providences[providence_keys].time_series[data_label]).reduce(accumulator,0)

        if(! total_country_data.hasOwnProperty(country_key))
        {
            total_country_data[country_key] = []
        }
        total_country_data[country_key].push(accum)
    }

    let total_country_data = {}
    for(let i = 0; i < labels.length; i++)
    {
        // iterate across all the time series data. 
        // for each label get the ith value and sum it into a total =
        let country_keys = Object.keys(country_data);
        country_keys.forEach = Array.prototype.forEach
        country_keys.forEach(country_key =>merge_providence_data(country_data, country_key, i, total_country_data, data_label))
    }

    
    return total_country_data
}


async function parse_github_url(url, data_label, time_series)
{
  // makes an http request at a url which we assume is part of JHU's github repository for COVID-19 Data
  //
  let raw_data = await(fetch(url).then(resp => resp.text()))
  let rows = Papa.parse(raw_data);
  let labels = rows.data.shift()

  // for each row,  create a time series hiearchy, country => region =>  time_series and location
  rows.data.forEeach = Array.prototype.forEach

  rows.data.forEeach( row => assign_row(row, labels, time_series.data, data_label) )
  // somewhat hacky way to reuse the labels which can break it the repos all have different dates....
  time_series.labels = labels.splice(4)
  
  let totals = calculate_country_totals(time_series,data_label)

  let country_keys = Object.keys(time_series.data);
  country_keys.forEach = Array.prototype.forEach
  country_keys.forEach(country_key => time_series.data[country_key].totals[data_label] = totals[country_key] )

  


  return
}


function assign_row(row, labels, time_series, data_label){
  // create a row for the country if the country has not been seen yet.
  if(!time_series.hasOwnProperty(row[1])){
    time_series[row[1]] = {providences : {} , totals : {} }
  }

  let country_data = time_series[row[1]];
   // for each row check if it has a "Providence or State" if not then we set providence to '0
  let providence = row[0] == "" ? 0 : row[0]
  let providence_data;
  if(!country_data.providences.hasOwnProperty(providence)){
    // if the country has no previous data on the current providence then we create 
    // a new providence object
    providence_data = {
      lat:row[2],
      long: row[3],
      time_series: {}
      }
  }
  else{
    providence_data = country_data.providences[providence];
  }

  providence_data.time_series[data_label] = []
  for(let i = 4; i < labels.length; i++)
  {
    // assign the time series data from january 22nd(start of epidemic) until the latest data available
    providence_data.time_series[data_label].push(parseInt(row[i]))
  }
  // probably redundant in cases where we reuse the old providence data  
  country_data.providences[providence] = providence_data 
}

async function parse_time_series()
{
  /*


  */
  // TODO CHANGE THE HIEARCHY Currently Country->label->providence/total->data should change into Country->providence/total->label->data
  let confirmed_cases_url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv";
  let deaths_url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv"
  let recovered_url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv"
  let time_series = {data:{}, labels: []}
  await parse_github_url(confirmed_cases_url, 'Confirmed', time_series).catch(err => console.log("The following error has occured parsing the repo", err))
  await parse_github_url(deaths_url, 'Deaths', time_series).catch(err => console.log("The following error has occured parsing the repo", err))
  await parse_github_url(recovered_url, 'Recovered', time_series).catch(err => console.log("The following error has occured parsing the repo", err))
  return time_series

  

    
}




/*
   
    */
    
  // parse_time_series()
    module.exports = {
      parse_time_series : parse_time_series
    }
