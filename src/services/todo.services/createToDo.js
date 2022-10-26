"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToDoObject = exports.validateBody = void 0;
const uuid_1 = require("uuid");
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
function createToDoObject(title, description) {
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
exports.createToDoObject = createToDoObject;
