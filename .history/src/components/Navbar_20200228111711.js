import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../firebase/index';
import { AuthUserContext } from '../session/index';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import * as ROUTER from '../constants/index';

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

const Navbar = ({ firebase, history }) => {
    const classes = useStyles();
    const [isAdmin, setAdmin] = useState(false);
    const navBarBtns = [];
    const renderMenu = (authUser, firebase) => {
        firebase.database.ref('admin').once('value', (adminInfo) => {
            const adminEmail = adminInfo.val();
            if (adminEmail && authUser) {
                setAdmin(adminEmail.email === authUser.email);
            }
        });

        if (!authUser) {
            return null;
        }

        if (isAdmin) {
            return (
                <div>
                    <Button color="inherit">
                        <Link to="/" className="waves-effect sidenav-close">
                                Home
                        </Link>
                    </Button>
                    <Button color="inherit" onClick={pushHistory()}>
                        <Link to="/admin" className="waves-effect sidenav-close">
                                Admin
                        </Link>
                    </Button>
                    <Button color="inherit" onClick={firebase.doSignOut}>Log out</Button>
                </div>
            );
        }

        return (
            <div>
                <Button color="inherit">
                        <Link to="/" className="waves-effect sidenav-close">
                            Home
                    </Link>
                </Button>
                <Button color="inherit" onClick={firebase.doSignOut}>Log out</Button>
            </div>
        )

        return navBarBtns;
    };

    function pushHistory(location) {
        return () => history.push(location)
    }

    return (
        <AuthUserContext.Consumer>
        {authUser => (
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                         <a href="/" className="brand">
                            BS
                            <span>Winner</span>
                        </a>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>

                    </Typography>
                </Toolbar>
                {renderMenu(authUser, firebase)}
            </AppBar>
        )}
        </AuthUserContext.Consumer>
    );
};

export default withRouter(withFirebase(Navbar));
