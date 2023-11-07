const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;


const api = express();

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

const UserRegistration = mongoose.Schema(
    {
        username : String,
        password : String
    }
)

const Regmodel = mongoose.model('Regmodel', UserRegistration)


const User1 = new Regmodel() //*fill bracket with properties you'd want user1 to have
console.log(User1);


const applyPost = api.post('/register', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new Regmodel({
        username: username,
        password: password
    });

    newUser.save((invalid) => {
        if (invalid) {
            console.error(invalid);
            res.status(500).json({ message: 'Registration failed' });
        } else {
            res.json({ message: 'Registration successful!' });
        }
    });
});

api.listen(port, () => {
console.log(`Server is running on port ${port}`);
});

      






