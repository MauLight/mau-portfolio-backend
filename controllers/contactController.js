require('dotenv').config()
const postmark = require('postmark')

const postmark_client = process.env.POSTMARK

async function getHello(_req, res) {
    return res.status(200).json({ message: 'Hello World!' })
}

async function postNewContact(req, res, next) {

    const { name, email, message } = req.body

    if (!name || !email || !message) return res.status(400).json({ error: 'You must provide name, email and message parameters before submitting.' })

    const client = new postmark.ServerClient(postmark_client)

    await client.sendEmail({
        "From": "mauluz@symetria.lat",
        "To": "mauluz@symetria.lat",
        "Subject": "Mau, you have a new message!",
        "HtmlBody": `<div>
                <strong>This one comes from</strong> ${name}.
                <br>
                <p>This is their email: ${email}</p>
                <br>
                <p>And this is their message: ${message}</p>
                <br>
                <p>If you have any questions, feel free to contact us at <a href="mailto:support@symetria.lat">support@symetria.lat</a></p>
                </div>`,
        "TextBody": "Mau, you have a new message!",
        "MessageStream": "outbound"
    })

    res.status(201).json({ message: 'Email sent succesfully.' })
}


module.exports = {
    getHello,
    postNewContact
}