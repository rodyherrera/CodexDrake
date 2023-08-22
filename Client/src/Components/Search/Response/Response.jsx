import React, { useContext } from 'react';
import { CodexDrakeSEContext } from '../../../Services/CodexDrakeSE/Context';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import Button from '../../Button';
import Wikipedia from '../Wikipedia';

const SearchResponse = () => {
    const { Search, PerformSearch } = useContext(CodexDrakeSEContext);

    const Page = useSelector((State) => State.Search.Page);
    const Type = useSelector((State) => State.Search.Type);
    const IsMoreResultsLoading = useSelector((State) => State.Search.IsMoreResultsLoading);
    const IsDoesNotExistsResults= useSelector((State) => State.Search.IsDoesNotExistsResults);
    const { 
        Results, 
        TotalIndexedResults, 
        SearchTimeout } = useSelector((State) => State.Search.Response);

    const HandleNextPage = (Event) => {
        PerformSearch(Event, (Page + 1), true);
    };

    return (
        Results && Object.keys(Results).length && (
            <section data-searchtype={Type} id='Search-Results'>
                <article>
                    <div id='Search-Stats'>
                        {(TotalIndexedResults && SearchTimeout) ? (
                            <p>{TotalIndexedResults} results in {SearchTimeout} ms</p>
                        ) : (
                            TotalIndexedResults && (
                                <p>{TotalIndexedResults} results indexed</p>
                            )
                        )}
                    </div>

                    {Search.RenderComponent()}

                    {IsDoesNotExistsResults ? (
                        <p>Does not exists results for show.</p>
                    ) : (
                        IsMoreResultsLoading ? (
                            <article id='Search-More-Results-Loader'>
                                <CircularProgress size='2rem' className='Circular-Progress' />
                            </article>
                        ) : (
                            <article id='Search-Load-Results-Btn-Container'>
                                <Button onClick={HandleNextPage} Text='Load more results' />
                            </article>
                        )
                    )}
                </article>
                <Wikipedia />
            </section>
        )
    );
};

export default SearchResponse;