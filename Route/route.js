import { Controllers } from "../Controller/controller.js";
 import { Router } from "express";

  export const router = Router()

   router.post('/login', Controllers.login)
   router.post('/register',Controllers.register)