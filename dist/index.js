"use strict";

var _nodeJsonDb = require("node-json-db");

var _JsonDBConfig = require("node-json-db/dist/lib/JsonDBConfig");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

var fetch = require('node-fetch');

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;

  while (currentDate < stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }

  return dateArray;
}

function parse_repository() {
  return _parse_repository.apply(this, arguments);
}

function _parse_repository() {
  _parse_repository = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var base_url, slice_date, date_arr, url_query_arr, output, i, url, raw_data, parsed_data, date, debug;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            slice_date = function _ref(date) {
              var string = date.toISOString();
              var slice = string.slice(0, 10);
              return slice.split('-');
            };

            // function that parses the JHU github repo for updated coronavirus data
            base_url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/"; // helper function that slices dates in to format for easy string formatting

            date_arr = getDates(new Date("January 22 2020"), new Date());
            date_arr = date_arr.map(slice_date); // get the date in year, month, day format
            // string format to get the urls required to get all the data

            url_query_arr = date_arr.map(function (date) {
              return base_url + "".concat(date[1], "-").concat(date[2], "-").concat(date[0], ".csv");
            });
            url_query_arr.pop();
            output = new Object();
            i = 0;

          case 8:
            if (!(i < url_query_arr.length)) {
              _context.next = 19;
              break;
            }

            url = url_query_arr[i];
            _context.next = 12;
            return fetch(url).then(function (resp) {
              return resp.text();
            });

          case 12:
            raw_data = _context.sent;
            parsed_data = corona_csv_parser(raw_data);
            date = date_arr[i];
            output["".concat(date[1], "-").concat(date[2], "-").concat(date[0])] = parsed_data;

          case 16:
            i++;
            _context.next = 8;
            break;

          case 19:
            debug = output;
            return _context.abrupt("return", debug);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parse_repository.apply(this, arguments);
}

function corona_csv_parser(data) {
  /*
  function that parses a CSV file from the JHU corona github repo and returns an object with an array of each
  row of the table marked by what category it belongs in
  */
  // start by taking apart the string from the new-line characters and 
  var lines = data.split('\n');
  var output_data = {
    data: []
  };
  var categories = lines.splice(0, 1);
  categories = categories[0].split(','); // iterate array across all categories available and parse the data into object format for ease of use

  for (var i = 0; i < lines.length; i++) {
    var row = new Object();
    var cur_line = lines[i].split(',');
    var index = cur_line[0].indexOf('\r');

    if (index != -1) {
      cur_line[0] = cur_line[0].slice(index); // removes \r
    }

    for (var j = 0; j < categories.length; j++) {
      if (isNaN(cur_line[j]) || cur_line[j] == "") {
        row[categories[j]] = cur_line[j];
      } else {
        row[categories[j]] = parseInt(cur_line[j]);
      }
    }

    output_data.data.push(row);
  }

  var debug = output_data;
  return debug;
}

var storeData = function storeData(data, path) {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

function update_db() {
  return _update_db.apply(this, arguments);
}

function _update_db() {
  _update_db = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var db;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return parse_repository()["catch"](function (err) {
              return console.log(err);
            });

          case 2:
            corona_data = _context2.sent;
            db = new _nodeJsonDb.JsonDB(new _JsonDBConfig.Config('db/corona_data_pure', true, true, '/')); // storeData(corona_data, 'db/corona_data_pure.json')

            db.push("/data1/pure_data", corona_data);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _update_db.apply(this, arguments);
}

update_db();