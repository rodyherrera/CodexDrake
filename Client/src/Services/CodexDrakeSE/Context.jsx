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
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchRender from '../../Components/Search/Render';
import * as Service from './Service';
import * as SearchSlice from './Slice';

export const CodexDrakeSEContext = createContext();

export const CodexDrakeSEProvider = ({ children }) => {
    const Navigate = useNavigate();
    const Dispatch = useDispatch();
    const [_, SetClientSearchParams] = useSearchParams();
    const [GetError, SetError] = useState(null);
    const [GetIsComponentMounted, SetIsComponentMounted] = useState(true);

    const Query = useSelector((State) => State.Search.Query);
    const Language = useSelector((State) => State.Search.Language);
    const Page = useSelector((State) => State.Search.Page);
    const Type = useSelector((State) => State.Search.Type);
    const Response = useSelector((State) => State.Search.Response);
    const QueryAux = useSelector((State) => State.Search.QueryAux);
    const IsDoesNotExistsResults = useSelector((State) => State.Search.GetIsDoesNotExistsResults);

    // ! When the search type changes, the request is made to the server.
    // ! -> ie -> 'News' to 'Image'.
    useEffect(() => {
        if(!Query.length)
            return Navigate('/');
        PerformSearch();
    }, [Type]);


    // ! <QueryAux> is a state that will store a copy of the <Query> state 
    // ! each time a request to the backend completes successfully. When 
    //! this happens, a query will be made to Wikipedia to see if there is 
    // ! information related to the search. 
    // TODO: Consider that <QueryAux> is also used to know 
    // TODO: if a new query is being performed (if QueryAux !== Query) inside <PerformSearch()>.
    useEffect(() => {
        if(!QueryAux.length)
            return;
        HandleWikipediaSearch(Query, Language, Page);
    }, [QueryAux]);

    useEffect(() => {
        if(!Query?.length)
            return;
        const NewQueryStringParams = { Query, Language, Type, Page };
        (!NewQueryStringParams.Page) && (NewQueryStringParams.Page = 1);
        (!NewQueryStringParams.Language) && (NewQueryStringParams.Language = 'en-US');
        Dispatch(SearchSlice.SetSearchParams(NewQueryStringParams));
        SetClientSearchParams(NewQueryStringParams);
    }, [Type, Language, Query, Page]); 

    useEffect(() => {
        Service.SearchAPI.BindErrorSetter(SetError);
        return () => {
            SetIsComponentMounted(false);
            SetError(null);
        };
    }, []);

    const UpdateSearchLoadingState = (Status, IsNextPageRequest) => {
        if(IsNextPageRequest){
            return Dispatch(SearchSlice.SetIsMoreResultsLoading(Status));
        }
        Dispatch(SearchSlice.SetIsLoading(Status));
    };

    const NavigateWithSearchParams = (SearchPage) => {
        Navigate({
            pathname: '/search',
            search: `?Query=${Query}&Language=${Language}&Type=${Type}&Page=${SearchPage}` 
        });
    };

    const PerformSearch = async (Event, SearchPage = Page, IsNextPageRequest = false) => {
        Event?.preventDefault();
        NavigateWithSearchParams(SearchPage);
        (IsDoesNotExistsResults) && (Dispatch(SearchSlice.SetIsDoesNotExistsResults(false)));
        UpdateSearchLoadingState(true, IsNextPageRequest);
        const Body = { Query, Language, Page: SearchPage };
        const SearchEngineRequest = Service[Type];
        const SearchResponse = await SearchEngineRequest({ Body });
        if(!GetIsComponentMounted)
            return;
        if(!SearchResponse.Results.length){
            Dispatch(SearchSlice.SetIsDoesNotExistsResults(true));
            Dispatch(SearchSlice.SetSearchResponse({ Reponse: {} }));
            return UpdateSearchLoadingState(false, IsNextPageRequest);
        }
        // TODO: If the request made to the server has results and the value of <Query> 
        // TODO: is equal to <QueryAux>, it means that there was a page change and not 
        // TODO: a change in the search term. So if the conditions are true, the response 
        // TODO: will be updated, where this will be an array where each index will represent 
        // TODO: the page number (Page = (Index + 1)) and the value of will also 
        // TODO: be an array that has the results of that page (Index + 1).
        if(SearchResponse.Results && (QueryAux === Query)){
            // ? SearchResponse.Results [ Array, Array, Array... ]
            // ?     Where Index ->        0      1       2
            // ? And Pages (Index + 1) ->  1      2       3
            SearchResponse.Results = [ ...Response.Results, SearchResponse.Results ];
        }else{
            // TODO: In the event that the condition is not met, it means that 
            // TODO: there was a change of term, that is, a new search different 
            // TODO: from the previous one performed (if there is one), so we will 
            // TODO: add an array with the response to the results. obtained from 
            // TODO: the server, I mean, an array that has as index 0 the 
            // TODO: array with all the results according to the search.
            SearchResponse.Results = [ SearchResponse.Results ];
        }
        Service.UpdateWindowTitleByQuery(Query);
        Dispatch(SearchSlice.SetSearchParams({ Page: SearchPage }));
        Dispatch(SearchSlice.SetQueryAux(Query));
        Dispatch(SearchSlice.SetSearchResponse({ Response: SearchResponse }));
        UpdateSearchLoadingState(false, IsNextPageRequest);
    };


    const HandleWikipediaSearch = async () => {
        Dispatch(SearchSlice.SetIsWikipediaInformationLoading(true));
        const Body = { Query, Language, Page };
        const WikipediaData = await Service.Wikipedia({ Body });
        if(!GetIsComponentMounted || WikipediaData.Status === 'Error')
            return;
        Dispatch(SearchSlice.SetSearchResponse({ WikipediaData }));
        Dispatch(SearchSlice.SetIsWikipediaInformationLoading(false));
    };

    const RenderComponent = () => {
        const TypeRenders = {
            Generic: <SearchRender.Generic />,
            Images: <SearchRender.Images />
        };
        return TypeRenders[Type] || TypeRenders.Generic;
    };

    return (
        <CodexDrakeSEContext.Provider
            value={{
                GetError,
                PerformSearch,
                Search: {
                    RenderComponent,
                    Suggestions: Service.Suggestions
                }
            }}
        >
            {children}
        </CodexDrakeSEContext.Provider>
    );
};