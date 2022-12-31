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

import { Search } from '../../Infrastructure';
import { GenericRequestToBackend, ParseToURLParameters } from '../../Utilities/Runtime';

const GetRequestFrom = (SearchType, Body) => 
    GenericRequestToBackend({
        Path: Search[SearchType] + ParseToURLParameters(Body)
    });

export const Links = (Body) => GetRequestFrom('Search', Body);
export const Images = (Body) => GetRequestFrom('Images', Body);
export const News = (Body) => GetRequestFrom('News', Body);
export const Videos = (Body) => GetRequestFrom('Videos', Body);
export const Shopping = (Body) => GetRequestFrom('Shopping', Body);
export const Books = (Body) => GetRequestFrom('Books', Body);
export const Suggestions = (Body) => GetRequestFrom('Suggestions', Body);