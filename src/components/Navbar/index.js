import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { AuthUserContext } from '../../session/index';
import { withFirebase } from '../../firebase/index';
import * as ROUTER from '../../constants/index';

const useStyles = makeStyles((theme) => ({
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

const Navbar = ({ firebase, history, handleToggleTheme, theme }) => {
    const classes = useStyles();
    const [isAdmin, setAdmin] = useState(false);
    const navBarBtns = [];

    const renderMenu = (authUser, firebase) => {
        firebase.database.ref('admin').on('value', (adminInfo) => {
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
                    <Button onClick={pushHistory(ROUTER.HOME)}>Home</Button>
                    <Button onClick={pushHistory(ROUTER.ADMIN)}>Admin</Button>
                    <Button onClick={firebase.doSignOut}>Log out</Button>
                </div>
            );
        }

        return (
            <div>
                <Button>
                    <Link to="/" className="waves-effect sidenav-close">
                        Home
                    </Link>
                </Button>
                <Button onClick={firebase.doSignOut}>Log out</Button>
            </div>
        );

        return navBarBtns;
    };

    function pushHistory(location) {
        return () => history.push(location);
    }

    return (
        <AuthUserContext.Consumer>
            {(authUser) => (
                <AppBar className={classes.root} color="inherit" position="static">
                    <Toolbar>
                        <img className={classes.title} alt="bs" src={require('../../images/logo.svg')} />
                        <IconButton color="inherit" onClick={handleToggleTheme}>
                            {theme.palette.type === 'light' ? (
                                <Brightness4Icon />
                            ) : (
                                <Brightness7Icon />
                            )}
                        </IconButton>
                        {renderMenu(authUser, firebase)}
                    </Toolbar>
                </AppBar>
            )}
        </AuthUserContext.Consumer>
    );
};

export default withRouter(withFirebase(Navbar));
