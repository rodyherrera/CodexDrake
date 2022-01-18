/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * For related information - https://github.com/CodeWithRodi/CodexDrake/
 *
 * CodexDrake<Front> - A self-hosted optimized search engine built in JavaScript, safe 
 * and private, who is Google?, Bing?, Yahoo?, Qwant?, shut up and drink water :).
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 ****/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientRoutes } from '../../Infrastructure';
import SearchBar from '../../Components/SearchBar';
import './Home.css';

const Home = () => {
    const [GetQuery, SetQuery] = useState('');
    const Navigate = useNavigate();

    const HandleOnSubmit = (Event = undefined) => {
        (Event) && (Event.preventDefault());
        Navigate({
            pathname: ClientRoutes.Search,
            search: `?Query=${GetQuery}` 
        });
    };

    useEffect(() => {
        document.title = 'CodexDrake - Secure Open Source Search Engine Written In JavaScript.';
        return () => {
            SetQuery('');
        };
    }, []);

    return (
        <main id='Home-Main'>
            <section id='Search-Container'>
                <h1 className='Animated-Text-Background'>CodexDrake</h1>
                <SearchBar 
                    GetQuery={GetQuery}
                    SetQuery={SetQuery}
                    OnSubmit={HandleOnSubmit}
                />
            </section>
        </main>
    );
};

export default Home;