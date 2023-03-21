const mongoose = require('mongoose');
  // 7794037197
  async function run() {
  await mongoose.connect('mongodb://127.0.0.1:27017/harryKart');

  console.log("server running on port 27017");

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function () {
    console.log("we are here")
  });

  const kittySchema = new mongoose.Schema({
    name: String
  });

  kittySchema.methods.speak = function speak() {
    const greeting = "My name is " + this.name;
  };

  const Kitten = mongoose.model('vimal', kittySchema);

  const harryKitty = new Kitten({ name: 'harryKitty10' });

  const harryKitty2 = new Kitten({ name: 'harryKitty11' });

  await harryKitty.save();

  try {
    const kitten = await Kitten.find({ name: "harryKitty10" });
    console.log(kitten);
  } catch (err) {
    console.error(err);
  }
}

run().catch(err => console.log(err));