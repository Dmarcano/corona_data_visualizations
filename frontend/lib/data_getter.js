/*
    Module that gives a simple API to update a JSON file based database and get JSON data from it./
*/

const jsondb = require('node-json-db')
const corona_lib = require('./corona_parser')
const config = require('node-json-db/dist/lib/JsonDBConfig')


const DEBUG = true; // this is for dev purposes

async function update_db( data_path = "")
{  
    let db_data_path = data_path == "" ? "/data1/time_series" : data_path
    db_path =  DEBUG == true ? 'db/corona_data_pure.json' : 'lib/db/corona_data_pure.json'
    corona_data =  await corona_lib.parse_time_series().catch(err => console.log(err))
    let db = new jsondb.JsonDB(new config.Config(db_path, true, true, '/')  )

    db.push(db_data_path, corona_data );

}

function get_corona_data(data_path = "")
{   
    let db_data_path = data_path == "" ? "/data1/time_series" : data_path
    let db_path =  DEBUG == true ? 'db/corona_data_pure.json' : 'lib/db/corona_data_pure.json'
    let db = new jsondb.JsonDB(db_path, true, true);
    let corona_data = db.getData(db_data_path)
    return corona_data;
}

update_db()

module.exports = {
    get_corona_data : get_corona_data,
    update_db : update_db
}

