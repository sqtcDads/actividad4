import express from "express";
import UserService from "../services/users.js";

import UserModel from "../models/users.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    res.json(await UserModel.find());
});

// userRouter.post("/login", UserService.validateLogin, UserService.loginUser);

userRouter.get("/:id", async (req, res) => {
    res.json(await UserModel.findById(req.params.id));
});

userRouter.delete("/:id", async (req, res) => {
    res.json(await UserModel.deleteOne({ _id: req.params.id }));
});

export default userRouter;
