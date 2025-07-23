import express from "express";
import UserService from "../services/users.js";
import passport from "passport";

import UserModel from "../models/users.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    res.json(await UserModel.find());
});

userRouter.get("/:id",
    UserService.authenticate,
    UserService.validateAdmin,
    async (req, res) => {
        const user = await UserModel.findById(req.params.id);
        if (user) {
            const plainUser = user.toObject ? user.toObject() : user
            delete plainUser.password
            res.json({
                success: true,
                user: plainUser
            })
        }
        else {
            res.status(404).json({ success: false, message: "User not found" });
        }

    });

userRouter.delete("/:id", async (req, res) => {
    res.json(await UserModel.deleteOne({ _id: req.params.id }));
});

export default userRouter;
