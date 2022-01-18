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

import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { FiGithub } from 'react-icons/fi';
import { BsSun } from 'react-icons/bs';
import { IoMoonOutline } from 'react-icons/io5';
import { MdOutlineSecurity } from 'react-icons/md';
import { ClientRoutes, GeneralSettings } from '../../Infrastructure';
import ConnectionLost from '../../Pages/ConnectionLost';
import './Layout.css';

const Layout = () => {
    const GetStoredTheme = () => localStorage.getItem('Theme');
    const SetStoredTheme = (Theme) => localStorage.setItem('Theme', Theme);
    const Navigate = useNavigate();
    const Location = useLocation();
    const DeviceTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [GetIsDarkTheme, SetIsDarkTheme] = useState(false);
    const [GetIsConnectionLost, SetIsConnectionLost] = useState(false);

    window.addEventListener('offline', () => SetIsConnectionLost(true));
    window.addEventListener('online', () => SetIsConnectionLost(false));

    useEffect(() => {
        SetIsDarkTheme(DeviceTheme || GetStoredTheme() === 'Dark');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        SetStoredTheme( (GetIsDarkTheme) ? ('Dark') : ('Light') );
        const Document = document.documentElement;
        const ThemeColor = document.querySelector('meta[name="theme-color"]');
        if(GetIsDarkTheme){
            Document.setAttribute('data-Theme', 'Dark');
            ThemeColor.setAttribute('content', 'rgb(32, 32, 36)');
        }else{
            Document.removeAttribute('data-Theme');
            ThemeColor.setAttribute('content', '#b5e9f0');
        }
    }, [GetIsDarkTheme]); 

    window.matchMedia("(prefers-color-scheme: dark)").addListener((Event) => SetIsDarkTheme(Event.matches));

    return GetIsConnectionLost ? (<ConnectionLost />) : (
        <>
            <header data-Path={Location.pathname} id='Header'>
                <nav>
                    <ul>
                        <li id='Version'>
                            <h3>
                                <a href={GeneralSettings.Repository}>
                                    <span>{GeneralSettings.Version}</span>
                                </a>
                            </h3>
                        </li>
                        <li id='Title' onClick={() => Navigate('/')}>
                            <h1 className='Animated-Text-Background'>CodexDrake</h1>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <i className='Icon-Big'>
                                {GetIsDarkTheme ? 
                                    <BsSun onClick={() => SetIsDarkTheme(false)} /> 
                                        : <IoMoonOutline onClick={() => SetIsDarkTheme(true)} />}
                            </i>
                        </li>
                        <li onClick={() => Navigate(ClientRoutes.ServiceConditions)}>
                            <i className='Icon-Big'>{<MdOutlineSecurity />}</i>
                        </li>
                        <li onClick={() => document.location.href = GeneralSettings.Repository}>
                            <i className='Icon-Big'>{<FiGithub />}</i>
                        </li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </>
    );
};

export default Layout;