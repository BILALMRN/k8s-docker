// accountRoutes.ts
import express from "express";
import adminController, { validateRequestBody } from "../Controller/adminControler";

const itemsRouter = express.Router();

itemsRouter.get("/login", adminController.loginAccountUser);
// GET /items/:id
itemsRouter.get("/:id", adminController.getAccount);
// Other routes
itemsRouter.post("/", validateRequestBody, adminController.createAccount);
itemsRouter.put("/", validateRequestBody, adminController.updateAccount);
itemsRouter.delete("/", adminController.deleteAccount);

export default itemsRouter;
