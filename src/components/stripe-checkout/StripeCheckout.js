import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "./../../functions/stripe";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./stripe.css";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import Laptop from "../../images/aircx7.jpg";
import { createOrder } from "./../../functions/user";

const StripeCheckout = () => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");
    const [cartTotal, setCartTotal] = useState(0);
    const [totalPriceAfterDiscount, setTotalPriceAfterDiscount] = useState(0);
    const [payable, setPayable] = useState(0);
    const stripe = useStripe();
    const elements = useElements();

    // redux
    const { user, userCarts } = useSelector((state) => ({ ...state }));
    const { isCouponed } = userCarts;
    const dispatch = useDispatch();

    useEffect(() => {
        if (user && user.token) {
            createPaymentIntent(user.token, isCouponed).then((res) => {
                setClientSecret(res.data.clientSecret);
                // additional response received on successful payment
                setCartTotal(res.data.cartTotal);
                setTotalPriceAfterDiscount(res.data.totalPriceAfterDiscount);
                setPayable(res.data.payable);
            });
        }
    }, [user, isCouponed]);

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty); // button is diabled when pay is error
        setError(event.error ? event.error.message : "");
    };

    const cartStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d",
                },
            },
            invalid: {
                fontFamily: "Arial, sans-serif",
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            // create order
            createOrder(payload, user.token).then(res => {
                console.log(res.data)
            }).catch(error=>{
                console.log(error)
            })

            // reset carts from window local storage
            if (typeof window !== "undefined") {
                if (window.localStorage.getItem("carts")) {
                    window.localStorage.removeItem("carts");
                }
            }

            // reset carts from redux
            dispatch({
                type: "ADD_CART",
                payload: [],
            });

            // coupon false
            dispatch({
                type: "ADD_COUPON",
                payload: false,
            });
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    return (
        <>
            {!succeeded && (
                <div>
                    {isCouponed && totalPriceAfterDiscount !== undefined ? (
                        <p className="alert alert-success">{`Total after discount: $${totalPriceAfterDiscount}`}</p>
                    ) : (
                        <p className="alert alert-danger">No coupon applied</p>
                    )}
                </div>
            )}
            <div className="text-center pb-5">
                <Card
                    cover={
                        <img
                            src={Laptop}
                            style={{
                                height: "200px",
                                objectFit: "cover",
                                marginBottom: "-50px",
                            }}
                            alt="Good Laptop"
                        />
                    }
                    actions={[
                        <>
                            <DollarOutlined className="text-info" /> <br />{" "}
                            Total: ${cartTotal}
                        </>,
                        <>
                            <CheckOutlined className="text-info" /> <br /> Total
                            payable : ${(payable / 100).toFixed(2)}
                        </>,
                    ]}
                />
            </div>

            <form
                id="payment-form"
                className="stripe-form"
                onSubmit={handleSubmit}
            >
                <CardElement
                    id="card-element"
                    options={cartStyle}
                    onChange={handleChange}
                />
                <button
                    className="stripe-button"
                    disabled={processing || disabled || succeeded}
                >
                    <span id="button-text">
                        {processing ? (
                            <div className="spinner" id="spinner"></div>
                        ) : (
                            "Pay"
                        )}
                    </span>
                </button>
                <br />
                {error && (
                    <div className="card-error" role="alert">
                        {error}
                    </div>
                )}
                <br />
                <p
                    className={
                        succeeded ? "result-message" : "result-message hidden"
                    }
                >
                    Payment Successful.{" "}
                    <Link to="/user/history">
                        See it in your purchase history.
                    </Link>
                </p>
            </form>
        </>
    );
};

export default StripeCheckout;
