import Layout from '../components/MyLayout'
import LineChart from '../components/visComponents/linechart'

export default function About() {
  return (
    <div>
        <Layout>
            <p>This is the about page with a line chart!</p>
            {/* <LineChart /> */}
        </Layout>
    </div>
  );
}