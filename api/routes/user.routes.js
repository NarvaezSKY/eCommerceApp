import Express from 'express'
import {deleteUser, editUser, getAllUsers, getUser, loginUser, logoutUser, registerUser}  from '../controllers/user.controller.js'
import { authRequired } from '../middlewares/verifyToken.js'
const router=Express()

//public route:
router.get('/users', getAllUsers)

//protected routes:
router.get('/user/:id', authRequired, getUser)
router.delete('/deleteuser/:id', authRequired, deleteUser)
router.put('/edituser/:id', authRequired, editUser)

//auth routes:
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

export default router