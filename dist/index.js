"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger = require("koa-logger");
var MockServer_1 = require("./MockServer");
var cors = require('koa2-cors');
MockServer_1.default.app.use(cors({
    origin: "http://localhost:8080"
}));
MockServer_1.default.app.use(logger());
MockServer_1.default.mountRouter();
MockServer_1.default.createRouterMap();
MockServer_1.default.listen(3000);
//# sourceMappingURL=index.js.map