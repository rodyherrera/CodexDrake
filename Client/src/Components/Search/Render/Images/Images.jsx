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

import React from 'react';
import { Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import './Images.css';

const Images = () => {
    const Response = useSelector((State) => State.Search.Response);

    return (
        <section id='Search-Images-Container'>
            <article>
                {Response.Results.map((Page) => (
                    Page.map((Result, ResultIndex) => (
                        <figure key={ResultIndex}>
                            <Tooltip title={Result.Title} placement='top-start'>
                                <a href={Result.Image}>
                                    <img width='100%' src={Result.Image} alt={Result.Title} />
                                </a>
                            </Tooltip>
                            <figcaption>
                                <a className='Title' href={Result.Image}>
                                    <span>{Result.Title}</span>
                                </a>
                                <a className='Source' href={Result.Source}>
                                    <span>{Result.Source}</span>
                                </a>
                            </figcaption>
                        </figure>
                    ))
                ))}
            </article>
        </section>
    );
};

export default Images;