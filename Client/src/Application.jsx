/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * For related information - https://github.com/CodeWithRodi/CodexDrake/
 *
 * CodexDrake - Self-hosted search engine written entirely in JavaScript.
 * Browse privately and securely for free!
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
****/

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import Search from './Pages/Search';
import Status404 from './Pages/Status404';
import ServiceConditions from './Pages/ServiceConditions';
import ScrollToTop from './Patches/ScrollToTop';

const Application = () => (
    <Routes>
        <Route element={<ScrollToTop />}>
            <Route element={<Layout />}>
                <Route path='/' exact element={<Home />} />
                <Route path='/search/' exact element={<Search />} />
                <Route path='/service-conditions/' exact element={<ServiceConditions />} />
            </Route>
            <Route path='*' element={<Status404 />} />
        </Route>
    </Routes>
)

export default Application;