const jsondb = require('node-json-db')
const express = require('express')
const corona_lib = require('./lib')
const app = express()
const port = 8080

app.get('/api/v1/time_series', function (req, res) {
    res.json(load_db())
})

app.get('/api/v1/country_totals', function (req, res) {
    res.json(country_wide_data())
})


function load_db()
{   
    let db = new jsondb.JsonDB('db/corona_data_pure.json', true, true);

    let corona_data = db.getData("/data1/time_series")

    return corona_data;

    // console.log("all done here!");
}



// country_wide_data()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// corona_lib.update_db()
