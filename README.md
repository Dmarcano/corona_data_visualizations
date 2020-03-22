# Coronavirus NextJs dashboard

A next-js site that exposes an API for reading the JHU coronavirus time-series data and hopes to provide visualizations for the data.

## Installation (for dev only at the moment)

dependencies 
* node js
* npm (included with node)

use npm to install the required modules 

```console
cd frontend
npm install
```

once npm is done installing all the dependencies, run the next js server using

```console
npm run dev
```

## Data API

Anyone can consume the data API to get a formatted JSON representation of the JHU Covid-19 Case data. The API is consumed using the next-js server API route ```/api/time_series ```

This is time series data from the percieved onset of the outbreak to what has been most recently updated. 

The data is split into 3 main data labels.
* Confirmed cases
* cases that have lead to death
* cases that have lead to full recovery

The JSON Object takes the form of the following hiarchy

```

1) data: Contains general country data
    A) Country label
        a) providences /state labels -> coordinates/time_series -> data by label
        b) Totals by day -> data by label

2) labels: Array containing the dates of the time series
```

```javascript
{ 
    data: {
        US: {
            providences: {
                Washington: {
                    lat: "47.4009",
                    long: "-121.4905",
                    time_series :{
                        Confirmed : [...],
                        Deaths: [...],
                        Recovered : [...]
                    }
                },
                LA: {
                    ...
                }
            }
            totals:{
                Confirmed : [...],
                ...
            }
        },
        Canada : {
            ...
        }

    },
    labels : [...]
}
```


