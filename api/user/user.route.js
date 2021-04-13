const route = require('express').Router();
const userModel = require('./user.model')

//GET all users
route.get('/', async (req, res) => {
    try {
        const users = await userModel.getUsers()
        res.status(200).json(users)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//ADD a user
route.post('/', async (req, res) => {
    const newUser = req.body;
    try {
        const newUserId = await userModel.addUser(newUser)
        res.status(200).json(newUserId)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//UPDATE a user
route.patch('/:userId', async (req, res) => {
    const change = req.body;
    const { userId } = req.params;
    try {
        const count = await userModel.updateUser(change, userId)
        res.status(200).json({ message: `Updated ${count} user`})
    } catch (err){
        res.status(500).json(err.message)
    }
})

//DELETE a user
route.delete('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const count = await userModel.deleteUser(userId)
        res.status(200).json({ message: `Deleted ${count} user`})
    } catch (err){
        res.status(500).json(err.message)
    }
})

module.exports = route;