import { body } from "express-validator";
import { todo } from "../../database/models/todos";

export const toDoDTOSchema = [
  body("title")
    .notEmpty()
    .withMessage("Missing title")
    .escape()
    .isString()
    .withMessage("Title should contain only letters")
    .escape()
    .custom((value) => {
      return todo.findOne({ title: value }).then((data) => {
        if (data) return Promise.reject("Title already taken");
      });
    }),
  body("description")
    .notEmpty()
    .withMessage("Missing description")
    .escape()
    .isLength({ min: 10 })
    .withMessage("Length must be at least 10 characters"),
];
