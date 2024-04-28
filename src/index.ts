import express from "express";
import { AppDataSource } from "./data-source";
import { router } from "./router";
import cors from "cors";

AppDataSource.initialize().then(() => {
  const app = express();

  const allowedOrigins = ["http://localhost:3000"];

  const options: cors.CorsOptions = {
    origin: allowedOrigins,
  };

  app.use(cors(options));

  app.use(express.json());

  app.use(router);

  return app.listen(process.env.PORT, () => {
    console.log(
      `Database successfully running on port ${process.env.DB_PORT} | Server successfully running on port ${process.env.PORT}.`
    );
  });
});
