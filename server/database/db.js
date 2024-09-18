import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function connect() {
    // Create a new instance of MongoMemoryServer
    const mongoServer = await MongoMemoryServer.create(); // Correct usage

    // Get the URI to connect to the in-memory MongoDB instance
    const uri = mongoServer.getUri();

    // Enable strict query mode in Mongoose
    mongoose.set('strictQuery', true);

    // Connect to the in-memory MongoDB
    const db = await mongoose.connect(uri);

    console.log('Connected to in-memory MongoDB:', db.connection.name);

    return db;
}

export default connect;
