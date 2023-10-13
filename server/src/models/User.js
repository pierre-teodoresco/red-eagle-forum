// User.js
import mongoose from 'mongoose';

const User = mongoose.model('User', {
    name: String,
    point: Number,
});

async function addUser(username) {
    const newUser = new User({
        name: username,
        point: 0,
    });

    await newUser.save();
}

export { User, addUser };
