// Load environment variables from .env file. Surpress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({ silent: true }); // eslint-disable-line

// default NODE_ENV to 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// default HOST to 'localhost'
process.env.HOST = process.env.HOST || 'localhost';

// default PORT to 3000
process.env.PORT = process.env.PORT || 3000;

// default API_PORT to 3001
process.env.API_PORT = process.env.API_PORT || 3001;

// default APIHOST to localhost
process.env.API_HOST = process.env.API_HOST || 'localhost';

// enable ES6 in subsequent files
require('babel-core/register');

// require the corresponding environment's init file
require(`./${process.env.NODE_ENV}`)
