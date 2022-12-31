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

import React, { useContext, useEffect, useState } from 'react';
import { CodexDrakeSEContext } from '../../Services/CodexDrakeSE/Context';
import { GetClientLanguage } from '../../Utilities/Runtime';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsCollectionPlay, BsTags } from 'react-icons/bs';
import { IoImagesOutline, IoNewspaperOutline } from 'react-icons/io5';
import { VscNotebook } from 'react-icons/vsc';
import SearchFetch from '../../Components/SearchFetch';
import SearchBar from '../../Components/SearchBar';
import Button from '../../Components/Button';
import CircleLoader from '../../Components/CircleLoader';
import DotsLoader from '../../Components/DotsLoader';
import './Search.css';

const Search = () => {
    const Navigate = useNavigate();
    const [GetIsComponentMounted, SetIsComponentMounted] = useState(true);
    const [GetIsLoading, SetIsLoading] = useState(true);
    const [GetResponse, SetResponse] = useState({});
    const [GetSearchParams, SetSearchParams] = useSearchParams();
    const [GetQuery, SetQuery] = useState(GetSearchParams.get('Query') || '');
    const [GetQueryAux, SetQueryAux] = useState(GetQuery);
    const [GetLanguage, SetLanguage] = useState(GetSearchParams.get('Language') || GetClientLanguage());
    const [GetPage, SetPage] = useState(GetSearchParams.get('Page') || 1);
    const [GetType, SetType] = useState('');
    const [GetIsDoesNotExistsResults, SetIsDoesNotExistsResults] = useState(false);
    const [GetIsMoreResultsLoading, SetIsMoreResultsLoading] = useState(false);
    const { GetError, SearchSET } = useContext(CodexDrakeSEContext);
    
    const Fetchs = {
        Images: <SearchFetch.Images Response={GetResponse} />,
        Books: <SearchFetch.Generic Response={GetResponse} />,
        Shopping: <SearchFetch.Generic Response={GetResponse} />,
        Videos: <SearchFetch.Generic Response={GetResponse} />,
        News: <SearchFetch.Generic Response={GetResponse} />
    };
    
    const Categories = [
        ['All', <AiOutlineSearch />],
        ['Images', <IoImagesOutline />],
        ['News', <IoNewspaperOutline />],
        ['Videos', <BsCollectionPlay />],
        ['Shopping', <BsTags />],
        ['Books', <VscNotebook />]
    ];

    useEffect(() => {
        return () => {
            SetIsComponentMounted(false);
            SetIsLoading(false);
            SetResponse({});
            SetQuery('');
            SetQueryAux('');
            SetLanguage('');
            SetPage(1);
            SetType('');
            SetIsDoesNotExistsResults(false);
            SetIsMoreResultsLoading(false);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(!GetType.length){
            SetType(GetSearchParams.get('Type') || 'All');
            return;
        }
        HandleSearch();
    }, [GetType]);

    useEffect(() => {
        if(!GetQuery.length)
            return;
        const NewQueryStringParams = Object.assign({}, 
                { Query: GetQuery, Language: GetLanguage, Type: GetType, Page: GetPage }, GetSearchParams);
        (!NewQueryStringParams.Page) && (NewQueryStringParams.Page = 1);
        (!NewQueryStringParams.Language) && (NewQueryStringParams.Language = 'en-US');
        SetSearchParams(NewQueryStringParams);
    }, [GetType, GetLanguage, GetQuery, GetPage]); // eslint-disable-line react-hooks/exhaustive-deps

    const HandleSearch = (Event = undefined, Page = GetPage, LoadingSetter = SetIsLoading) => {
        (Event) && (Event.preventDefault());
        if(!GetQuery.length)
            return;
        const SearchFunction = SearchSET[GetType] || SearchSET.Links;
        LoadingSetter(true);
        SearchFunction({
            Query: GetQuery,
            Language: GetLanguage,
            Page
        })
        .then((Response) => {
            if(!GetIsComponentMounted)
                return;
            if(!Object.keys(Response.Results).length){
                SetIsDoesNotExistsResults(true);
                return;
            }
            Response.Results = (GetResponse.Results && GetQueryAux === GetQuery) ? 
                ([ ...GetResponse.Results, Response.Results ]) 
                    : ([ Response.Results  ]);
            document.title = (GetQuery.length > 16) ? (GetQuery.slice(0, 16) + '...') : GetQuery + ' - CodexDrake Search Engine.';
            SetPage(Page);
            SetQueryAux(GetQuery);
            SetResponse(Response);
        })
        .finally(() => (GetIsComponentMounted) && (LoadingSetter(false)));
    };

    return (
        <main id='Search-Main'>
            <section id='Search-Header'>
                <article>
                    <SearchBar
                        GetQuery={GetQuery}
                        SetQuery={SetQuery}
                        OnSubmit={HandleSearch}
                    />
                </article>
                <ul>
                    {Categories.map(([ Name, Icon ], Index) => (
                        <li 
                            key={Index} 
                            onClick={() => {
                                SetIsLoading(true);
                                SetResponse({});
                                SetPage(1);
                                SetIsDoesNotExistsResults(false);
                                SetType(Name);
                            }}
                            className={(Name === GetType) ? ('Active') : 'Deactive'}
                        >
                            <i>{Icon}</i>
                            <span>{Name}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {(GetIsLoading) ? (
                <section id='Search-Loading-Request'>
                    <DotsLoader />
                </section>
            ) : (
                (!GetResponse.Results || !Object.keys(GetResponse.Results.length)) ? (
                    <article id='Search-Not-Results'>
                        <div>
                            {GetError === 'SERVER_DOWN' ? (
                                <>
                                    <h1>A connection to the server could not be established.</h1>
                                    <p>An attempt was made to connect to the server to resolve the requested search query, but the connection failed.</p>
                                    <ul>
                                        <li>The server address is probably invalid</li>
                                        <li>The server is down</li>
                                        <li>There is a connection block on the server side</li>
                                    </ul>
                                    <p>There is nothing to do about it, try again later when the server is up.</p>
                                </>
                            ) : (
                                <>
                                    <h1>The engines did not find results for your search.</h1>
                                    <p>Your search was processed on our server, but it did not yield any results in the engines evaluated around the web, below you will be presented with tips to carry out your search again.</p>
                                    <ul>
                                        <li>Use keywords and be precise</li>
                                        <li>Limit your search to 10 characters</li>
                                        <li>Check your spelling</li>
                                        <li>Use the autocomplete results</li>
                                    </ul>
                                    <p>If the problem persists, it is likely that our software engines are experiencing problems with outgoing requests from the server, please try again later.</p>
                                </>
                            )}
                            <Button onClick={() => Navigate('/')} Text='Go Home' />
                        </div>
                    </article>
                ) : (
                    GetResponse.Results && Object.keys(GetResponse.Results).length && (
                        <section data-searchtype={GetType} id='Search-Results'>
                            <article>
                                <div id='Search-Stats'>
                                    {(GetResponse.TotalIndexedResults && GetResponse.SearchTimeout) ? (
                                        <p>{GetResponse.TotalIndexedResults} results in {GetResponse.SearchTimeout} ms</p>
                                    ) : (
                                        GetResponse.TotalIndexedResults && (
                                            <p>{GetResponse.TotalIndexedResults} results indexed</p>
                                        )
                                    )}
                                </div>

                                {Fetchs[GetType] || <SearchFetch.Generic Response={GetResponse} />}

                                {GetIsDoesNotExistsResults ? (
                                    <p>Does not exists results for show.</p>
                                ) : (
                                    GetIsMoreResultsLoading ? (
                                        <article id='Search-More-Results-Loader'>
                                            <CircleLoader />
                                        </article>
                                    ) : (
                                        <article id='Search-Load-Results-Btn-Container'>
                                            <Button 
                                                onClick={(Event) => HandleSearch(Event, parseInt(GetPage) + 1, SetIsMoreResultsLoading)}
                                                Text='Load more results' />
                                        </article>
                                    )
                                )}
                            </article>
                        </section>
                    ))
                )}
        </main>
    );
};

export default Search;