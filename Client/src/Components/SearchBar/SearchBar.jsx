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
import { VscSearch } from 'react-icons/vsc';
import { CodexDrakeSEContext } from '../../Services/CodexDrakeSE/Context';
import './SearchBar.css';

const SearchBar = ({ 
    GetQuery, 
    SetQuery, 
    OnSubmit
}) => {
    const [GetIsComponentMounted, SetIsComponentMounted] = useState(true);
    const [GetSuggestions, SetSuggestions] = useState([]);
    const [GetSelectedSuggestion, SetSelectedSuggestion] = useState([]);
    const { SearchSET } = useContext(CodexDrakeSEContext);
    // ! Do it better...
    const [GetIsEnabledSuggestions, SetIsEnabledSuggestions] = useState(true);

    useEffect(() => {
        document.addEventListener('click', (Event) => 
            (!document.getElementById('Search-Bar-Container').contains(Event.target) && (SetIsEnabledSuggestions(false))));
        return () => {
            SetIsComponentMounted(false);
            SetSuggestions([]);
            SetIsEnabledSuggestions(false);
        };
    }, []);

    useEffect(() => {
        OnSubmit();
    }, [GetSelectedSuggestion]);  // eslint-disable-line react-hooks/exhaustive-deps

    const HandleQueryInputKeyUp = (Event) => {
        if(!Event.target.value.length){
            SetSuggestions([]);
            return;
        }
        SearchSET.Suggestions({ Query: Event.target.value })
            .then((Response) => (GetIsComponentMounted) && 
                (SetSuggestions(Object.keys(Response.Results).map((Key) => Response.Results[Key]))));
    };

    const HandleFormSubmit = (Event) => {
        Event.preventDefault();
        if(!GetQuery || !GetSelectedSuggestion)
            return;
        OnSubmit();
    };

    return (
        <div id='Search-Bar-Container'>
            <form id='Search-Bar-Form-Container' onSubmit={HandleFormSubmit}>
                <article>
                    <input
                        id='Search-Bar-Input'
                        type='text'
                        placeholder='Search something...'
                        onFocus={() => SetIsEnabledSuggestions(true)}
                        onKeyUp={HandleQueryInputKeyUp}
                        onChange={(Event) => SetQuery(Event.target.value)}
                        value={GetQuery}
                    />
                </article>
                <article>
                    <button type='submit'>
                        <i className='Icon'><VscSearch /></i>
                    </button>
                </article>
            </form>
            {GetIsEnabledSuggestions && GetSuggestions.length >= 1 && (
                <div id='Search-Bar-Suggestions'>
                    <ul>
                        {GetSuggestions.map((Suggestion, Index) => (
                            <li onClick={() => {
                                SetSelectedSuggestion(Suggestion);
                                SetQuery(Suggestion);
                                SetSuggestions([]);
                            }} key={Index}>
                                <span>{Suggestion}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;