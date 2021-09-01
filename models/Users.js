import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    hash: String,
});
  
export default mongoose.models.Users || mongoose.model('Users', UserSchema)
