import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Brewery from './pages/Brewery';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/search" component={Search} />
                <Route path="/brewery/:id" component={Brewery} />
                <Route path="/" exact component={() => <h1>Home Page</h1>} />
            </Switch>
        </Router>
    );
};

export default App;
