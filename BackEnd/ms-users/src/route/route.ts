// accountRouter.ts
import express from 'express';
import accountController, { validateRequestBody } from '../Controllers/accountController';

const itemsRouter = express.Router();

itemsRouter.get('/:id', accountController.getAccountById);
itemsRouter.get('/', accountController.loginAccount);
itemsRouter.post('/', validateRequestBody, accountController.createAccount);
itemsRouter.put('/', validateRequestBody, accountController.updateAccount);
itemsRouter.delete('/', accountController.deleteAccount);

export default itemsRouter;
