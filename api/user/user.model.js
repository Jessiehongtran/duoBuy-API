const db = require('../../database/dbConfig.js')

const getUsers = () => {
    return db('user')
}

const addUser = (newUser) => {
    return db('user')
            .returning('id')
            .insert(newUser)
            .then(ids => ({ id: ids[0] }))
}

const updateUser = (change, userId) => {
    return db('user')
            .where({id: userId})
            .update(change)
}

const deleteUser = (userId) => {
    return db('user')
            .where({id: userId})
            .del()
}

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
}