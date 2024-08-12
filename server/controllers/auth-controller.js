const User = require("../models/user-model");
const bcrypt = require("bcryptjs")

//*--------------------------------
//*Home logic page📔
//*--------------------------------

const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to my home page inside controller");
    } catch (error) {
        res.status(401).send({ msg: 'Error in home page' })
    }
}

//*--------------------------------
//*Register logic page📔
//*--------------------------------

const register = async (req, res) => {
    try {

        const { username, email, password, phone } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exist" });
        }

        const userCreated = await User.create({
            username,
            email,
            phone,
            password
        });

        res.status(201).json(
            {
                msg: "Registration Completed successfully",
                token: await userCreated.generateToken(),
                userId: userCreated._id.toString(),
            }
        );

    } catch (error) {
        res.status(500).json("internal server error")
    }
}

//*--------------------------------
//*Login logic page📔
//*--------------------------------


const login = async (req, res) => {
    try {
        const { email, password } = req.body;


        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json("Invalid Credentials");
        }
        const user = await userExist.comparePassword(password);

        if (user) {
            res.status(201).json(
                {
                    msg: "Login successfully",
                    token: await userExist.generateToken(),
                    userId: userExist._id.toString(),
                }
            );
        } else {
            return res.status(401).json("Invalid email or password");
        }
    } catch (error) {
        res.status(500).json("internal server error")
    }


}

// *-------------------
// User Logic
// *-------------------
const user = async (req, res) => {
    try {
        // const userData = await User.find({});
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(` error from user route ${error}`);
    }
};

module.exports = { home, register, login, user }