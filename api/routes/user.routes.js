import Express from 'express'
import {getAllUsers, register, login}  from '../controllers/user.controller.js'

const router=Express()

router.get('/users', getAllUsers)
router.post('/register', register)
router.post('/login', login)


export default router