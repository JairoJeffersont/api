const express = require('express');
const addLog = require('./middleware/logger');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes/router');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Gabinete Digital',
            version: '1.0.0',
            description: 'Documentação da API da aplicação Gabinete Digital',
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
    bodyParser.json({ limit: '50mb' })(req, res, (err) => {
        if (err) {
            return res.status(400).json({ status: 400, message: 'JSON malformado' });
        }
        next();
    });
});

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/', router);

const options = {
    key: fs.readFileSync(path.resolve(__dirname, process.env.SSL_KEY_PATH)),
    cert: fs.readFileSync(path.resolve(__dirname, process.env.SSL_CERT_PATH))
};

https.createServer(options, app).listen(process.env.PORT, () => {
    addLog('boot', 'Servidor iniciado');
});
