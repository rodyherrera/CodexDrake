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

import { GetClientLanguage } from '../../Utilities/Runtime';
import { createSlice } from '@reduxjs/toolkit';

const State = {
    QueryAux: '',
    Query: '',
    Language: GetClientLanguage(),
    Page: 1,
    Type: 'Links',
    IsLoading: true,
    IsMoreResultsLoading: false,
    IsWikipediaInformationLoading: true,
    IsDoesNotExistsResults: false,
    Response: {},
    WikipediaData: {}
};

const SearchSlice = createSlice({
    name: 'Search',
    initialState: State,
    reducers: {
        SetIsDoesNotExistsResults: (State, { payload }) => {
            State.IsDoesNotExistsResults = payload;
        },
        SetIsLoading: (State, { payload }) => {
            State.IsLoading = payload;
        },
        SetIsMoreResultsLoading: (State, { payload }) => {
            State.IsMoreResultsLoading = payload;
        },
        SetIsWikipediaInformationLoading: (State, { payload }) => {
            State.IsWikipediaInformationLoading = payload;
        },
        SetQueryAux: (State, { payload }) => {
            State.QueryAux = payload;
        },
        SetSearchParams: (State, { payload }) => {
            const { Language, Query, Page, Type } = payload;
            (Language) && (State.Language = Language);
            (Query) && (State.Query = Query);
            (Page) && (State.Page = Page);
            (Type) && (State.Type = Type);
        },
        SetSearchResponse: (State, { payload }) => {
            const { Response, WikipediaData } = payload;
            (Response) && (State.Response = Response);
            (WikipediaData) && (State.WikipediaData = WikipediaData);
        },
    }
}); 

export const { 
    SetQueryAux, 
    SetIsMoreResultsLoading,
    SetIsWikipediaInformationLoading,
    SetIsDoesNotExistsResults, 
    SetSearchParams, 
    SetIsLoading,
    SetSearchResponse, 
    SetLoadingStates 
} = SearchSlice.actions;

export default SearchSlice.reducer;