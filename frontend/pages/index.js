import Layout from '../components/MyLayout';
import Link from 'next/link';

/*
TODO add no SSR for both the leaflet map and the plotly js plots. Example below



import dynamic from 'next/dynamic'

const DynamicPlot = dynamic(import('../components/plot'), {
  ssr: false
})

*/

function getPages(){
  return [
    {id: "sample", url:'/sample', title : "Sample Covid Summary"}
  ]
}

 const DirectLink = ({page}) =>(
   <li>
     <Link href ={page.url}>
       <a>{page.title}</a>
     </Link>
   </li>
 )
 
 export default function Index() {
   debugger;

   return (
     <Layout>
       <h1>COVID-19 Quick site</h1>
       <p>
         This page has some sample information and links on using the current API
          The link below takes to a page using sample information gathered from the data API 
       </p>

         {getPages().map(post => (
           <DirectLink key={post.id} page={post} />
         ))}

         <p>
           The button below links to the API url. Calling an HTTP request to the url below from any application will yield the following json response <br/>
           <a href = '/api/time_series'>API Call</a>
         </p>
       <style jsx>{`
         h1,
         a {
           font-family: 'Arial';
         }
 
         ul {
           padding: 0;
         }
 
         li {
           list-style: none;
           margin: 5px 0;
         }
 
         a {
           text-decoration: none;
           color: blue;
         }
 
         a:hover {
           opacity: 0.6;
         }
       `}</style>
     </Layout>
   );
 }