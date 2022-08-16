import { ClientSession } from "mongodb";
import mongoose from "mongoose";

export async function withTransaction(
  callback: (session: ClientSession) => any
) {
  try {
    const session = await mongoose.startSession();
    let result;

    await session.withTransaction(async () => {
      result = await callback(session);
    });

    await session.endSession();
    return result;
  } catch (error) {
    // console.log(error);
    throw error;
  }
  finally {
    console.log("Transaction finally!")
  }
}
