import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { MONGODB_URI} from "../../../ChaiAurCodeBackend/"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}
            /${DB_NAME}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        console.log(`MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection FAILED:", error);
        process.exit(1);
    }
};

export default connectDB;
