const { Schema, model, models } = require("mongoose");

const OrderSchema = new Schema({
    line_items: Object,
    name: String,
    city: String,
    email: String,
    postalCode: String,
    streetAddress: String,
    phoneNumber: String,
    country: String,
    paid: Boolean,
}, {
    timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);