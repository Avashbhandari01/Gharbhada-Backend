const mongoose = require('mongoose');
const propertySchema = require('./property');

const orderSchema = mongoose.Schema({
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    }, 
   propertyID: 
    {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Property',
           required: true,
     }, 
       status : {
          type: String,
          required: true,
          enum : ['pending', 'completed', 'cancelled'],
          default: 'pending'
       }
   
}, timestamps = true); 


const Order = mongoose.model('Order', orderSchema);


module.exports = Order;