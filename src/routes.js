const { Router } = require("express");
const LoginController = require("./app/Controllers/LoginController");
const UserController = require("./app/Controllers/UserController");
const HubspotController = require("./app/Controllers/HubspotController");
const GoogleSheetsController = require("./app/Controllers/GoogleSheetsController");
const AuthMidleware = require("./app/Midlewares/AuthMidleware");

const routes = new Router();

routes.post("/login", LoginController.index);

routes.post("/user", AuthMidleware, UserController.store);
routes.get("/user", AuthMidleware, UserController.show);

routes.post("/hubspot/create-contact", HubspotController.createContact);

routes.get("/sheets/get-info/:spreadsheetID", GoogleSheetsController.getDoc);
module.exports = routes;
