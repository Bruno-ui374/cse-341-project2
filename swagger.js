require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Movie API',
    description: 'CRUD API for movies and reviews'
  },
  host: (process.env.SWAGGER_HOST || 'localhost:3000').replace(/^https?:\/\//i, ''),
  schemes: [process.env.SWAGGER_SCHEMES || 'http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);