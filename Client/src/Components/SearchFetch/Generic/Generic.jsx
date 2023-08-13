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
import Separator from '../../Separator';
import './Generic.css';

const Generic = ({ Response }) => {
    return (
        <section>
            {Response.Results.map((Page, PageIndex) => (
                <article key={PageIndex}>
                    {PageIndex + 1 !== 1 && (<Separator Title={PageIndex + 1} />)}
                    {Page.map((Result, ResultIndex) => (
                        <div className='Result' key={ResultIndex}>
                            <a href={(!Result.Link.startsWith('http') || !Result.Link.startsWith('https')) ? ('http://' + Result.Link) : (Result.Link)}>
                                <span className='Title'>{Result.Title}</span>
                                <span className='Link'>{Result.Link}</span>
                            </a>
                            <p className='Description'>{Result.Description}</p>
                            <p className='Complement'>
                                {(Result.Platform && Result.PublishedAt) && (
                                    <span>{Result.PublishedAt} in {Result.Platform}</span>
                                )}
                                {(Result.Platform && Result.Price) && (
                                    <span>{Result.Price} in {Result.Platform}</span>
                                )}
                                {(Result.Publisher && Result.PublishedAt) && (
                                    <span>By {Result.Publisher} at {Result.PublishedAt}</span>
                                )}
                            </p>
                        </div>
                    ))}
                </article>
            ))}
        </section>
    );
};

export default Generic;
