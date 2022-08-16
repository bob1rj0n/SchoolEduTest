import mongoose from "mongoose";
import { ENV } from "../config";

export async function connectDB() {
    try {
        console.log(ENV.DB_URL)
        mongoose.set("debug", true)
        await mongoose.connect(ENV.DB_URL, {})
        console.log("db success connected....")
    } catch (error) {
        console.log(error)
    }
}