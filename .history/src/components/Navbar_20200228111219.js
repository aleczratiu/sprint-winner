import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../firebase/index';
import { AuthUserContext } from '../session/index';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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

const Navbar = ({ firebase }) => {
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
                <Button color="inherit">Admin</Button>
                <ul className="right">
                    <li>
                        <Link to="/admin" className="waves-effect sidenav-close">
                            Admin
                        </Link>
                    </li>
                </ul>
            );
        }

        return (
            <ul className="right">
                <li>
                    <a style={{ cursor: 'pointer' }} onClick={firebase.doSignOut}>Log out</a>
                </li>
            </ul>
        )

        return navBarBtns;
    };

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

export default withFirebase(Navbar);
