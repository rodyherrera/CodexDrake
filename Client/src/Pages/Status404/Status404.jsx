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

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import './Status404.css';

const Status404 = () => {
    const Navigate = useNavigate();

    useEffect(() => {
        document.title = 'CodexDrake - The page was not found, error 404.'
    }, []);

    return (
        <main id='Status404-Main'>
            <section>
                <article id='Error-Pg'>
                    <div id='Error-Number'>
                        <div className='Number' id='Left-Coffee'>4</div>
                        <div id='Coffee-Mug'></div>
                        <div className='Number' id='Right-Coffee'>4</div>
                    </div>
                </article>
                <article id='Small-Screen'>
                    <span>404</span>
                </article>
            </section>
            <section>
                <Button onClick={() => Navigate('/')} Text='Go Home' />
            </section>
        </main>
    );
};

export default Status404;