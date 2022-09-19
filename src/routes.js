const { Router } = require("express");
const LoginController = require("./app/Controllers/LoginController");
const UserController = require("./app/Controllers/UserController");
const GoogleSheetsController = require("./app/Controllers/GoogleSheetsController");
const AuthMidleware = require("./app/Midlewares/AuthMidleware");

const routes = new Router();

routes.post("/login", LoginController.index);

routes.post("/user", AuthMidleware, UserController.store);
routes.get("/user", AuthMidleware, UserController.show);

routes.get(
  "/getSheetAndCreateContact/:spreadsheetID",
  GoogleSheetsController.getDocumentForCreateContact
);
module.exports = routes;
