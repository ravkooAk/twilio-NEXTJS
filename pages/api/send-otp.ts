import { channel } from "diagnostics_channel";
import { NextApiRequest, NextApiResponse } from "next";
import { requestToBodyStream } from "next/dist/server/body-streams";
import twilio from "twilio";


export default function sendOtp(req: NextApiRequest, res: NextApiResponse) {
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_SERVICE_SID, );
const phone = req.body.phone;
async function sendOTP(phone: string) {
  try {
    // const otp = Math.floor(1000 + Math.random() * 9000);  // Generate a random 4-digit OTP

//     await client.messages.create({
//       to: `+91${phone}`,
//       from: process.env.TWILIO_PHONE_NUMBER
//     });
//   } catch (error) {
//     console.error(error);
//     throw new Error('Failed to send OTP');
//   }

// }
// }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);
  const servicesId = process.env.TWILIO_SERVICE_SID;

  // verify the otp code
    client.verify
    .services(servicesId)
    .verifications.create({
        to: req.body.phone,
        channel: "sms",
    })
    .then((data) => {
        res.status(200).json({ message: "OTP sent successfully" });
    }
    )
    .catch((err) => {
        res.status(500).json({ message: "Error sending OTP" });
    }
    );
}
