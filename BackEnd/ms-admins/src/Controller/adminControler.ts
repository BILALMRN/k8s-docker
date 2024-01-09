import { NextFunction, Request, Response } from "express";
import { AdminEntity } from "../Model/AdminEntity";
import Joi from "joi";
import adminService from "../Service/adminService";
import IAdmin from "../Interface/IAccount";

class AdminController {
  private adminService: IAdmin;

  constructor(stockService: IAdmin) {
    this.adminService = stockService;
  }
async  getAccount(req: Request, res: Response) {
  try {
    const user_id: number = parseInt(req.params.id);

    if (isNaN(user_id)) {
      return res.status(400).send("Invalid 'id' parameter ");
    }

    const { success, account } = await this.adminService.getAccount(user_id);
    if (success) {
      res.status(200).send(account);
    } else {
      res.status(404).send("Account not found ");
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

 async  loginAccountUser(req: Request, res: Response) {
  try {
    if (
      !req.headers.hasOwnProperty("username") ||
      !req.headers.hasOwnProperty("password")
    ) {
      return res.status(401).send("Unauthorized");
    }

    if (
      typeof req.headers["username"] === "string" &&
      typeof req.headers["password"] === "string"
    ) {
      const username = req.headers["username"];
      const password = req.headers["password"];

      const items: string = await this.adminService.loginAccount(username, password);

      if (items) {
        res.status(200).send(items);
      } else {
        res.status(404).send("Account not found");
      }
    } else {
      res.status(400).send("Invalid headers");
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

 async  createAccount(req: Request, res: Response): Promise<void> {
  try {
    const item: AdminEntity = req.body;
    const { success, account } = await this.adminService.createAccount(item);

    if (success) {
      res.status(201).json(account);
    } else {
      res.status(500).json({ error: "Error creating account" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Error creating account" });
  }
}

 async updateAccount(req: Request, res: Response): Promise<void> {
  try {
    const item: AdminEntity = req.body;
    const { success, account } = await this.adminService.updateAccount(item);

    if (success) {
      res.status(204).json(account);
    } else {
      res.status(500).json({ error:  "Error updating account" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Error updating account" });
  }
}

// DELETE /items/:id
async deleteAccount(req: Request, res: Response) {
    try {
      const admin_id: number = parseInt(req.body.admin_id);
      if (isNaN(admin_id)) return res.status(400).send("Invalid 'id' parameter");
  
      await this.adminService.deleteAccount(admin_id);
      res.sendStatus(204);
    } catch (error: any) {
      res.status(500).send("error to delete");
    }
  }

}


const adminController = new AdminController(adminService);
export default adminController;
  export function validateRequestBody(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    admin_id: Joi.number().integer().optional(),
    username: Joi.string().optional(), // Assuming it's optional, adjust as needed
    password_hash: Joi.string().required().min(8),
    first_name: Joi.string().required().min(2).max(50),
    last_name: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required(),
    urlPhotoProfile: Joi.string().optional(), // Assuming it's optional, adjust as needed
    coverPhoto: Joi.string().optional(), // Assuming it's optional, adjust as needed
    phone: Joi.string().trim().required().max(15),
    address: Joi.string().required().min(5).max(100),
    city: Joi.string().required(),
    zip: Joi.string().required().min(4).max(6), // Assuming it's a string based on your AccountAdmin type
    country: Joi.string().required().min(2).max(50),
    created_at: Joi.date().optional(), // Assuming it's optional, adjust as needed
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  next();
}

