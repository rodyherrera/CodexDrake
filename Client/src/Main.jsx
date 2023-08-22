import React from 'react';
import ReactDOM from 'react-dom';
import ReportWebVitals from './ReportWebVitals';
import Application from './Application';
import Store from './Utilities/Store';
import MultiProvider from 'another-multi-provider';
import { BrowserRouter } from 'react-router-dom';
import { CodexDrakeSEProvider } from './Services/CodexDrakeSE/Context';
import { Provider } from 'react-redux';
import './Assets/StyleSheet/Variables.css';
import './Assets/StyleSheet/General.css';

ReactDOM.render(
    <MultiProvider
        providers={[
            BrowserRouter,
            [Provider, { store: Store }],
            CodexDrakeSEProvider
        ]}
    >
        <Application />
    </MultiProvider>,
    document.getElementById('CodexDrake')
);

ReportWebVitals();