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
import { DoServerRequest } from '../../Utils/Shortcuts';
import { 
    SearchLinks,
    Images,
    News,
    Videos,
    Shopping,
    Books,
    Suggestions } from './Service';

export const CodexDrakeSEContext = createContext();

export const CodexDrakeSEProvider = ({ children }) => {
    const [GetError, SetError] = useState(null);
    const Setters = { OnErrorSetter: SetError };

    const DoSearch = ({ OnStart, OnFinish, Data, OnResolve, OnRejection }) => 
        DoServerRequest({
            Setters,
            OnFinish,
            OnStart,
            Promise: { OnResolve, OnRejection },
            Axios: {
                Callback: SearchLinks,
                Arguments: [Data]
            }
        });

    const DoSearchImages = ({ OnStart, OnFinish, Data, OnResolve, OnRejection }) => 
        DoServerRequest({
            Setters,
            OnStart,
            OnFinish,
            Promise: { OnResolve, OnRejection },
            Axios: {
                Callback: Images,
                Arguments: [Data]
            }
        });

    const DoSearchNews = ({ OnStart, OnFinish, Data, OnResolve, OnRejection }) => 
        DoServerRequest({
            Setters,
            OnStart,
            OnFinish,
            Promise: { OnResolve, OnRejection },
            Axios: {
                Callback: News,
                Arguments: [Data]
            }
        });

    const DoSearchVideos = ({ OnStart, OnFinish, Data, OnResolve, OnRejection }) => 
        DoServerRequest({
            Setters,
            OnFinish,
            OnStart,
            Promise: { OnResolve, OnRejection },
            Axios: {
                Callback: Videos,
                Arguments: [Data]
            }
        });
    
    const DoSearchShopping = ({ OnStart, OnFinish, Data, OnResolve, OnRejection }) => 
        DoServerRequest({
            Setters,
            OnFinish,
            OnStart,
            Promise: { OnResolve, OnRejection },
            Axios: {
                Callback: Shopping,
                Arguments: [Data]
            }
        });

    const DoSearchBooks = ({ OnStart, Data, OnFinish, OnResolve, OnRejection }) => 
        DoServerRequest({
            Setters,
            OnStart,
            OnFinish,
            Promise: { OnResolve, OnRejection },
            Axios: {
                Callback: Books,
                Arguments: [Data]
            }
        });
    
    const DoSearchSuggestions = ({ OnStart, OnFinish, Data, OnResolve }) => 
        DoServerRequest({
            Setters,
            OnStart,
            OnFinish,
            Promise: { OnResolve },
            Axios: {
                Callback: Suggestions,
                Arguments: [Data]
            }
        });

    return (
        <CodexDrakeSEContext.Provider
            value={{
                GetError,
                DoSearch,
                DoSearchImages,
                DoSearchNews,
                DoSearchVideos,
                DoSearchBooks,
                DoSearchShopping,
                DoSearchSuggestions
            }}
        >
            {children}
        </CodexDrakeSEContext.Provider>
    );
};