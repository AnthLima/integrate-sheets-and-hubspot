class UserController {
  
  index(req) {
    console.log(req.body);
  }

}

module.exports = new UserController();
