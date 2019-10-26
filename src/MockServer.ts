import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as glob from 'glob'
import { resolve } from 'path'
import * as fs from 'fs'
import { mapPath, prefix } from './config'

class MockServer implements MockServerInterface {
  public app;
  private router;
  private routerMap; // 存放路由映射

  constructor() {
    this.app = new Koa();
    this.router = new Router({prefix});
    this.routerMap = new Object({});
  }

  listen(port) {
    this.app.listen(port, function(err){
      if (err) {
        console.log(err);
        return;
      }
      console.log('mock server is running')
    })
  }

  mountRouter() {
    // 注册路由
    glob.sync(resolve('./api', "**/*.json")).forEach((item, i) => {
      let apiJsonPath = item && item.split(prefix)[1];
      let apiPath = apiJsonPath.replace('.json', '');
      
      this.router.get(apiPath, (ctx, next) => {
        try {
          let jsonStr = fs.readFileSync(item).toString();
          // ctx.body = {
          //   data: JSON.parse(jsonStr),
          //   state: 200,
          //   msg: 'success' // 自定义响应体
          // }
          ctx.body = JSON.parse(jsonStr)
        }catch(err) {
          ctx.throw('服务器错误', 500);
        }
      });

      // 记录路由
      this.routerMap[prefix + apiJsonPath] = prefix + apiPath;
    });
    this.app.use(this.router.routes()).use(this.router.allowedMethods());
  }

  createRouterMap() {
    fs.writeFile(mapPath, JSON.stringify(this.routerMap, null, 2), err => {
      if (err) {
        console.log(err);
      } else {
        console.log('路由地图生成成功...')
      }
    });
  }
}

export default new MockServer()