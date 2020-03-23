import Header from './header'

const layoutStyle = {
    margin : 20, 
    padding : 20, 
    // border : '1px solid #DDD'
}

const Layout  = props => (
    <div>
        <Header / >
            <div style = {layoutStyle}>
                {props.children}
            </div>
    </div>
)

export default Layout