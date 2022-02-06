var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tarot", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Kết nối database thành công");
});
module.exports = mongoose;