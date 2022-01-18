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

const Express = require('express');
const SearchRoutes = require('../Settings').Routes.Search;
const SearchHandler = require('../Controllers/Search');
const { NeedsQueryParameter } = require('../Middlewares/Search');
const Router = Express.Router();

Router.use(NeedsQueryParameter);

Router
    .get(SearchRoutes.Search, SearchHandler('Search'))
    .get(SearchRoutes.Images, SearchHandler('Images'))
    .get(SearchRoutes.News, SearchHandler('News'))
    .get(SearchRoutes.Videos, SearchHandler('Videos'))
    .get(SearchRoutes.Shopping, SearchHandler('Shopping'))
    .get(SearchRoutes.Books, SearchHandler('Books'))
    .get(SearchRoutes.Suggestions, SearchHandler('Suggest'));

module.exports = Router;