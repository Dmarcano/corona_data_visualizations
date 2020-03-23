import Header from './header'
import Container from '@material-ui/core/Container'

const layoutStyle = {
    margin : 20, 
    padding : 20, 
    // border : '1px solid #DDD'
}

const Layout  = props => (
    <div>
        <Header / >
            <Container maxWidth="sm">
                {props.children}
            </Container>
    </div>
)

export default Layout