import { useRouter } from 'next/router';
import Layout from '../components/MyLayout'


const Content = () =>{
    const router = useRouter()

    return(
        <div>
            <h1>{router.query.title}</h1>
            <p>this page has some more content</p>
        </div>
    )
}


const Page = () =>{
    return (
        <Layout>
          <Content/>
        </Layout>
    )
}

export default Page;