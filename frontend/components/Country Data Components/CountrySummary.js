/*
A component reponsible for displaying some small summary text about the cases in a country

Most likely to be contained within a card and redered when hovering over a country


data is passed into the component as a prop. Right now the following is passed

props = {
    country_name : "Country Name"
    country_data : {} ->data Object
    labels : []   -> Array of datetimes for the labels of the 
}

a Country data object looks lie

country_data : {
    Confirmed : []
    Deaths : []
    Recovered : []
}
*/

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'




const get_latest_totals = totals =>(
    {
        Confirmed: totals.Confirmed[totals.Confirmed.length - 1],
        Deaths: totals.Deaths[totals.Deaths.length - 1],
        Recovered: totals.Recovered[totals.Recovered.length - 1]
    }
)

const get_daily_new = country_data => {
    const confirmed_length = country_data.Confirmed.length;
    const death_length = country_data.Deaths.length;
    const recovered_length = country_data.Recovered.length;

    const confirmed_totals = country_data.Confirmed[confirmed_length - 1] - country_data.Confirmed[confirmed_length - 2];
    const death_totals = country_data.Deaths[death_length - 1] - country_data.Deaths[death_length - 2];
    const recovered_totals =  country_data.Recovered[recovered_length - 1] - country_data.Recovered[recovered_length - 2];

    return({
        Confirmed: confirmed_totals,
        Deaths: death_totals,
        Recovered: recovered_totals
    })
}

let CountrySummary = (props) => {
    // each country has the following hierarchy
    // providence : {prov: confirmed } , totals : {}
  
    // right now we are going to return a simple summary of the totals from one day to the next
    const country_data = props.country_data;
    const country_name = props.country_name;
    const labels = props.labels;
    const providences = country_data.providences;
    const totals = country_data.totals;
    const latest_totals = get_latest_totals(totals);
    const daily_new = get_daily_new(totals);
    const latest_date = labels[labels.length - 1]

    const styles = useStyles();
    return (
      <> 
        <Card className = {styles.root}>
            <CardContent>
                <Typography className = {styles.title} color = 'textPrimary'>
                   {country_name} New Case Statistics As of {latest_date}:
                </Typography>
                {/* <Typography className = {}>As of {}</Typography> */}
                <Typography className = {styles.content}>Total cases: {latest_totals.Confirmed} </Typography>
                <Typography className = {styles.content}> number of new cases: {daily_new.Confirmed} </Typography> 
            </CardContent>
        </Card> 
        
      </>
    )
  
  }

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      margin: 10,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 16,
      fontWeight : 'bold'
    },
    content : {
        fontSize : 16
    },
    pos: {
      marginBottom: 12,
    },
  });

export default CountrySummary;