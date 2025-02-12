require('dotenv').config()
const sanitizeHtml = require("sanitize-html")
const postmark = require('postmark')
const validator = require('validator')

const postmark_client = process.env.POSTMARK

//* This regex will catch potential malicious scripts in the body.
const maliciousJsRegex = /(<script\b[^>]*>[\s\S]*?<\/script>|javascript\s*:|on\w+\s*=|eval\s*\(|document\.(cookie|write|location)|window\.(location|open)|fetch\s*\(|XMLHttpRequest\s*\()/i

async function postNewContact(req, res, next) {

    const { name, email, message } = req.body

    if (!name || !email || !message) return res.status(400).json({ error: 'You must provide name, email and message parameters before submitting.' })

    if (maliciousJsRegex.test(name) || maliciousJsRegex.test(email) || maliciousJsRegex.test(message)) {
        return res.status(400).json({ error: "Invalid input detected." });
    }

    if (!validator.isEmail(email)) {
        return res.status(401).json({ error: `${email} is not a valid email address.` })
    }

    try {

        //* Let's clean the inputs from malicious tags, also remove white space.
        const safeName = sanitizeHtml(name.trim())
        const safeEmail = sanitizeHtml(email.trim())
        const safeMessage = sanitizeHtml(message.trim())

        const client = new postmark.ServerClient(postmark_client)

        await client.sendEmail({
            "From": "mauluz@symetria.lat",
            "To": "mauluz@symetria.lat",
            "Subject": "Mau, you have a new message!",
            "HtmlBody": `<div>
                <strong>This one comes from</strong> ${safeName}.
                <br>
                <p>This is their email: ${safeEmail}</p>
                <br>
                <p>And this is their message: ${safeMessage}</p>
                <br>
                <p>If you have any questions, feel free to contact us at <a href="mailto:support@symetria.lat">support@symetria.lat</a></p>
                </div>`,
            "TextBody": "Mau, you have a new message!",
            "MessageStream": "outbound"
        })

        res.status(201).json({ message: 'Email sent succesfully.' })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    postNewContact
}