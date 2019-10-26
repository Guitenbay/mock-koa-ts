# mock-koa-ts
A mock server of Koa using typescript

## Using

You can create mock json in `/api` folder
```
- api
  - test
    - user.json
```

Then open powershell and print:
```shell
$ npm run tsc
$ npm run nodemon
```

After that, you would get a `routerMap.json`, which is the url map, like:
```json
{
  "/api/test/user.json": "/api/test/user"
}
```

Open Chrome and print:
```
localhost:3000/api/test/user
```

At last, you could get the context of `/api/test/user.json`

## Question

1. CORS

In the `index.ts`, you can change the `origin` to make your domain be allowed

```ts
mockServer.app.use(cors({
  origin: "http://localhost:8080"
}));
```

---

have fun ; )
