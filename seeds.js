const Users = require("models/Users")
const { users } = require("lib/data")
const dbConnect = require("lib/dbConnect")

const seed = async () => {
    try {
        await dbConnect()

        await Users.deleteMany();
        await Users.insertMany(users)

        process.exit();
    } catch (error) {}
}

module.exports = seed;