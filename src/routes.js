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
const createToDo_1 = require("./services/createToDo");
const getToDos_1 = __importDefault(require("./services/getToDos"));
function default_1(app) {
    app.get("/api/todos", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const toDos = (yield (0, getToDos_1.default)());
        return res.status(200).send({
            message: "success",
            data: toDos,
        });
    }));
    app.post("/api/todo", (req, res) => {
        const bodyValidationResult = (0, createToDo_1.validateBody)(req.body);
        if (bodyValidationResult === null || bodyValidationResult === void 0 ? void 0 : bodyValidationResult.error) {
            return res.status(400).send({ error: bodyValidationResult.error });
        }
        const { title, description } = req.body;
        const toDo = (0, createToDo_1.createToDo)(title, description);
        const saveOutcome = (0, createToDo_1.saveTodo)(toDo);
        if (saveOutcome === null || saveOutcome === void 0 ? void 0 : saveOutcome.error) {
            return res.status(400).send({ error: saveOutcome.error });
        }
        return res.status(200).send({ message: "TO DO CREATED" });
    });
}
exports.default = default_1;
