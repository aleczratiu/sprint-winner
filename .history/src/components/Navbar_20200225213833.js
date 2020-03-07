import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../firebase/index';
import { AuthUserContext } from '../session/index';

const Navbar = ({ firebase }) => {
    const [isAdmin, setAdmin] = useState(false);
    const renderMenu = (authUser, firebase) => {
        firebase.database.ref('admin').once('value', (modelInfo) => {
            setAdmin(modelInfo.email !== authUser.email);
        });

        if (!authUser || !isAdmin) {
            return null;
        }

        return (
            <ul className="right hide-on-med-and-down">
                <li>
                    <Link to="/admin" className="waves-effect sidenav-close">
                    Admin
            </Link>
              </li>
          </ul>
        );
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
                          <ul className="right hide-on-med-and-down">
                              <li>
                                  <Link to="/">Home</Link>
                                </li>
                            </ul>
                          {renderMenu(authUser, firebase)}
                        </div>
                    </nav>
                </div>
            )}
        </AuthUserContext.Consumer>
    );
};

export default withFirebase(Navbar);
