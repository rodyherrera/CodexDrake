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

import React, { createContext, useEffect, useState } from 'react';
import * as Service from './Service';

export const CodexDrakeSEContext = createContext();

export const CodexDrakeSEProvider = ({ children }) => {
    const [GetError, SetError] = useState(null);

    useEffect(() => {
        Service.SearchAPI.BindErrorSetter(SetError);
        return () => {
            SetError(null);
        };
    }, []);

    return (
        <CodexDrakeSEContext.Provider
            value={{
                GetError,
                Search: {
                    Links: Service.Links,
                    Images: Service.Images,
                    News: Service.News,
                    Videos: Service.Videos,
                    Shopping: Service.Shopping,
                    Books: Service.Books,
                    Wikipedia: Service.Wikipedia,
                    Suggestions: Service.Suggestions
                }
            }}
        >
            {children}
        </CodexDrakeSEContext.Provider>
    );
};