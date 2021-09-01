import dbConnect from '../../../lib/dbConnect'
import Users from '../../../models/Users'
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'POST':
            try {
                const { password, ...params } = req.body;

                // const user = await Users.find(user => user && user.user_name === params.user_name)
                const user = {
                    "user_name": "admin@example.com",
                    "hash": bcrypt.hashSync("admin123", 8),
                }

                // validate password
                if (!(user && bcrypt.compareSync(password, user.hash))) {
                    throw 'Username or password is incorrect';
                }

                const token = jwt.sign({ user_name: user.user_name }, 'secret_token');

                res.status(200).json({ success: true, data: { token: token } })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}
