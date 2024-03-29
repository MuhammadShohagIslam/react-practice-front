import React from "react";

const OrderPaymentInfo = ({ order, showStatus = true }) => {
    const { orderStatus } = order;
    const { id, amount, currency, created, payment_method_types, status } =
        order.paymentIntents;

    let formateTime;
    if (Math.ceil(Math.log(created + 1) / Math.LN10) >= 11) {
        formateTime = Math.floor(created / 1000);
    }
    
    return (
        <div className="px-5">
            <p className="text-center">
                <span>ID: {id}</span>
                {" / "}
                <span>
                    Amount:{" "}
                    {(amount / 100).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}
                </span>
                {" / "}
                <span>Currency: {currency.toUpperCase()}</span>
                {" / "}
                <span>Method: {payment_method_types[0]}</span>
                {" / "}
                <span>Payment: {status.toUpperCase()}</span>
                {" / "}
                <span>
                    Ordered On:{" "}
                    {formateTime ? (
                        <>{new Date(formateTime * 1000).toLocaleString()}</>
                    ) : (
                        <>{new Date(created * 1000).toLocaleString()}</>
                    )}
                </span>

                {showStatus && (
                    <>
                        {" / "}
                        <span className="badge bg-success text-white">
                            STATUS: {orderStatus}
                        </span>
                    </>
                )}
            </p>
        </div>
    );
};

export default OrderPaymentInfo;
