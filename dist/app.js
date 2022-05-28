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
// dependency import modules
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_graphql_1 = require("express-graphql");
const body_parser_1 = __importDefault(require("body-parser"));
const method_override_1 = __importDefault(require("method-override"));
// call dotenv 
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// external import modules
const errrorPage_1 = __importDefault(require("./util/errrorPage"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const requestHeader_1 = __importDefault(require("./middleware/requestHeader"));
const graphql_1 = __importDefault(require("./graphql/graphql"));
const v1Api_1 = __importDefault(require("./services/v1Api"));
const mongoDB_1 = __importDefault(require("./database/mongoDB"));
// initialise app
const app = (0, express_1.default)();
// convert request to json using express middleware
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(body_parser_1.default.json());
app.use((0, method_override_1.default)());
// file upload parser
// request headers middleware
app.use(requestHeader_1.default);
// enable cors policy
app.use((0, cors_1.default)());
// graphql endpoints
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)((0, graphql_1.default)()));
//all api routes api routes 
app.use("v1", v1Api_1.default);
app.use(errrorPage_1.default);
// error middleware request
app.use(errorHandler_1.default);
// connecting server
const startConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongoDB_1.default)();
        app.listen(process.env.PORT, () => {
            console.log(`App runing on port ${process.env.PORT}`);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
});
startConnection();
