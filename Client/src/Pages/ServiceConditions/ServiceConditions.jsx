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

import React, { useEffect } from 'react';
import './ServiceConditions.css';

const ServiceConditions = () => {
    useEffect(() => {
        document.title = 'CodexDrake - The Hackable Search Engine Conditions.'
    }, []);

    return (
        <main id='Service-Conditions-Main'>
            <section>
                <h1>Terms and conditions</h1>
                <p>Agreement that you accept when using this search engine</p>
            </section>

            <section>
                <h3>Privacy</h3>
                <p>Your privacy is not compromised, our search engine does not collect data from the client in which you are accessing the service, our server does not interact with any database, the server is only responsible for solving the search that you request, keep in mind that every time you perform a search it sets parameters in the URL, so that if other users have access to your computer and review your search history in theory they could know what you searched for, this does not happen if you use the incognito mode, at the service level , our server does not share or register your data, you are safe, codexdrake is an open source software so you can visualize the source code yourself, nobody will know the shady things that you will search on the internet using this engine, maybe pepa pig porn or images of pretty kittens, is in your hands.</p>
            </section>

            <section>
                <h3>How the engine works</h3>
                <p>It is a very interesting question, how the hell does this work? Do we have a huge database with millions of results to successfully satisfy your search? Well, no, our server processes your search with the help of other engines, such as Google, Ask, Aol, Yahoo..., your data is not sent to those services, the request is sent from the server, your search is processed in the available engines based on what you are requesting, that is, the engine that was used to obtain the news, it is likely that it is not the same as the one used to search for images, or it is likely that if you search for images, when you try again it will give you another result, but why? We make the request to more than one engine, the first to return a response is the one we collect to return to you, for example assuming that the image engines are Google and Bing, you want to search for "Photos of kittens", our server will make the request to the two mentioned engines, if Googl e returns a response first than Bing, the Google response will be returned, it is likely that after a series of requests, the engines will give an HTTP 429 response, which means that many requests were made to the service, in that case others will be used engines if they exist, or you will simply be shown a message that no results were found for your search, our server sends the request to the search engine to then parse the response, and perform a scrape to extract the information and return formatted to the front, so that you can view it in a friendly way, it is nothing to write home about, finally there are steps, number one perform the search, number two send data to the server, number three send a request to the engines, number four wait for a response, number five parse the response and extract the data, number six return the parsed data to the client.</p>
            </section>

            <section>
                <h3>Open Source Software</h3>
                <p>CodexDrake is open source software under the MIT license, that is, it is software that is subject to changes by third parties and that can be used by various corporations, improve them and find vulnerabilities, the ability for the source code to be reused in another software, the MIT license has great benefits in the world of open source, it has low restrictions, the official repository is open to new contributions, improvements in the user experience or in the operation of the software in general, it is possible that there really are vulnerabilities, nothing is safe and we cannot guarantee 100% that you are under a safe engine, you are free to do what you want with the source code respecting the license, learn how this works and create something better, remember to drink a lot of water!</p>
            </section>
        </main>
    );
};

export default ServiceConditions;