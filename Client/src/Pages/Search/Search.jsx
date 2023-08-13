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

import React, { useContext, useEffect, useState } from 'react';
import { CodexDrakeSEContext } from '../../Services/CodexDrakeSE/Context';
import { GetClientLanguage } from '../../Utilities/Runtime';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsCollectionPlay, BsTags, BsChatSquareText, BsFilePdf } from 'react-icons/bs';
import { IoImagesOutline, IoNewspaperOutline } from 'react-icons/io5';
import { VscNotebook, VscPreview } from 'react-icons/vsc';
import { SiWikipedia } from 'react-icons/si';
import { FiEdit } from 'react-icons/fi';
import { IconButton, Tooltip, CircularProgress } from '@mui/material';
import SearchFetch from '../../Components/SearchFetch';
import SearchBar from '../../Components/SearchBar';
import Button from '../../Components/Button';
import DotsLoader from '../../Components/DotsLoader';
import './Search.css';

const Search = () => {
    const { GetError, Search } = useContext(CodexDrakeSEContext);
    const [GetSearchParams, SetSearchParams] = useSearchParams();
    const Navigate = useNavigate();

    const [GetIsComponentMounted, SetIsComponentMounted] = useState(true);
    const [GetIsLoading, SetIsLoading] = useState(true);
    const [GetResponse, SetResponse] = useState({});
    const [GetIsDoesNotExistsResults, SetIsDoesNotExistsResults] = useState(false);
    const [GetIsMoreResultsLoading, SetIsMoreResultsLoading] = useState(false);

    const [GetIsWikipediaInformationLoading, SetIsWikipediaInformationLoading] = useState(true);
    const [GetWikipediaData, SetWikipediaData] = useState({});

    const [GetQuery, SetQuery] = useState(GetSearchParams.get('Query') || '');
    const [GetQueryAux, SetQueryAux] = useState(GetQuery);
    const [GetLanguage, SetLanguage] = useState(GetSearchParams.get('Language') || GetClientLanguage());
    const [GetPage, SetPage] = useState(GetSearchParams.get('Page') || 1);
    const [GetType, SetType] = useState(GetSearchParams.get('Type') || 'All');

    
    const Fetchs = {
        Images: <SearchFetch.Images Response={GetResponse} />,
        Books: <SearchFetch.Generic Response={GetResponse} />,
        Shopping: <SearchFetch.Generic Response={GetResponse} />,
        Videos: <SearchFetch.Generic Response={GetResponse} />,
        News: <SearchFetch.Generic Response={GetResponse} />
    };
    
    const Categories = [
        ['Links', <AiOutlineSearch />],
        ['Images', <IoImagesOutline />],
        ['News', <IoNewspaperOutline />],
        ['Videos', <BsCollectionPlay />],
        ['Shopping', <BsTags />],
        ['Books', <VscNotebook />]
    ];

    useEffect(() => {
        if(!GetQuery.length)
            Navigate('/');
        return () => {
            SetIsComponentMounted(false);
            SetIsLoading(false);
            SetResponse({});
            SetQuery('');
            SetQueryAux('');
            SetLanguage('');
            SetPage(1);
            SetType('');
            SetWikipediaData({});
            SetIsWikipediaInformationLoading(false);
            SetIsDoesNotExistsResults(false);
            SetIsMoreResultsLoading(false);
        };
    }, []); 

    useEffect(() => {
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
    }, [GetType, GetLanguage, GetQuery, GetPage]); 

    const HandleWikipediaSearch = async (Query, Language, Page) => {
        SetIsWikipediaInformationLoading(true);
        const WikipediaResponse = await Search.Wikipedia({ Body: { Query, Language, Page } });
        if(!GetIsComponentMounted)
            return;
        SetWikipediaData(WikipediaResponse);
        SetIsWikipediaInformationLoading(false);
    };

    const HandleSearch = async (Event = undefined, Page = GetPage, LoadingSetter = SetIsLoading) => {
        (Event) && (Event.preventDefault());
        if(!GetQuery.length)
            return;
        LoadingSetter(true);
        const SearchCallback = Search[GetType] || Search.Links;
        const SearchResponse = await SearchCallback({
            Body: { Query: GetQuery, Language: GetLanguage, Page }
        });
        if(!GetIsComponentMounted)
            return;
        if(!Object.keys(SearchResponse.Results).length){
            SetIsDoesNotExistsResults(true);
            return;
        }
        SearchResponse.Results = (GetResponse.Results && GetQueryAux === GetQuery) 
            ? ([ ...GetResponse.Results, SearchResponse.Results ])
            : ([  SearchResponse.Results ]);
        document.title = (GetQuery.length > 16) 
            ? (GetQuery.slice(0, 16) + '...')
            : (GetQuery + ' - CodexDrake Search Engine');  
        SetPage(Page);
        SetQueryAux(GetQuery);
        SetResponse(SearchResponse);
        LoadingSetter(false);
    };

    useEffect(() => {
        HandleWikipediaSearch(GetQuery, GetLanguage, GetPage);
    }, [GetQueryAux]);

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
                                            <CircularProgress size='2rem' className='Circular-Progress' />
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
                            {((!GetIsWikipediaInformationLoading && Object.keys(GetWikipediaData).length >= 1)) && (
                                <article id='Wikipedia-Box'>
                                    <div id='Wikipedia-Header-Box'>
                                        <div>
                                            <img src={GetWikipediaData.Thumbnail.Source} alt={GetWikipediaData.Title} />
                                            <div>
                                                <h3>{GetWikipediaData.Title}</h3>
                                                <p>{GetWikipediaData.Description}</p>
                                            </div>
                                        </div>
                                        <p>{GetWikipediaData.Content}</p>
                                    </div>
                                    <div id='Wikipedia-Icon-Box'>
                                        {[
                                            [GetWikipediaData.AdditionalURLs.Edit, <FiEdit />, 'Edit the content present on the Wikipedia page.'], 
                                            [GetWikipediaData.PDF, <BsFilePdf />, 'Download the content of the Wikipedia page as a PDF.'],
                                            [GetWikipediaData.AdditionalURLs.Page, <SiWikipedia />, 'Visit the Wikipedia page that presents the content.'], 
                                            [GetWikipediaData.AdditionalURLs.Revisions, <VscPreview />, 'Visit the revisions made to this Wikipedia section.'], 
                                            [GetWikipediaData.AdditionalURLs.Talk, <BsChatSquareText />, 'Visit the talks made in this Wikipedia section.']
                                        ].map(([ Link, Icon, TooltipTitle ], Index) => (
                                            <Tooltip title={TooltipTitle} key={Index}>
                                                <IconButton size='medium' onClick={() => window.open(Link, '_blank')}>
                                                    {Icon}
                                                </IconButton>
                                            </Tooltip>
                                        ))}
                                    </div>
                                    <div id='Wikipedia-Related-Box' className='Colored-Scrollbar'>
                                        {GetWikipediaData.Related.map(({ Title, Description, Content }, Index) => (
                                            <div key={Index}>
                                                <div>
                                                    <h3>{Title}</h3>
                                                </div>
                                                <p>{Description}</p>
                                                <p>{Content}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div id='Wikipedia-Footer-Box'>
                                        <p>From Wikipedia, Powered by CodexDrake.</p>
                                    </div>
                                </article>
                            )}
                        </section>
                    ))
                )}
        </main>
    );
};

export default Search;