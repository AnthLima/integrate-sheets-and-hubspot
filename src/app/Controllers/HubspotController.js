const yup = require("yup");
const axios = require("axios");
const { hubspotToken } = require("../../config/hubspotHapikey");

class HubspotController {
  async createContact(firstname, lastname, email, phone, website, company) {
    const data = {
      firstname,
      lastname,
      email,
      phone,
      website,
      company
    };

    const arrayOfPersonalEmailProviders = [
      "gmail",
      "outlook",
      "yahoo",
      "terra",
      "icloud",
      "hotmail"
    ];

    const schema = yup.object().shape({
      company: yup.string().required().min(3),
      firstname: yup.string().required().min(3),
      lastname: yup.string().required().min(3),
      email: yup.string().email().required(),
      phone: yup.string().required(),
      website: yup.string().required()
    });

    const isValidData = await schema.isValid(data);

    function compareProviders(providerPersonal) {
      if (data.email) {
        return providerPersonal === data.email.split("@")[1].split(".")[0];
      }
      return true;
    }

    if (isValidData) {
      const resultOfFilterEmailProvider =
        arrayOfPersonalEmailProviders.filter(compareProviders);

      const isPersonalProvider = resultOfFilterEmailProvider.length > 0;

      if (!isPersonalProvider) {
        const url = `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${email}/`;
        axios
          .post(
            url,
            {
              properties: [
                { property: "firstname", value: data.firstname },
                { property: "lastname", value: data.lastname },
                { property: "email", value: data.email },
                { property: "phone", value: data.phone },
                { property: "website", value: data.website },
                { property: "company", value: data.company }
              ]
            },
            {
              headers: {
                Authorization: ` Bearer ${hubspotToken}`
              }
            }
          )
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }
}

module.exports = new HubspotController();
