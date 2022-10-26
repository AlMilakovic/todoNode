"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createToDo_1 = __importDefault(require("./createToDo"));
const getToDos_1 = __importDefault(require("./getToDos"));
function toDoRoutes() {
    const toDoRoutes = (0, express_1.Router)();
    toDoRoutes.use((0, createToDo_1.default)());
    toDoRoutes.use((0, getToDos_1.default)());
    return toDoRoutes;
}
exports.default = toDoRoutes;
