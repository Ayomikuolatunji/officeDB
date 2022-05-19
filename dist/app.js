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
// call dotenv 
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const employee_1 = __importDefault(require("./routes/employee"));
const errrorPage_1 = __importDefault(require("./util/errrorPage"));
const chats_1 = __importDefault(require("./routes/chats"));
const socket_1 = __importDefault(require("./socket-io/socket"));
const Schema_1 = __importDefault(require("./graphql/Schema"));
const Resolver_1 = __importDefault(require("./graphql/Resolver"));
const company_1 = __importDefault(require("./routes/company"));
const industries_1 = __importDefault(require("./routes/industries"));
const s3Route_1 = __importDefault(require("./routes/s3Route"));
// initialise app
const app = (0, express_1.default)();
// convert request to json using express middleware
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(body_parser_1.default.json());
// file upload parser
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
// enable cors policy
app.use((0, cors_1.default)());
// graphql endpoints
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: Schema_1.default,
    rootValue: Resolver_1.default,
    graphiql: true,
    customFormatErrorFn(err) {
        if (!err.originalError) {
            return err;
        }
        const data = err.originalError.data;
        const message = err.message || 'An error occurred.';
        const code = err.originalError.code || 500;
        return { message: message, status: code, data: data };
    }
}));
// api routes for user auth
app.use("/office-api", industries_1.default);
app.use("/office-api/auth", employee_1.default);
app.use('/office-api', chats_1.default);
app.use("/office-api/auth", company_1.default);
app.use("/office-api/", s3Route_1.default);
app.use(errrorPage_1.default);
// error middleware request
app.use((error, req, res, next) => {
    console.log(error.message);
    const message = error.message;
    const status = error.statusCode;
    res.status(status).json({ message: message, error: "Error message" });
});
// connecting server
const startConnection = (KEY) => {
    mongoose_1.default
        .connect(KEY, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(Db => {
        console.log("connected to database");
        const server = app.listen(process.env.PORT, () => {
            console.log(`App running locally on ${process.env.PORT}`);
        });
        (0, socket_1.default)(server);
    })
        .catch(err => {
        console.log(err.message);
    });
};
startConnection(process.env.MONGODB_KEY);
