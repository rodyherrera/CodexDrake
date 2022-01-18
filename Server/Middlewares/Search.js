/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * For related information - https://github.com/CodeWithRodi/CodexDrake/
 *
 * CodexDrake<Backend> - A self-hosted, private and secure search engine.
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 ****/

const CatchAsync = require('../Utils/CatchAsync');
const RuntimeError = require('../Utils/RuntimeError');

exports.NeedsQueryParameter = CatchAsync(async (Request, Response, Next) => {
    const { Query } = Request.query;
    if(!Query)
        return Next(new RuntimeError('The "Query" in the querystring is missing.'), 401);
    Next();
});