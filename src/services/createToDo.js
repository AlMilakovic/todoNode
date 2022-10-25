"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveTodo = exports.createToDo = exports.validateBody = void 0;
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
function validateBody(body) {
    if (!body) {
        return { error: "Missing body" };
    }
    if (!body.title) {
        return { error: "Missing title" };
    }
    if (!body.description) {
        return { error: "Missing description" };
    }
}
exports.validateBody = validateBody;
function createToDo(title, description) {
    const id = (0, uuid_1.v4)();
    const createdDate = new Date().toUTCString();
    const toDo = {
        title,
        description,
        id,
        createdDate,
    };
    return toDo;
}
exports.createToDo = createToDo;
function saveTodo(toDo) {
    try {
        fs_1.default.appendFile("todos.txt", JSON.stringify(toDo) + "\r\n", (error) => {
            if (error)
                return { error };
        });
    }
    catch (error) {
        return { error: "Something went wrong with todo saving" };
    }
}
exports.saveTodo = saveTodo;
