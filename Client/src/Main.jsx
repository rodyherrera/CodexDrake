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