const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema({
  nmae: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: false,
  },
});

const userModel = mongoose.models.Users || mongoose.model("Users", Schema);

export default userModel;
