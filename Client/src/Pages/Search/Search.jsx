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
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../Components/Search/Bar';
import SearchCategories from '../../Components/Search/Categories';
import DotsLoader from '../../Components/DotsLoader';
import SearchEmptyResults from '../../Components/Search/EmptyResults';
import SearchResponse from '../../Components/Search/Response';
import { useSelector } from 'react-redux';
import './Search.css';

const Search = () => {
    const Navigate = useNavigate();
    const Query = useSelector((State) => State.Search.Query);
    const IsLoading = useSelector((State) => State.Search.IsLoading);
    const Response = useSelector((State) => State.Search.Response);

    useEffect(() => {
        if(!Query?.length)
            Navigate('/');
    }, []);

    return (
        <main id='Search-Main'>
            <section id='Search-Header'>
                <article>
                    <SearchBar />
                </article>
                <SearchCategories />
            </section>  

            {(IsLoading) ? (
                <section id='Search-Loading-Request'>
                    <DotsLoader />
                </section>
            ) : (
                (!Response?.Results) ? (
                    <SearchEmptyResults />
                ) : (
                    <SearchResponse />
                )
            )}
        </main>
    );
};

export default Search;
