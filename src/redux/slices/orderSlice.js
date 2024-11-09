import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: "",
    itemsPrice: 0,
    ShippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: "",
    isPaid: false,
    paidAt: "",
    isDelivered: false,
    deliveredAt: "",
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload
            if (!state.orderItems) {
                state.orderItems = []; // Khởi tạo lại nếu nó là undefined
            }
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
            if (itemOrder) {
                itemOrder.amount += orderItem?.amount
            } else {
                state.orderItems.push(orderItem)
            }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product !== idProduct)
            state.orderItems = itemOrder
        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload
            const itemOrders = state?.orderItems?.find((item) => !listChecked.includes(item.product))
            state.orderItems = itemOrders
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            itemOrder.amount++
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            itemOrder.amount--
        },
        resetOrder: (state) => {
            return initialState; // Trả về initialState
        }
    },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct, resetOrder, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct } = orderSlice.actions;

export default orderSlice.reducer