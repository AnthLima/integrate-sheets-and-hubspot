const { GoogleSpreadsheet } = require("google-spreadsheet");
require("dotenv").config();
const { createContact } = require("./HubspotController");

class GoogleSheetsController {
  getDocumentForCreateContact = async (req, res) => {
    try {
      const { spreadsheetID } = req.params;
      const doc = new GoogleSpreadsheet(spreadsheetID);

      await doc.useServiceAccountAuth({
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n")
      });
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];
      const rows = await sheet.getRows();
      const amoutOfRows = rows.length;
      const limitOfRegistration = 10;

      if (amoutOfRows <= limitOfRegistration) {
        rows.forEach((row) => {
          createContact(
            row.firstname,
            row.lastname,
            row.email,
            row.phone,
            row.website,
            row.company
          );
        });
      }

      res.status(200).json({
        message: "Contacts created successfully!"
      });
    } catch (error) {
      res.status(200).json({
        message: "Oops! Failed to created contacts!",
        error
      });
    }
  };
}

module.exports = new GoogleSheetsController();
