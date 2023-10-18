import dotenv from "dotenv";

dotenv.config();

export const DbCon: string = process.env.MONGODB_URI || "";
export const PORT: string = process.env.PORT || "";
export const SECRET_KEY: string = process.env.SECRET_KEY || "";
