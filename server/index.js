const express = require("express");
const consola = require("consola");
const {
  Nuxt,
  Builder
} = require("nuxt");
const app = express();
const bodyParser = require("body-parser"); // 处理请求中body的内容
const methodOverride = require("method-override");
const session = require("express-session"); // session中间件

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 5100;

app.set("port", port);

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  app.use(
    session({
      // name: 'adminClient',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 6
      },
      secret: "962055fd-2ae5-4880-9d40-eecd5bd3fe03" // session加密
    })
  );

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
  app.use(
    bodyParser.raw({
      type: "application/xml"
    })
  );
  app.use(
    bodyParser.text({
      type: "text/xml"
    })
  );

  // allow overriding methods in query (?_method=put)
  app.use(methodOverride("_method"));

  app.use('/upload', require('./upload'))
  // app.all('*', (req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', 'http://localhost:5100')
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  //   res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,Cache-Control')
  //   res.header('Access-Control-Allow-Credentials', 'true')

  //   next()
  // })

  // api接口
  app.use("/api", require("./api"));

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
