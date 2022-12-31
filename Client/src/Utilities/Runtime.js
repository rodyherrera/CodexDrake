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

import { FormattedRouteAPI } from '../Infrastructure';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';

const ServerErrors = {};

export const MakeServerRequest = async ({
    Axios = {
        Callback: undefined,
        Arguments: undefined
    },
    UpdateState = {
        Setter: undefined,
        Callback: undefined
    },
    Setters = { OnErrorSetter: undefined },
}) => new Promise(async (Resolve, Reject) => {
    let Response;
    try{
        Setters.OnErrorSetter(null);
        Response = (await Axios.Callback(...(Axios.Arguments || []))).data;
        if(Response.Status !== 'Success')
            throw new Error(Response.Message);
        (UpdateState.Callback !== undefined) && (UpdateState.Setter(UpdateState.Callback(Response)));
        Resolve(Response);
    }catch(Rejection){
        Setters.OnErrorSetter(ServerErrors[( 
            (Rejection?.response?.data?.Message) || (Rejection?.message || 'Unknown Error') 
        ).replaceAll(' ', '_').toUpperCase()]);
        Reject(Rejection);
    }
    return Response;
});

export const GenericRequestToBackend = ({
    Path,
    Method = 'GET',
    Body = {},
    ParseBodyCallback = (Body) => Body
}) => {

    let Arguments = [FormattedRouteAPI(Path)];
    Method = Method.toLowerCase();
    if(['post', 'put', 'patch'].includes(Method))
        Arguments.push(ParseBodyCallback(Body));
    return axios[Method](...Arguments);
};

export const ParseToURLParameters = (Subject) => {
    // ! If subject is object
    // ! ?Name=Rodolfo&Age=16 => { Name: 'Rodolfo', Age: 16 }
    // ! If subject is array
    // ! /Hello/World/ => ['Hello', 'World']
    let URL = '?';
    Object.keys(Subject).forEach((Key) => URL += Key + '=' + Subject[Key] + '&');
    return URL;
};

export const GetClientLanguage = () => navigator.language || navigator.userLanguage;

export const GetLanguageName = (Language) => (Language.includes('-')) ? (Language.split('-')[0]) : (Language);

export const ScrollToTop = () => {
    const Location = useLocation();
    useEffect(() => 
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        }), [Location.pathname]);
    return <Outlet />;
};