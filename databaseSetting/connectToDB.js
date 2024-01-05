const { default: mongoose } = require("mongoose");

async function connectToDB() {
  if (!mongoose.connections[0].readyState) {
    try {
      await mongoose.connect("mongodb://localhost:27017/admin-panel");
      console.log("connect to database was succesfully !!!");
    } catch (err) {
      console.log("connect to database was lose !!!", err);
    }
  } else {
    return false;
  }
}

export default connectToDB;
