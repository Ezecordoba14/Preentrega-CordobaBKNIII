import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import dotenvConfig from "../config/dotenv.config.js";

const PORT = dotenvConfig.port;

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Adoptme",
            version: "1.0.0",
            description: ""
        },
        servers: [
            {
                url: `http://localhost:${PORT}`
            }
        ]
    },
    apis: ["./src/routes/users.router.js"]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)
export default (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}