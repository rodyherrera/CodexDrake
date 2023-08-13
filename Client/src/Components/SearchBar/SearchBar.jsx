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
import { VscSearch } from 'react-icons/vsc';
import { CodexDrakeSEContext } from '../../Services/CodexDrakeSE/Context';
import './SearchBar.css';

const SearchBar = ({ GetQuery, SetQuery, OnSubmit }) => {
    const { Search } = useContext(CodexDrakeSEContext);

    const [GetIsComponentMounted, SetIsComponentMounted] = useState(true);
    const [GetSuggestions, SetSuggestions] = useState([]);
    const [GetSelectedSuggestion, SetSelectedSuggestion] = useState([]);
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
        if(!GetSelectedSuggestion.length)
            return;
        OnSubmit();
    }, [GetSelectedSuggestion]);

    const HandleQueryInputKeyUp = async (Event) => {
        if(!Event.target.value.length){
            SetSuggestions([]);
            return;
        }
        const Suggestions = await Search.Suggestions({ Body: { Query: Event.target.value } });
        (GetIsComponentMounted) && (SetSuggestions(Suggestions.Results));
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