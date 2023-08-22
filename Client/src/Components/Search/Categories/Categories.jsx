import React from 'react';
import { VscNotebook } from 'react-icons/vsc';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsCollectionPlay, BsTags } from 'react-icons/bs';
import { IoImagesOutline, IoNewspaperOutline } from 'react-icons/io5';
import { 
    SetIsLoading, 
    SetSearchParams, 
    SetIsDoesNotExistsResults, 
    SetSearchResponse } from '../../../Services/CodexDrakeSE/Slice';
import { useDispatch, useSelector } from 'react-redux';

const SearchCategories = () => {
    const Type = useSelector((State) => State.Search.Type);
    const Dispatch = useDispatch();

    const Categories = [
        ['Links', <AiOutlineSearch />],
        ['Images', <IoImagesOutline />],
        ['News', <IoNewspaperOutline />],
        ['Videos', <BsCollectionPlay />],
        ['Shopping', <BsTags />],
        ['Books', <VscNotebook />]
    ];

    return (
        <ul>
            {Categories.map(([ Category, Icon ], Index) => (
                <li
                    key={Index}
                    className={(Category === Type) ? ('Active') : ('Deactive')}
                    onClick={() => {
                        Dispatch(SetIsLoading(true));
                        Dispatch(SetSearchResponse({ Response: { Results: [] } }));
                        Dispatch(SetSearchParams({ Page: 1, Type: Category }));
                        Dispatch(SetIsDoesNotExistsResults(false));
                    }}
                >
                    <i>{Icon}</i>
                    <span>{Category}</span>
                </li>
            ))}
        </ul>
    );
};

export default SearchCategories;