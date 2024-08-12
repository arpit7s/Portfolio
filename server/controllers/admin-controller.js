const User = require("../models/user-model")
const Contact = require("../models/contact-model");


/*----------------
    getAllUsers
----------------*/
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users Found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

/*----------------
    Single user  logic
----------------*/
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}
/*----------------
    user delete logic
----------------*/
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id })
        return res.status(200).json({ message: "User Deleted Successfully" })
    } catch (error) {
        console.log(error);
    }
}
/*----------------
    Contact delete logic
----------------*/
const deleteContactById = async (req, res) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id })
        return res.status(200).json({ message: "Contact Deleted Successfully" })
    } catch (error) {
       next(error);
    }
}
/*----------------
    user update logic
----------------*/

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;
        const updateUser = await User.updateOne({ _id: id }, { $set: updatedUserData });
        return res.status(200).json(updateUser);

    } catch (error) {
        next(error);
    }
}




/*----------------
    getAllContacts
----------------*/
const getAllContact = async (req, res) => {
    try {
        const contacts = await Contact.find();
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No Contacts Found" });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }

}
module.exports = {
    getAllUsers,
    getAllContact,
    deleteUserById,
    getUserById,
    updateUserById,
    deleteContactById
}