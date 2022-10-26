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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getToDos_1 = __importDefault(require("../../repository/todo.repository/getToDos"));
function getToDoItem() {
    const getToDoRouter = (0, express_1.Router)();
    getToDoRouter.get("/todos/all", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const todos = (yield (0, getToDos_1.default)());
        return res.status(200).send({ message: "success", data: todos });
    }));
    return getToDoRouter;
}
exports.default = getToDoItem;
