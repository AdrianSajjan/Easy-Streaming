import { body } from "express-validator";

const registrationChain = [
  body("name").notEmpty().withMessage("Name cannot be empty"),
  body("emailAddress")
    .notEmpty()
    .withMessage("Email Address cannot be empty")
    .isEmail()
    .withMessage("Please provide a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password should be atleast 8 characters"),
];

export { registrationChain };
