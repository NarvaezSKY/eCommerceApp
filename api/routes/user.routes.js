import Express from 'express'
import {getAllUsers}  from '../controllers/user.controller.js'

const router=Express()

router.get('/users', getAllUsers)

export default router