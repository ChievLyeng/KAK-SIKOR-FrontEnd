import { apiSlice } from "../slice/apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      // Mutation: Modifying data on the server (create, update, delete).
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAllOrders: builder.query({
      providesTags: ['Order'],
      query: () => {
        return {
          url: `${import.meta.env.VITE_BASE_URL}/api/v1/orders`,
          method: 'GET',
        };
      },
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetAllOrdersQuery,
} = ordersApiSlice;
