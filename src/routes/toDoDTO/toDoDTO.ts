import { body } from "express-validator";

export const toDoDTOSchema = [
  body("title")
    .notEmpty()
    .withMessage("Missing title")
    .isString()
    .withMessage("Title should contain only letters"),
  body("description")
    .isLength({ min: 10 })
    .withMessage("Length must be at least 10 characters")
    .notEmpty()
    .withMessage("Missing description"),
];
