import Layout from '../components/MyLayout'
import LineChart from '../components/visComponents/linechart'

export default function About(props) {

  let totals = props.totals;
  let italy_totals = totals.Italy;
  return (
    <div>
        <Layout>
            <p>This is the about page with some info found from the next API</p>
            {/* <LineChart /> */}

            <ul>
              <li>

              </li>
            </ul>
        </Layout>
    </div>
  );
}

let CountrySummary = (country_data, country_totals) => {

}