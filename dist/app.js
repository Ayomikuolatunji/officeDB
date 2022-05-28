"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_graphql_1 = require("express-graphql");
const body_parser_1 = __importDefault(require("body-parser"));
const method_override_1 = __importDefault(require("method-override"));
// call dotenv 
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const errrorPage_1 = __importDefault(require("./util/errrorPage"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const requestHeader_1 = __importDefault(require("./middleware/requestHeader"));
const graphql_1 = __importDefault(require("./graphql/graphql"));
const employeesApi_1 = __importDefault(require("./services/employeesApi"));
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
// api routes for user auth
app.use(employeesApi_1.default);
app.use(errrorPage_1.default);
// error middleware request
app.use(errorHandler_1.default);
const MONGODB_KEY = process.env.MONGODB_KEY;
// connecting server
const startConnection = () => {
    if (MONGODB_KEY === undefined) {
        console.log("MongoDB key is not set");
    }
    else {
        mongoose_1.default
            .connect(MONGODB_KEY, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(Db => {
            console.log("connected to database");
            app.listen(process.env.PORT, () => {
                console.log(`App running locally on ${process.env.PORT}`);
            });
        })
            .catch(err => {
            console.log(err.message);
        });
    }
};
startConnection();
