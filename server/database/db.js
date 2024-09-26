import mongoose from "mongoose";

async function connect() {
    try {
        // Enable strict query mode in Mongoose (ensures deprecated queries are not used)
        mongoose.set('strictQuery', true);

        // Connect to MongoDB Atlas using the connection string
        const db = await mongoose.connect('mongodb+srv://konain7:Kaunain99@cluster0.rmyvhx6.mongodb.net/otp', {
           
        });

        console.log('Connected to MongoDB:', db.connection.name);
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

export default connect;
