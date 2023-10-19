import dotenv from "dotenv";

dotenv.config();

export const DbCon: string = process.env.MONGODB_URI || "";
export const PORT: string = process.env.PORT || "";
export const JWT_SECRET: string = process.env.SECRET_KEY || "";
export const TOKEN_EXPIRATION: number = parseInt(process.env.TOKEN_EXPIRATION || "3600", 10);
