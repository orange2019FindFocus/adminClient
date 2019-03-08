const express = require("express");
const router = express.Router();
const request = require("./request");
const adminJson = require("./admin.json");

// router.post("/auth/login", async (req, res) => {
//   let body = req.body;
//   let ret = {
//     code: 0,
//     message: "success"
//   };
//   if (body.email == adminJson.email && body.password == adminJson.password) {
//     req.session.AUTH = {
//       admin: adminJson
//     };
//     ret.data = adminJson
//   } else {
//     ret.code = 1;
//     ret.message = "登录失败";
//   }

//   return res.json(ret);
// });

router.post("/auth/logout", async (req, res) => {
  req.session.AUTH = null;
  return res.json({
    code: 0,
    message: "success"
  });
});

router.post("/auth/check", async (req, res) => {
  let auth = req.session.AUTH;
  if (!auth || !auth.admin || !auth.admin.id) {
    return res.json({
      code: 1,
      message: "error"
    });
  } else {
    return res.json({
      code: 0,
      message: "success",
      data: auth
    });
  }

});

router.use("/:module/:action", async (req, res) => {
  let url = req.params.module + "/" + req.params.action;
  let data = {
    query: req.query || {},
    body: req.body || {},
    session: req.session || {}
  };

  let ret = await request.post(url, data);
  console.log('session saved: ', ret.session)
  if (ret.session) {
    console.log('session saved: ', ret.session)
    // req.session = ret.session // 存session
    req.session.AUTH = ret.session.AUTH
  }

  return res.json(ret);
});

module.exports = router;
