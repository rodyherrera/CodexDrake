/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * For related information - https://github.com/CodeWithRodi/CodexDrake/
 *
 * CodexDrake<Backend> - A self-hosted optimized search engine built in JavaScript, safe 
 * and private, who is Google?, Bing?, Yahoo?, Qwant?, shut up and drink water :).
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 ****/

const ReportError = (ErrorRaised, Response) => {
    if(process.env.NODE_ENV === 'development')
        Response.status(ErrorRaised.StatusCode).json({
            Status: ErrorRaised.Status,
            Message: ErrorRaised.message,
            Stack: ErrorRaised.stack,
            Error: ErrorRaised
        });
    else{
        console.error('(CodexDrake) > Critical Error:', ErrorRaised);
        Response.status(500).json({
            Status: 'Server Error',
            Message: 'Internal Server Error'
        });
    }
};

module.exports = (RaisedError, Request, Response, Next) => {
    RaisedError.StatusCode = RaisedError.StatusCode || 500;
    RaisedError.Status = RaisedError.Status || 'Server Error';
    ReportError(RaisedError, Response);
};
