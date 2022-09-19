const { GoogleSpreadsheet } = require("google-spreadsheet");
// const spreadsheet = require("../../config/spreadsheet.json");
require("dotenv").config();

class GoogleSheetsController {
  getDoc = async (req, res) => {
    const { spreadsheetID } = req.params;
    const doc = new GoogleSpreadsheet(spreadsheetID);

    await doc.useServiceAccountAuth({
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n")
    });
    await doc.loadInfo();
    console.log(doc.title);
  };
}

module.exports = new GoogleSheetsController();
