class UserController {
  
  index(req,res) {
    console.log(req.body);
  }
  
  show(req,res) {
    const users = ["Ada", "Dantas", "Monteiro"];
    return res.status(200).json({
      error: false,
      users
    });
  }

}

module.exports = new UserController();
