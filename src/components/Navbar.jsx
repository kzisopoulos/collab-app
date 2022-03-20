import './Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <h4>Collaborate App</h4>
        </li>

        {!user && (
          <>
            <li>
              {' '}
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        <li>
          {!isPending && user && (
            <button onClick={logout} className="btn">
              Logout
            </button>
          )}
          {isPending && user && (
            <button className="btn" disabled>
              Logging out
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
