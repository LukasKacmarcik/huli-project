"use strict";
// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export default async function main(reqBody) {
  // create reusable transporter object using the default SMTP transport

  const html = `<div>
  <h1>Objedávka</h1>
  <p><strong>Meno:</strong> ${reqBody.userFullName}</p>
  <p><strong>Email:</strong> ${reqBody.userEmailAddress}</p>
  <p><strong>Mesto:</strong> ${reqBody.userCity}</p>
  <p><strong>Adresa:</strong> ${reqBody.userAddress}</p>
  <p><strong>Tel.</strong> číslo: ${reqBody.userTelNumber}</p>
  <p><strong>Shisha:</strong> ${reqBody.shishaName}</p>
  <p><strong>Extras:</strong> ${reqBody.extras
    .reduce((acc, extra) => {
      acc += ` ${extra.name}`;
      return acc;
    }, "")
    .trim()}</p>
  <p><strong>Prichuť:</strong> ${reqBody.tobacco.name}</p>
  <p><strong>Cena:</strong> ${reqBody.total}</p>
  <p><strong>Poznámka:</strong> ${reqBody.userNote}</p>
  <p><strong>Dátum:</strong> ${reqBody.dateOfDelivery}</p>
  <p><strong>Čas:</strong> ${reqBody.timeOfDelivery}</p>
</div>`;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Čajovňa Aura" <${process.env.MAIL_USER}>`,
    to: "kacmi41@azet.sk",
    subject: "Nová Objednávka",
    html: html,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);
