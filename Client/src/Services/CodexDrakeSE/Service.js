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
import { GenericRequestToBackend, ParseToURLParameters } from '../../Utils/Shortcuts';

export const SearchLinks = (Data) => 
    GenericRequestToBackend({
        Path: Search.Search + ParseToURLParameters(Data),
    });

export const Images = (Data) =>
    GenericRequestToBackend({
        Path: Search.Images + ParseToURLParameters(Data)
    });

export const News = (Data) =>
    GenericRequestToBackend({
        Path: Search.News + ParseToURLParameters(Data)
    });

export const Videos = (Data) =>
    GenericRequestToBackend({
        Path: Search.Videos + ParseToURLParameters(Data)
    });

export const Shopping = (Data) =>
    GenericRequestToBackend({
        Path: Search.Shopping + ParseToURLParameters(Data)
    });

export const Books = (Data) =>
    GenericRequestToBackend({
        Path: Search.Books + ParseToURLParameters(Data)
    });

export const Suggestions = (Data) =>
    GenericRequestToBackend({
        Path: Search.Suggestions + ParseToURLParameters(Data)
    });