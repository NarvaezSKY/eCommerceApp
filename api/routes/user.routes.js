import Express from 'express'
import {deleteUser, editUser, getAllUsers, getUser, registerUser}  from '../controllers/user.controller.js'

const router=Express()

router.get('/users', getAllUsers)
router.get('/user/:id', getUser)
router.post('/register', registerUser)
router.delete('/deleteuser/:id', deleteUser)
router.put('/edituser/:id', editUser)

export default router