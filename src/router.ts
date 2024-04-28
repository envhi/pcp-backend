import { Router } from "express";
import { userController } from "./app/controller/userController";
import { loginController } from "./app/auth/loginController";
import { walletController } from "./app/controller/walletController";
import { validateUser } from "./app/middleware/validate-user";
import { validateLogin } from "./app/middleware/validate-login";
import { transactionController } from "./app/controller/transactionController";
import { transactionMiddleware } from "./app/middleware/transaction.middleware";
import { auth } from "./app/middleware/auth";

export const router: Router = Router();

// wallet routes
router.get("/wallets", walletController.findAll);
router.get("/wallets/:id", walletController.findWalletById);

// transaction
router.post(
  "/users/transactions",
  transactionMiddleware,
  transactionController.createTransaction
);

//Routes
router.get("/xdd", auth, userController.returnUserDataByToken);

// create user
router.post("/users", validateUser, userController.create);

// list all users
router.get("/users", userController.findAll);

// find user by id
router.get("/users/:id", userController.findUserById);

// update user by id
router.put("/users/:id", userController.updatePasswordById);

// delete user by id
router.delete("/users/:id", userController.deleteById);

// login
router.post("/users/login", validateLogin, loginController.login);
