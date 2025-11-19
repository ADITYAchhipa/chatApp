import express from "express"
import {protectRoute} from "../middleware/auth.middleware.js"
import { getMessages, getUserForSideBar, markMessageAsSeen, sendMessage } from "../controllers/message.Controller.js";

const messageRouter =express.Router();

messageRouter.get("/users",protectRoute,getUserForSideBar)
messageRouter.get("/:id",protectRoute,getMessages)
messageRouter.put("/mark/:id",protectRoute,markMessageAsSeen)
messageRouter.post("/send/:id",protectRoute,sendMessage)
export default messageRouter