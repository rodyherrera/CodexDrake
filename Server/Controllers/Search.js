/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * For related information - https://github.com/CodeWithRodi/CodexDrake/
 *
 * CodexDrake<Backend> - Self-hosted search engine written entirely in JavaScript.
 * Browse privately and securely for free!
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
****/

const CatchAsync = require('../Utils/CatchAsync');
const SearchEngine = require('cdrake-se');

module.exports = SearchHandler = (Method) => CatchAsync(async (Request, Response) => {
    const { Query, Page, Language } = Request.query;
    Response.status(200).json({
        Status: 'Success',
        ...await SearchEngine({ Method, Query, Page, Language })
    });
});