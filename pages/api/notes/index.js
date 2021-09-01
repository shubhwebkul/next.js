import dbConnect from '../../../lib/dbConnect'
import Notes from '../../../models/Notes'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const notes = await Notes.find({})
                res.status(200).json({ success: true, data: notes })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const note = await Notes.create(
                    req.body
                )

                res.status(201).json({ success: true, data: note })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'DELETE':
            try {
                console.log(req.body);
                Notes.findOneAndDelete(req.body)

                res.status(200).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}
