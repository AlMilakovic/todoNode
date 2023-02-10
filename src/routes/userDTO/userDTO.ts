import { body } from "express-validator";
import { user } from "../../database/models/users";
import bcrypt from "bcrypt";

export const userDTOSchema = [
  body("fullName")
    .notEmpty()
    .withMessage("Missing full name")
    .escape()
    .isString()
    .withMessage("Name should contain only letters")
    .escape(),

  body("email")
    .notEmpty()
    .withMessage("Missing email")
    .escape()
    .isEmail()
    .withMessage("Incorrect email format")
    .custom((value) => {
      return user.findOne({ email: value }).then((data) => {
        if (data) return Promise.reject("Email already taken");
      });
    }),

  body("password")
    .notEmpty()
    .withMessage("Missing password")
    .isStrongPassword({
      minLength: 8,

      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    })
    .withMessage(
      "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8  characters"
    )
    .escape()
    .isLength({ max: 20 })
    .withMessage("Password length must be under 20 characters"),

  body("passwordRepeat")
    .notEmpty()
    .withMessage("Missing password repeat")
    .escape()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords are not equal"),
];

export const userLoginDTOSchema = [
  body("email")
    .notEmpty()
    .withMessage("Missing email")
    .escape()
    .isEmail()
    .withMessage("Incorrect email format")
    .custom((value) => {
      return user.findOne({ email: value }).then((data) => {
        if (!data) return Promise.reject("User does not exist");
      });
    }),
  body("password")
    .notEmpty()
    .withMessage("Missing password")

    .escape()
    .custom((value, { req }) => {
      return user.findOne({ email: req.body.email }).then(async (data) => {
        if (!data) return;

        const passwordCompareResult = await bcrypt.compare(
          value,
          data?.password
        );

        if (!passwordCompareResult) return Promise.reject("Wrong password");
      });
    })
    .withMessage(""),
];
