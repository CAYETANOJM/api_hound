const mongoose = require('mongoose');

async function connectDB() {
  const { MONGODB_URI, DB_NAME } = process.env;

  if (!MONGODB_URI) {
    throw new Error('La variable MONGODB_URI es obligatoria.');
  }

  mongoose.set('strictQuery', true);

  const connection = await mongoose.connect(MONGODB_URI, {
    dbName: DB_NAME || undefined
  });

  console.log(`MongoDB conectado: ${connection.connection.host}`);
  return connection;
}

module.exports = connectDB;
