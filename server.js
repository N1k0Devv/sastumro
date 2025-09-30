// server.js
import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());

app.post("/send-booking", async (req, res) => {
  const { fullname, email, checkin, checkout, roomtype, guests } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "YOUR_EMAIL@gmail.com",
      pass: "YOUR_APP_PASSWORD",
    },
  });

  let info = await transporter.sendMail({
    from: email,
    to: "YOUR_EMAIL@gmail.com",
    subject: "New Booking Request",
    text: `Booking Details:
    Name: ${fullname}
    Email: ${email}
    Check-in: ${checkin}
    Check-out: ${checkout}
    Guests: ${guests}
    Room: ${roomtype}`,
  });

  res.json({ success: true, info });
});

app.listen(3000, () => console.log("Server running on port 3000"));
