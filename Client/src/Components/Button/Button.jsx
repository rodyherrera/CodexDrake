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
import './Button.css';

const Button = ({ Text, ...props }) => {
    return (
        <button {...props} className='Button'>
            <span>{Text}</span>
        </button>
    );
};

export default Button;