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
import './Separator.css';

const Separator = ({ Title }) => {
    return (
        <div className='Separator-Container'>
            <span>{Title}</span>
            <hr />
        </div>
    );
};

export default Separator;