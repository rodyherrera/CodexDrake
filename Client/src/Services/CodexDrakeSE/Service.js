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

import { StandardizedAPIRequestBuilder } from '../../Utilities/Runtime';
export const SearchAPI = new StandardizedAPIRequestBuilder({ Endpoint: '/search' });

export const Links = SearchAPI.Register({ Path: '/' });
export const Images = SearchAPI.Register({ Path: '/images' });
export const News = SearchAPI.Register({ Path: '/news' })
export const Videos = SearchAPI.Register({ Path: '/videos' });
export const Shopping = SearchAPI.Register({ Path: '/shopping' });
export const Books = SearchAPI.Register({ Path: '/books' });
export const Suggestions = SearchAPI.Register({ Path: '/suggestions' });
export const Wikipedia = SearchAPI.Register({ Path: '/wikipedia' });