"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createToDo_1 = require("../../services/todo.services/createToDo");
const saveToDo_1 = require("../../repository/todo.repository/saveToDo");
function createToDoItem() {
    const createToDoRouter = (0, express_1.Router)();
    return createToDoRouter.post("/todo", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const bodyValidationResult = (0, createToDo_1.validateBody)(req.body);
        if (bodyValidationResult === null || bodyValidationResult === void 0 ? void 0 : bodyValidationResult.error) {
            return res.status(400).send({ error: bodyValidationResult.error });
        }
        const { title, description } = req.body;
        const toDo = (0, createToDo_1.createToDoObject)(title, description);
        const saveOutcome = yield (0, saveToDo_1.saveTodo)(toDo);
        if (saveOutcome === null || saveOutcome === void 0 ? void 0 : saveOutcome.error) {
            return res.status(400).send({ error: saveOutcome.error });
        }
        return res.status(200).send({ message: "TO DO CREATED" });
    }));
}
exports.default = createToDoItem;
