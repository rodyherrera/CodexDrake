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

const Express = require('express');
const SearchHandler = require('../Controllers/Search');
const { NeedsQueryParameter } = require('../Middlewares/Search');
const Router = Express.Router();

Router.use(NeedsQueryParameter);

Router
    .get('/', SearchHandler('Search'))
    .get('/images', SearchHandler('Images'))
    .get('/news', SearchHandler('News'))
    .get('/videos', SearchHandler('Videos'))
    .get('/shopping', SearchHandler('Shopping'))
    .get('/books', SearchHandler('Books'))
    .get('/wikipedia', SearchHandler('Wikipedia'))
    .get('/suggestions', SearchHandler('Suggest'));

module.exports = Router;