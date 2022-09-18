const yup = require('yup');
const axios = require('axios');
const { hubspotToken } = require('../../config/hubspotHapikey'); 

class HubspotController {
    async createContact(req, res) {
        const schema = yup.object().shape({
            companyName: yup.string().required().min(3),
            firstname: yup.string().required().min(3),
            lastname: yup.string().required().min(3),
            email: yup.string().email().required(),
            phone: yup.string().required().min(10),
            website: yup.string().required().min(8)

        });
        const isValidData = await schema.isValid(req.body); 
        if(!isValidData){
            res.status(402).json({
                "message":"Oops! Invalid data, try again!"
            });
        }
        const { companyName, firstname, lastname, email, phone, website} = req.body;

        const url = `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${email}/`;
        axios.post(url, {
                "properties": [
                    { "property": "firstname", "value": firstname },
                    { "property": "lastname", "value": lastname },
                    { "property": "email", "value": email },
                    { "property": "phone", "value": phone },
                    { "property": "website", "value": website },
                    { "property": "company", "value": companyName },
                ]
            }, {    
            headers: {
                'Authorization': ` Bearer ${hubspotToken}` 
            }
        })
        .then((result)=>{
            console.log(result);
            res.status(201).json({
                "message": "Created contact in hubspot sucessfully!"
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(404).json({
                "message": "Oops! Failed created contact in hubspot! "
            });
        })

    }
}

module.exports =  new HubspotController();