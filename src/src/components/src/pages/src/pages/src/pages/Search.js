import React, { useState } from 'react';
import { searchBreweries } from '../api';
import { Link } from 'react-router-dom';

const Search = () => {
    const [searchParams, setSearchParams] = useState({ by_city: '', by_name: '', by_type: '' });
    const [breweries, setBreweries] = useState([]);

    const handleChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    };

    const handleSearch = async () => {
        try {
            const { data } = await searchBreweries(searchParams);
            setBreweries(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <input type="text" name="by_city" onChange={handleChange} placeholder="City" />
            <input type="text" name="by_name" onChange={handleChange} placeholder="Name" />
            <input type="text" name="by_type" onChange={handleChange} placeholder="Type" />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {breweries.map((brewery) => (
                    <li key={brewery.id}>
                        <Link to={`/brewery/${brewery.id}`}>
                            {brewery.name} - {brewery.city}, {brewery.state}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
