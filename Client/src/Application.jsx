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

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ClientRoutes } from './Infrastructure';
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
                <Route path={ClientRoutes.Search} exact element={<Search />} />
                <Route path={ClientRoutes.ServiceConditions} exact element={<ServiceConditions />} />
            </Route>
            <Route path='*' element={<Status404 />} />
        </Route>
    </Routes>
)

export default Application;