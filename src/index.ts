import * as logger from 'koa-logger'
import mockServer from './MockServer'

mockServer.app.use(logger());
mockServer.mountRouter();
mockServer.createRouterMap();
mockServer.listen(3000);