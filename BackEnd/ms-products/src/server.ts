import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import itemsRouter from "./route/route";

dotenv.config();


const PORT: number = Number(process.env.PORT) || 3000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

class App {
  public server;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    app.use("/v1/product", itemsRouter);
  }
}

export default new App().server;
