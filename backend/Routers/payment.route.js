const {Router}=require('express')
const { createOrder, verifyPayment}=require('../controllers/payment.controllers.js')

const router=Router()

router.route('/create-order').post(createOrder)
router.route('/verify-payment').post(verifyPayment)

module.exports=router