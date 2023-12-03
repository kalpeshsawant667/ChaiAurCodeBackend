import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `mongodb+srv://kalpeshsawant667:Saanvisaw2632@cluster0.hagly.mongodb.net
            /${DB_NAME}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        console.log(`MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection ERROR:", error);
        process.exit(1);
    }
};

export default connectDB;
