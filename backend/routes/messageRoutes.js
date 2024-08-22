const express=require('express');
const router=express.Router();
//const authController=require('../controllers/auth')
const messageController=require('../controllers/messages');

router.route('/').post(messageController.sendMessage)
router.route('/:chatId').get(messageController.getAllMessages);

module.exports=router;