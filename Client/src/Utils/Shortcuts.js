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

export const DoServerRequest = async({
    OnFinish = undefined,
    OnStart = undefined,
    Promise = {
        OnResolve: undefined,
        OnReject: undefined,
    },
    Axios = {
        Callback: undefined,
        Arguments: undefined
    },
    Setters = {
        OnErrorSetter: undefined
    }
}) => {
    const HandlePromiseRejection = (Rejection) => {
        // ! In <Rejection> has .response object is an axios
        // ! rejection, server | request error
        if (Rejection.response)
            // ! In backend we MUST return an message with the error
            // ! if for some fucking reason the message does not exists
            // ! in the fucking response we send 'Server Error'
            Setters.OnErrorSetter(Rejection.response.data.Message || 'Server Error');
        // ! If .response does not exists, it is a JavaScript runtime error
        else Setters.OnErrorSetter(Rejection.message.replace('Network Error', 'SERVER_DOWN'));
        // ! If the developer send some fucking callback for handle the fucking
        // ! rejection we call it
        if (Promise.OnRejection !== undefined) Promise.OnRejection(Rejection);
        if (OnFinish !== undefined) OnFinish(Rejection);
    };

    const HandleResponse = async (Response) => {
        Setters.OnErrorSetter(Response.Message || '');
        // ! In the backend we MUST send the fucking status or
        // ! our fucking client application send errors and errors
        // ! and  much fucking errors
        if (Response.Status !== 'Success')
            // ! Generate integraded JavaScript runtime error
            // ! and send as message the server Message error
            throw new Error(Response.Message);
        if (Promise.OnResolve !== undefined) await Promise.OnResolve(Response);
        if (OnFinish !== undefined) OnFinish(Response);
    };

    const GetResponse = async () => {
        Setters.OnErrorSetter(null);
        if (OnStart !== undefined) 
            OnStart();
        return await Axios.Callback(...(Axios.Arguments || []));
    };

    GetResponse()
        .then((Response) => HandleResponse(Response.data))
        .catch(HandlePromiseRejection);
    return;
};

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