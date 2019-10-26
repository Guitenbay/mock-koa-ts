import * as logger from 'koa-logger'
import mockServer from './MockServer'
const cors = require('koa2-cors')

mockServer.app.use(cors({
    origin: "http://localhost:8080"
}));
mockServer.app.use(logger());
mockServer.mountRouter();
mockServer.createRouterMap();
mockServer.listen(3000);