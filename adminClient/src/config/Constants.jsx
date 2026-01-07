




// Payment Columns



const orderBase = "api/v1/order"
const paymentBase = "api/v1/payment"
const userBase = "api/v1/auth"

export const endPoints = {
    order : {
        list : `${orderBase}/getAllOrders`,
        customerOrders: (id) => `${orderBase}/customer/${id}`,
        update: (id) => `${orderBase}/${id}`,
    },
    payment: {
        list: `${paymentBase}/getAllPayments`,
        update: (id) => `${paymentBase}/${id}`,
    },
    auth:{
      list :`${userBase}/getAllUsers`,
      get : (id) => `${userBase}/${id}`,
      block : (id) => `${userBase}/${id}/block`
    },
    cart: {
        getUserCart: (id) => `api/v1/cart/user/${id}`
    },
    product: {
        list: `api/v1/product/getProduct`,
        add: `api/v1/product/addProduct`,
        update: (id) => `api/v1/product/updateProduct/${id}`,
        delete: (id) => `api/v1/product/deleteProduct/${id}`,
        get: (id) => `api/v1/product/getProduct/id/${id}`
    },
    category: {
        list: `api/v1/category/get/all`
    },

}