// accountController.ts
import { NextFunction, Request, Response } from 'express';
import accountService from '../service/accountService';
import IUserDocument from '../type';
import Joi from 'joi';
import IAccountService from '../Interface/IAccountService';

class UserController {
    private accountService: IAccountService;

  constructor(accountService: IAccountService) {
    this.accountService = accountService;
  }
 async  getAccountById(req: Request, res: Response) {
  try {
    const user_id: string = req.params.id;

    if (user_id.length < 1) {
      return res.status(400).send("Invalid 'id' parameter ");
    }

    const items: IUserDocument | null = await this.accountService.getAccount(user_id);
    if (items) {
      res.status(200).send(items);
    } else {
      res.status(404).send('Account not found ');
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

 async  loginAccount(req: Request, res: Response) {
  try {
    if (!req.headers.hasOwnProperty('email') || !req.headers.hasOwnProperty('password')) {
      return res.status(400).send("Missing 'data' header");
    }

    if (typeof req.headers['email'] === 'string' && typeof req.headers['password'] === 'string') {
      const email = req.headers['email'];
      const password = req.headers['password'];

      const items: string = await this.accountService.loginAccount(email, password);

      if (items) {
        res.status(200).send(items);
      } else {
        res.status(404).send('Account not found');
      }
    } else {
      res.status(400).send('Invalid headers');
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

 async  createAccount(req: Request, res: Response): Promise<void> {
  try {
    const item: IUserDocument = req.body;
    await this.accountService.createAccount(item);

    res.status(201).send('create account');
  } catch (error: any) {
    res.status(500).json(error.message);
  }
}

 async  updateAccount(req: Request, res: Response): Promise<void> {
  try {
    const item: IUserDocument = req.body;
    const result = await this.accountService.updateAccount(item);
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(500).send('Failed to update account');
    }
  } catch (error: any) {
    res.status(500).json(error.message);
  }
}

 async  deleteAccount(req: Request, res: Response) {
  try {
    if (!req.headers['id']) {
      return res.status(400).send("Missing 'id' header");
    }

    const user_id: string = req.headers['id'].toString();

    if (typeof user_id !== 'string') {
      return res.status(400).send('Invalid id parameter');
    }

    await this.accountService.deleteAccount(user_id);
    res.status(204).send('Account deleted successfully');
  } catch (error: any) {
    console.error('Error deleting account:', error);
    res.status(500).send('Failed to delete account');
  }
}

}

const userController = new UserController(accountService);

export default userController;

export function validateRequestBody(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      _id: Joi.string().optional(),
      password_hash: Joi.string().required().min(8),
      first_name: Joi.string().required().min(2).max(50), // Adjust min and max lengths
      last_name: Joi.string().required().min(2).max(50),
      email: Joi.string().email().required(),
      phone: Joi.string().trim().required().max(15), // Trim whitespace and set max length
      address: Joi.string().required().min(5).max(100),
      city: Joi.string().required(),
      zip: Joi.number().integer().required().min(1000).max(999999), // Customize min and max values
      country: Joi.string().required().min(2).max(50),
    });
  
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }
  
    next();
  }