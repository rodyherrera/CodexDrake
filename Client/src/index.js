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
import ReactDOM from 'react-dom';
import ReportWebVitals from './ReportWebVitals';
import Application from './Application';
import { BrowserRouter } from 'react-router-dom';
import { CodexDrakeSEProvider } from './Services/CodexDrakeSE/Context';
import './Assets/StyleSheet/Variables.css';
import './Assets/StyleSheet/General.css';

ReactDOM.render(
    <BrowserRouter>
        <CodexDrakeSEProvider>
            <React.StrictMode>
                <Application />
            </React.StrictMode>
        </CodexDrakeSEProvider>
    </BrowserRouter>,
    document.getElementById('CodexDrake')
);

ReportWebVitals();