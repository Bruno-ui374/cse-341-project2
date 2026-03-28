require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const swaggerHostInput =
  process.env.SWAGGER_HOST || process.env.RENDER_EXTERNAL_URL || 'localhost:3000';

const normalizedHost = swaggerHostInput
  .replace(/^https?:\/\//i, '')
  .split('/')[0];

const inferredScheme = /^https:\/\//i.test(swaggerHostInput)
  ? 'https'
  : /^http:\/\//i.test(swaggerHostInput)
    ? 'http'
    : normalizedHost.includes('localhost')
      ? 'http'
      : 'https';

const doc = {
  info: {
    title: 'Movie API',
    description: 'CRUD API for movies and reviews'
  },
  host: normalizedHost,
  schemes: [process.env.SWAGGER_SCHEMES || inferredScheme]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);