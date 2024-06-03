import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/search">Search Breweries</Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
