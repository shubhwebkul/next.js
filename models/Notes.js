import mongoose from 'mongoose'

const NotesSchema = new mongoose.Schema({
    title : String,
    description : String,
}, {timestamps: true})

export default mongoose.models.Notes || mongoose.model('Notes', NotesSchema)