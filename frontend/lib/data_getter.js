const jsondb = require('node-json-db')
const corona_lib = require('./corona_parser')
const config = require('node-json-db/dist/lib/JsonDBConfig')




async function update_db( data_path = "")
{  
    data_path = data_path == "" ? "/data1/time_series" : data_path
    corona_data =  await corona_lib.parse_time_series().catch(err => console.log(err))
    let db = new jsondb.JsonDB(new config.Config('lib/db/corona_data_pure.json', true, true, '/')  )

    db.push(data_path, corona_data );

}

function get_corona_data()
{   
    let db = new jsondb.JsonDB('lib/db/corona_data_pure.json', true, true);
    let corona_data = db.getData("/data1/time_series")
    return corona_data;
}

module.exports = {
    get_corona_data : get_corona_data,
    update_db : update_db
}

