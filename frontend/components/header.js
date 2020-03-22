import Link from 'next/link'
import {Link as UILink} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


const linkStyle = {
    marginRight : 15
}

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  

const make_headers = () =>
{
    return ([
        {url: "/", id : 'home', name : "Home"},
        {url: '/sample' , id: 'sample', name : "API Sample"}
    ])

}

const MaterialLink = (props) =>
{
    return (
        <>
            <Typography>
                <Link href = {props.data.url} >
                    <a>{props.data.name}</a>
                </Link>
            </Typography>
            <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }
        a {
          text-decoration: none;
          color: black;
          padding-right: 50px;
        }
        a:hover {
          opacity: 0.6;
        }
      `}</style>
            
        </>
    )
}

const Header = () => { 
    const classes = useStyles();
    const nav_headers = make_headers();

    return (
        <div classes = {classes.root}>
            <AppBar position = 'static'>
                <Toolbar>
                    {nav_headers.map(nav_link =>
                        // <Link id = {nav_headers.id} href = {nav_link.url} >
                        //     {nav_link.name}
                        // </Link>

                        <MaterialLink key = {nav_link.id} data = {nav_link} />
                        )}
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default Header;