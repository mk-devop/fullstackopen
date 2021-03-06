const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

const phonebookSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function (v) {
        return /^(\d{2,3}-\d{3,})$/.test(v);
      },
      //message: 'Phone number format should be xx-xxxxxxx or xxx-xxxxxxxx !',
      message: (props) => `${props.value} is not a valid phone number! 'Phone number format should be xx-xxxxxxx or xxx-xxxxxxxx !`,
    },
  },
});

//bu şemadan oluşturulan bütün sınıfların _id property'sini id yap, __v property'sini sil
phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Phonebooks", phonebookSchema);
