import React, { Fragment, useEffect, useContext } from 'react';
import { store } from '../context/StateProvider'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { state } = useContext(store);
  useEffect(() => {
    const elems = document.querySelectorAll('.sidenav');
    window.M.Sidenav.init(elems, { edge: 'right' });
  });

  function handleNav() {
      if
  }

  return (
    <Fragment>
      <nav className='z-depth-0'>
        <div className='nav-wrapper'>
          <a href='/' className='brand'>
            Sprint<span>Winner</span>
          </a>
          <a
            href='#!'
            data-target='slide-out'
            className='right sidenav-trigger'
          >
            <i className='material-icons'>menu</i>
          </a>
          <ul className='right hide-on-med-and-down'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
          </ul>
        </div>
      </nav>

      <ul id='slide-out' className='sidenav'>
        <li>
          <Link to='/' className='waves-effect sidenav-close'>
            <i className='material-icons'>home</i>Home
          </Link>
        </li>
        <li>
          <Link to='/about' className='waves-effect sidenav-close'>
            <i className='material-icons'>business</i>About
          </Link>
        </li>
        <li>
          <Link to='/contact' className='waves-effect sidenav-close'>
            <i className='material-icons'>mail</i>Contact
          </Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default Navbar;
