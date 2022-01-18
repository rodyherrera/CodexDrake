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

import React from 'react';
import './Images.css';

const Images = ({ Response }) => {
    return (
        <section id='Search-Images-Container'>
            <article>
                {Response.Results.map((Page) => (
                    Page.map((Result, ResultIndex) => (
                        <figure key={ResultIndex}>
                            <a href={Result.Image}>
                                <img width='100%' src={Result.Image} alt={Result.Title} />
                            </a>
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