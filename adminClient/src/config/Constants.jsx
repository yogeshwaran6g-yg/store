




// Payment Columns



const orderBase = "api/v1/order"
const paymentBase = "api/v1/payment"

export const endPoints = {
    order : {
        list : `${orderBase}/getAllOrders`,
    },
    payment: {
        list: `${paymentBase}/getAllPayments`
    }
}