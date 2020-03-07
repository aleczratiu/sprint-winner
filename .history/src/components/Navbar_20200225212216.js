import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../firebase/index';
import { AuthUserContext } from '../session/index';

const renderMenu = (authUser) => {
    if (!authUser) {
        return null;
    }

    return (
      <li>
          <Link to="/admin" className="waves-effect sidenav-close">
              Admin
        </Link>
        </li>
    );
};


const Navbar = ({ firebase }) => (
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
                  </div>
                  {renderMenu(authUser)}
              </nav>
          </div>
        )}
    </AuthUserContext.Consumer>
);

export default withFirebase(Navbar);
