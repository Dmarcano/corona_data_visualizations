import Layout from '../components/MyLayout';
import Link from 'next/link';

/*
code for dynamic url page

function getPosts() {
   return [
     { id: 'hello-nextjs', title: 'Hello Next.js' },
     { id: 'learn-nextjs', title: 'Learn Next.js is awesome' },
     { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT' }
   ];
 }
 
 const PostLink = ({ post }) => (
   <li>
     <Link href="/p/[id]" as={`/p/${post.id}`}>
       <a>{post.title}</a>
     </Link>
   </li>
 );
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
 
 export default function Blog() {
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