const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const {
  SwaggerUIBundle,
  SwaggerUIStandalonePreset,
} = require("swagger-ui-dist");

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css";

swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "REST API for Vehicle Management",
      version: "1.0.0",
      description:
        "This API provides functionalities to manage vehicle data including brands, types, models, and pricelists. It supports operations such as creating, reading, updating, and deleting vehicle information. The API also includes authentication and authorization mechanisms to ensure secure access to resources.",
    },
    servers: [
      {
        url: process.env.BASE_URL,
      },
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [
    "./src/routes/v1/auth.route.js",
    "./src/routes/v1/user.route.js",
    "./src/routes/v1/brand.route.js",
    "./src/routes/v1/type.route.js",
    "./src/routes/v1/model.route.js",
    "./src/routes/v1/year.route.js",
    "./src/routes/v1/pricelist.route.js",
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const options = {
  customCss: ".swagger-ui .topbar { display: none }",
  customCssUrl: CSS_URL,
};

module.exports = swaggerUi.setup(swaggerDocs, options);