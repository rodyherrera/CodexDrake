import React, { useContext } from 'react';
import { CodexDrakeSEContext } from '../../../Services/CodexDrakeSE/Context';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button';

const SearchEmptyResults = () => {
    const Navigate = useNavigate();
    const { GetError } = useContext(CodexDrakeSEContext);

    return (
        <article id='Search-Not-Results'>
            <div>
                {(GetError === 'SERVER_DOWN') ? (
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
    );
};

export default SearchEmptyResults;