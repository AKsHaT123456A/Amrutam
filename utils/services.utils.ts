import nodemailer from "nodemailer";
import * as admin from "firebase-admin";

import {
  NODEMAILER_FROM,
  NODEMAILER_PASS,
  NODEMAILER_USER,
  TWILLIO_CALL,
  TWILLIO_NUMBER,
  TWILLIO_SECRET,
  TWILLIO_SID,
} from "./constants.utils";

import serviceAccount from "../liviso-318b1bd044f4.json";

const accountSid = TWILLIO_SID;
const authToken = TWILLIO_SECRET;
const client = require("twilio")(accountSid, authToken);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const message = (phone: string) => {
  client.messages
    .create({
      body: "This is an SMS notification from Twilio.",
      from: `${TWILLIO_CALL}`,
      to: `${phone}`,
    })
    .then((message: any) => console.log(message.sid))
    .catch((error: Error) => console.error(error));
};

export const calls = (phone: string) => {
  client.calls
    .create({
      twiml:
        "<Response><Say>This is a call notification from Twilio Voice.</Say></Response>",
      to: `${phone}`,
      from: `${TWILLIO_CALL}`,
    })
    .then((call: any) => console.log(call.sid))
    .catch((error: Error) => console.error(error));
};

export const whatsapp = (phone: string) => {
  client.messages
    .create({
      from: `whatsapp:${TWILLIO_NUMBER}`,
      body: "Hello, there!",
      to: `whatsapp:${phone}`,
    })
    .then((message: any) => console.log(message.sid))
    .catch((error: Error) => console.error(error));
};

export const emailer = async (to: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_PASS,
    },
  });

  const mailOptions = {
    from: NODEMAILER_FROM,
    to: to,
    subject: "Notification Subject",
    text: "Notification Content",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export const notification = async (
  token: string,
  title: string,
  body: string,
) => {
  const message = {
    token, 
    notification: {
      title,
      body,
      sound: "default",
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent push notification:", response);
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};

// const apiToken = EXOTEL_TOKEN
// const exoPhoneNumber = '09336183391';

// const exotelUrl = `https://api.exotel.com/v2/Accounts/${apiKey}/Calls/connect.json`;

// const requestData = {
//   from: exoPhoneNumber,
//   to: phone,
//   caller_id: exoPhoneNumber,
// };

// axios
//   .post(exotelUrl, requestData, {
//     auth: {
//       username: apiKey,
//       password: apiToken,
//     },
//   })
//   .then((response) => console.log('Call initiated:', response.data))
//   .catch((error) => console.error('Error initiating call:', error));
