import Layout from '../components/MyLayout'
// import LineChart from '../components/visComponents/linechart'
import useSWR from 'swr';
import fetch from 'node-fetch'
import CountrySummary from '../components/Country Data Components/CountrySummary'


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
            
             
              {countries.map( (country_data, index) => ( 
                < CountrySummary  key ={ country_names[index]} country_name = {country_names[index]} country_data = {country_data} labels = {labels} />
              ))}
             
            
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





export default Sample;