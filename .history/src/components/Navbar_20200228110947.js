import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../firebase/index';
import { AuthUserContext } from '../session/index';

const Navbar = ({ firebase }) => {
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
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                    <a href="/" className="brand">
                            BS
                <span>Winner</span>
                        </a>
                    </Typography>
                </Toolbar>
                {renderMenu(authUser, firebase)}
            </AppBar>
        )}
        </AuthUserContext.Consumer>
    );
};

export default withFirebase(Navbar);
