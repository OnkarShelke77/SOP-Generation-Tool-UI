const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, age, qualification, institute, study, country, goals } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // e.g., 'Gmail', 'Outlook', 'Yahoo', etc.
        auth: {
            user: 'your-email@example.com', // your email address
            pass: 'your-email-password'  // your email password
        }
    });

    // Compose email
    const mailOptions = {
        from: 'your-email@example.com', // sender's email address
        to: email, // recipient's email address (the email provided in the form)
        subject: 'Your SOP',
        text: `
            Hello ${name},

            Here is your Statement of Purpose:
            
            Name: ${name}
            Age: ${age}
            Highest Qualification: ${qualification}
            Institute: ${institute}
            What did you study: ${study}
            Country: ${country}
            Future Goals: ${goals}
        `
    };
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('SOP sent successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
