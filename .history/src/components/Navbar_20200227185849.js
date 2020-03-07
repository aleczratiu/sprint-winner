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
            navBarBtns.push(
                <ul className="right">
                    <li>
                        <Link to="/admin" className="waves-effect sidenav-close">
                            Admin
                        </Link>
                    </li>
                </ul>
            );
        }

        navBarBtns.push(
            <li>
                <a style={{ cursor: 'pointer' }} onClick={firebase.doSignOut}>Log out</a>
            </li>
        )

        return navBarBtns;
    };

    return (
        <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <nav className="z-depth-0">
                    <div className="nav-wrapper">
                        <a href="/" className="brand">
                            BS
                <span>Winner</span>
                        </a>
                        <a
                            href="#!"
                            data-target="slide-out"
                            className="right sidenav-trigger"
                        >
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                        </ul>
                        {renderMenu(authUser, firebase) ? ...renderMenu(authUser, firebase) : null}
                    </div>
                </nav>
            </div>
        )}
        </AuthUserContext.Consumer>
    );
};

export default withFirebase(Navbar);
