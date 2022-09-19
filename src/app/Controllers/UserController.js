const bcrypt = require("bcryptjs");
const yup = require("yup");
const User = require("../Models/UserSchema");

class UserController {
  show(req, res) {
    const users = ["Ada", "Dantas", "Monteiro"];
    return res.status(200).json({
      error: false,
      users
    });
  }

  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      res.status(400).json({
        message: "Oops! Invalid data!"
      });
    }

    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      res.status(400).json({
        message: "Oops! The email already exists!"
      });
    }

    const { name, email, password } = req.body;

    const data = { name, email, password };

    data.password = await bcrypt.hash(data.password, 8);

    await User.create(data)
      .then(() => {
        res.status(201).json({
          message: "User created successfully"
        });
      })
      .catch((error) => {
        res.status(404).json({
          message: "Oops! Failed to create user",
          error
        });
      });
  }
}

module.exports = new UserController();
