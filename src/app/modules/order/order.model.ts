import mongoose, {  Schema } from 'mongoose';
import { IOrder } from './order.interface';


const OrderSchema: Schema = new Schema({
  productName: String,
  price: Number,
  quantity: Number,
});


// Pre-save hook for User to add an order
OrderSchema.pre('save', async function (next) {
  // Ensure that 'orders' is an array
  if (!this.orders || !Array.isArray(this.orders)) {
    this.orders = [];
  }

  // Append a new order to 'orders'
  const order = new Order({ productId: 'yourProductId', quantity: 1 });
  this.orders.push(order);

  await order.save(); // Save the new order
  next();
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
