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

import Axios from 'axios';

export class ServerRequestBuilder{
    constructor({ SetError }){
        this.SetError = SetError;
    };

    Register = ({ 
        Callback = undefined, 
        Arguments = undefined, 
        UpdateState = { Setter: undefined, Callback: undefined } 
    }) => new Promise(async (Resolve, Reject) => {
        try{
            const Response = (await Callback(...(Arguments || [])));
            (UpdateState.Callback) && (UpdateState.Setter(UpdateState.Callback(Response?.data || Response)));
            Resolve(Response?.data || Response);
        }catch(Rejection){
            (this.SetError) && 
                (this.SetError(Rejection?.response?.data));
            Reject(Rejection?.response?.data);
        }
        return Response;
    });
};

export class StandardizedAPIRequestBuilder{
    constructor({ Endpoint }){
        this.Endpoint = Endpoint;
        this.SetError = () => {};
    };

    BindErrorSetter = (Setter) => this.SetError = Setter;

    Register = ({ Path, Method = 'GET' }) => {
        const Buffer = { Arguments: [], Method: Method.toLowerCase() };
        return ({
            Body,
            UpdateState = { Setter: undefined, Callback: undefined }
        }) => {
            let QueryParams = '';
            const AppendParameter = (Identifier, Value) => {
                (QueryParams +=  ((!QueryParams) ? (`?`) : ('&')) + `${Identifier}=${Value}`);
            };
            (Buffer.Method === 'get' && Body) && (Object.keys(Body).forEach((Key) => AppendParameter(Key, Body[Key])));
            const Endpoint = `${import.meta.env.VITE_CDRAKE_SERVER_ENDPOINT + this.Endpoint}${Path}`.concat(QueryParams);
            Buffer.Arguments = [Endpoint]
            if(['post', 'put', 'patch'].includes(Buffer.Method))
                Buffer.Arguments.push(Body);
            return new ServerRequestBuilder({ SetError: this.SetError }).Register({
                Callback: Axios[Buffer.Method],
                Arguments: Buffer.Arguments,
                UpdateState
            });
        };
    };
};

export const GetClientLanguage = () => navigator.language || navigator.userLanguage;

export const GetLanguageName = (Language) => (Language.includes('-')) ? (Language.split('-')[0]) : (Language);