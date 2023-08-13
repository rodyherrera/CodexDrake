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
const DotEnv = require('dotenv');
const Helmet = require('helmet');
const XSS = require('xss-clean');
const Cors = require('cors');
const HTTPs = require('https');
const HTTP = require('http');
const FileSystem = require('fs');

process.on('uncaughtException', (ServerRuntimeError) => {
    const { name, message } = ServerRuntimeError;
    console.log(name, message);
    console.log('(CodexDrake) > Exception not detected, please catch the errors to make a correct execution of the software.')
    process.exit(1);
});

DotEnv.config({ path: './.env' });

const SearchRoutes = require('./Routes/Search');
const GlobalErrorHandler = require('./Controllers/Error');

const Application = Express();
const Port = process.env.SERVER_PORT || 5000;
const Hostname = process.env.SERVER_HOST || '0.0.0.0';

Application.use(Cors({ origin: process.env.CORS_ORIGIN }));
Application.use(Helmet());
Application.use(Express.json({ limit: process.env.BODY_MAX_SIZE }));
Application.use(XSS());

Application.use('/api/v1/search', SearchRoutes);
Application.use(GlobalErrorHandler);

var Server = HTTP.createServer;
var Configuration = {};

if(process.env.SSL_CERT.length && process.env.SSL_KEY.length){
    Server = HTTPs.createServer;
    Configuration.key = FileSystem.readFileSync(process.env.SSL_KEY);
    Configuration.cert = FileSystem.readFileSync(process.env.SSL_CERT);
}

Server(Configuration, Application).listen(Port, Hostname, () => {
    console.log(`(CodexDrake) > The server was started successfully in the network address (${Hostname}:${Port})`);
});

process.on('unhandledRejection', (ServerRuntimeError) => {
    console.log('(CodexDrake) > Exception not detected, please catch the errors to make a correct execution of the software.');
    Server.close(() => process.exit(1));
});