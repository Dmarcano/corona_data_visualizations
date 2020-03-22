import Layout from '../components/MyLayout'
// import LineChart from '../components/visComponents/linechart'
import useSWR from 'swr';
import fetch from 'node-fetch'


const Sample = (props) =>{

  // const {props, err} = useSWR('api/time_series', fetcher)

  // console.log(props)/
  // console.log(err)
  
  // const data = props.data;

  const data = props.data.data;
  const labels = props.data.labels;

  const Italy = data.Italy;
  const USA = data.US;
  const SKorea = data['Korea, South']; // bracket notation because key has a comma ....

  const countries = [Italy, USA, SKorea]
  const country_names = ['Italy', 'USA', 'South Korea']

  return (
    <div>
        <Layout>
            <p>This is the about page with some info found from the COVID API. Right now hard coded for Italy, USA, South Korea</p>
            {/* <LineChart /> */}
            <UpdateDbButton/>
            <ul>
              <li>
              {countries.map( (country_data, index) => ( 
                < CountrySummary  key ={ country_names[index]} country_name = {country_names[index]} country_data = {country_data} labels = {labels} />
              ))}
              </li>
            </ul>
        </Layout>
    </div>
  );
}



export async function getServerSideProps(){
  const data = await fetch('http://localhost:3000/api/time_series').then( response =>
    response.json()
  )
  return {props : {data}}
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

  const confirmed_totals = totals.Confirmed;


  const new_cases = confirmed_totals[confirmed_totals.length - 1] - confirmed_totals[confirmed_totals.length - 2]

  return (
    <>  
      <h3>{country_name} stats </h3> 
      <p>total cases: {confirmed_totals[confirmed_totals.length - 1]} <br/> </p>
      <p>number of new cases: {new_cases} </p>
    </>
  )

}

let UpdateDbButton = () =>
{
  return (
    <>
      <p>The button will update the DB with the latest data from JHU repo</p>
      <button onClick={updateDbCallback}>Update Db</button>
    </>
  )
}

function updateDbCallback()
{

}

export default Sample;