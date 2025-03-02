import { Router } from "express";
import { registerUserController, verifyEmailController } from "../controllers/user.Controllers.js";


  const userRouter = Router()

  userRouter.post('/register',registerUserController)
  userRouter.post('/verify-email',verifyEmailController)//first parameter is our url which is you like then the secound parameter is the controller which is is the name we use in the controller page to bild this controller
  

  export default userRouter