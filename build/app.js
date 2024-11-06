"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var api_1 = __importDefault(require("./api/api"));
var app = (0, express_1.default)();
var port = 3000;
// Set the views directory and the view engine
app.set('views', path_1.default.join(__dirname, '../src/view'));
app.set('view engine', 'ejs');
// Serve static files from the images directory
app.use('/images/full', express_1.default.static(path_1.default.join(__dirname, 'images/full')));
app.use('/images/thumb', express_1.default.static(path_1.default.join(__dirname, 'images/thumb')));
// Use the route from api.ts
app.use('/', api_1.default);
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
