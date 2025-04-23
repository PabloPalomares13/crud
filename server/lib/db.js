import mysql from "mysql2/promise";

let connection;

const connectToDatabase = async () => {
  try {
    if (!connection) {
      connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "gestionHotel"
      });
    }
    return connection;
  } catch (err) {
    console.log(err);
  }
};

export default connectToDatabase;