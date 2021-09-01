import Users from "models/Users"
import { users } from "lib/data"
import dbConnect from 'lib/dbConnect'

const seed = async () => {
    try {
        await dbConnect()

        await Users.deleteMany();
        await Users.insertMany(users)

        process.exit();
    } catch (error) {}
}

export default seed