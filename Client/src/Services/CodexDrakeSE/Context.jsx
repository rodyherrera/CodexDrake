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

import React, { createContext, useState } from 'react';
import { MakeServerRequest } from '../../Utilities/Runtime';
import * as Service from './Service';

export const CodexDrakeSEContext = createContext();

export const CodexDrakeSEProvider = ({ children }) => {
    const [GetError, SetError] = useState(null);
    const Setters = { OnErrorSetter: SetError };

    const Links = (Body) => 
        MakeServerRequest({
            Setters,
            Axios: {
                Callback: Service.Links,
                Arguments: [Body]
            }
        });

    const Wikipedia = (Body) =>
        MakeServerRequest({
            Setters,
            Axios: {
                Callback: Service.Wikipedia,
                Arguments: [Body]
            }
        });

    const Images = (Body) => 
        MakeServerRequest({
            Setters,
            Axios: {
                Callback: Service.Images,
                Arguments: [Body]
            }
        });

    const News = (Body) => 
        MakeServerRequest({
            Setters,
            Axios: {
                Callback: Service.News,
                Arguments: [Body]
            }
        });

    const Videos = (Body) =>  
        MakeServerRequest({
            Setters,
            Axios: {
                Callback: Service.Videos,
                Arguments: [Body]
            }
        });
    
    const Shopping = (Body) => 
        MakeServerRequest({
            Setters,
            Axios: {
                Callback: Service.Shopping,
                Arguments: [Body]
            }
        });

    const Books = (Body) => 
        MakeServerRequest({
            Setters,
            Axios: {
                Callback: Service.Books,
                Arguments: [Body]
            }
        });
    
    const Suggestions = (Body) => 
        MakeServerRequest({
            Setters,
            Axios: {
                Callback: Service.Suggestions,
                Arguments: [Body]
            }
        });

    return (
        <CodexDrakeSEContext.Provider
            value={{
                GetError,
                SearchSET: {
                    Links,
                    Images,
                    News,
                    Videos,
                    Shopping,
                    Books,
                    Wikipedia,
                    Suggestions
                }
            }}
        >
            {children}
        </CodexDrakeSEContext.Provider>
    );
};