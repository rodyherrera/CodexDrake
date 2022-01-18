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
import './ConnectionLost.css';

const ConnectionLost = () => {
    useEffect(() => {
        document.title = 'Connection lost, waiting to reconnect...';
    }, []);

    return (
        <main id='Connection-Lost-Main'>
            <section>
                <article id='Body'></article>
                <article id='Eye'></article>
                <article id='Mouth'></article>
                <article id='Ground'></article>
                <article id='Comets'></article>
            </section>
        </main>
    );
};

export default ConnectionLost;