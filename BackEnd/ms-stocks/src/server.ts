import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import itemsRouter from "./route/route";

dotenv.config();


const PORT: number = Number(process.env.PORT) || 3000;

class App {
  public server;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded())
    this.server.use(cors());
    this.server.use(helmet());
  }

  routes() {
    this.server.use("/v1/stock", itemsRouter);
  }
}

const app = new App();
app.server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

