import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import { errorHandler } from "./common/middlewares/errorHandler";
import swaggerDef from "./common/middlewares/swagger.json";
import routes from "./application/search/routes";

export default () => {
  const app = express();

  app
    .use(
      "/api-docs",
      swaggerUI.serve,
      swaggerUI.setup(swaggerDef, { explorer: true })
    )
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(
      cors({
        origin: "*",
        methods: ["GET"],
      })
    )
    .use("/api", routes);

  app.all("*", (_, res) => {
    res.sendStatus(404);
  });

  app.use(errorHandler);

  return app;
};
