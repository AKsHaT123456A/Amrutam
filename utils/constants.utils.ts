import dotenv from "dotenv";

dotenv.config();

export const DbCon: string = process.env.MONGODB_URI || "";
export const PORT: string = process.env.PORT || "";
export const JWT_SECRET: string = process.env.SECRET_KEY || "";
export const TOKEN_EXPIRATION: number = parseInt(process.env.TOKEN_EXPIRATION || "3600", 10);
export const TWILLIO_SID:string = process.env.TWILLIO_SID||'';
export const TWILLIO_SECRET:string = process.env.TWILLIO_SECRET||'';
export const EXOTEL_API:string = process.env.EXOTEL_API||'';
export const EXOTEL_TOKEN:string = process.env.EXOTEL_TOKEN||'';
export const TWILLIO_NUMBER:string = process.env.TWILLIO_NUMBER||'';
export const TWILLIO_CALL:string = process.env.TWILLIO_CALL||'';
export const NODEMAILER_USER:string = process.env.USER||'';
export const NODEMAILER_PASS:string = process.env.PASS||'';
export const NODEMAILER_FROM:string = process.env.FROM||'';