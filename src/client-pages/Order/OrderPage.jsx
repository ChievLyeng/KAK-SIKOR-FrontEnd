import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../../store/slice/ordersApiSlice"; //ordersApiSlice
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    isError: errorPayPal,
  } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: { value: order.totalPrice },
        },
      ],
    });
  };

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant="danger" />
  ) : (
    <>
      <h3>Order : {order._id}</h3>
      <div>
        <div>
          <h3> Address :</h3>
          {order.shippingAddress.address},{order.shippingAddress.city},
        </div>
        <div>
          {order.isDelivered ? (
            <Message variant="success">
              Delivered on {order.deliveredAt}
            </Message>
          ) : (
            <Message variant="danger">Not Delivered</Message>
          )}
        </div>
        <div>
          <h3>Payment Method</h3>
          <div>{order.paymentMethod}</div>
          <div>
            {order.isPaid ? (
              <Message variant="success">Paid on {order.paidAt}</Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
          </div>
        </div>
      </div>
      <div>
        <div>
          <h3>Order Summary</h3>
          <div>ItemsPrice : $ {order.itemsPrice}</div>
          <div>ShippingPrice : ${order.shippingPrice}</div>
          <div>TaxPrice : ${order.taxPrice}</div>
          <div>TotalPrice : ${order.totalPrice}</div>
        </div>
        <div>
          {!order.isPaid && (
            <>
              {loadingPay && <Loader />}
              {isPending ? (
                <Loader />
              ) : (
                <div>
                  <div>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
