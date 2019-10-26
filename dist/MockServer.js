"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var Router = require("koa-router");
var glob = require("glob");
var path_1 = require("path");
var fs = require("fs");
var config_1 = require("./config");
var MockServer = /** @class */ (function () {
    function MockServer() {
        this.app = new Koa();
        this.router = new Router({ prefix: config_1.prefix });
        this.routerMap = new Object({});
    }
    MockServer.prototype.listen = function (port) {
        this.app.listen(port, function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('mock server is running');
        });
    };
    MockServer.prototype.mountRouter = function () {
        var _this = this;
        // 注册路由
        glob.sync(path_1.resolve('./api', "**/*.json")).forEach(function (item, i) {
            var apiJsonPath = item && item.split(config_1.prefix)[1];
            var apiPath = apiJsonPath.replace('.json', '');
            _this.router.get(apiPath, function (ctx, next) {
                try {
                    var jsonStr = fs.readFileSync(item).toString();
                    // ctx.body = {
                    //   data: JSON.parse(jsonStr),
                    //   state: 200,
                    //   msg: 'success' // 自定义响应体
                    // }
                    ctx.body = JSON.parse(jsonStr);
                }
                catch (err) {
                    ctx.throw('服务器错误', 500);
                }
            });
            // 记录路由
            _this.routerMap[config_1.prefix + apiJsonPath] = config_1.prefix + apiPath;
        });
        this.app.use(this.router.routes()).use(this.router.allowedMethods());
    };
    MockServer.prototype.createRouterMap = function () {
        fs.writeFile(config_1.mapPath, JSON.stringify(this.routerMap, null, 2), function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('路由地图生成成功...');
            }
        });
    };
    return MockServer;
}());
exports.default = new MockServer();
//# sourceMappingURL=MockServer.js.map