/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Row, Col } from "antd";
import {
    getUserCart,
    emptyCart,
    saveShippingAddress,
    getUserShippingAddress,
    getTotalPriceAfterDiscount,
    createOrderCashOnDelivery,
} from "../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ShippingAddressForm from "./../components/forms/ShippingAddressForm";

const initalAddressValue = {
    fullName: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
};

const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [addressValues, setAddressValues] = useState(initalAddressValue);
    const [isAddressSave, setIsAddressSave] = useState(false);
    const [validationError, setvValidationError] = useState();
    const [validationMessage, setValidationMessage] = useState();
    const [couponName, setCouponName] = useState("");
    const [inValidCouponName, setInValidCouponName] = useState("");
    const [totalPriceAfterDiscount, setTotalPriceAfterDiscount] = useState(0);
    const [loading, setLoading] = useState({
        shippingAddressLoading: false,
        emptingCartLoading: false,
        processingOrderLoading: false,
        couponLoading: false,
    });
    const { user, userCarts } = useSelector((state) => ({ ...state }));
    const { carts, isCashOnDelivery, isCouponed } = userCarts;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.token) {
            getUserCart(user.token).then((res) => {
                if (res.data[0]) {
                    setProducts(res.data[0].products);
                    setCartTotal(res.data[0].cartTotal);
                }
            });
        }
    }, [user]);

    useEffect(() => {
        if (user && user.token) {
            getUserShippingAddress(user.token).then((res) => {
                if (res.data.address) {
                    setAddressValues(res.data.address);
                    if (typeof window !== "undefined") {
                        window.localStorage.setItem(
                            "shippingAddress",
                            JSON.stringify(res.data.address)
                        );
                    }
                    dispatch({
                        type: "ADD_SHIPPING_ADDRESS",
                        payload: res.data.address,
                    });
                    if (res.data.address) {
                        setIsAddressSave(true);
                    }
                }
            });
        }
    }, [user]);

    const handleEmptyCart = () => {
        // remove cart window local storage
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("carts");
        }
        // remove cart from redux store
        dispatch({
            type: "ADD_CART",
            payload: [],
        });
        // remove cart from database
        if (user && user.token) {
            setLoading({
                ...loading,
                emptingCartLoading: true,
            });
            emptyCart(user.token)
                .then((res) => {
                    setProducts([]);
                    setCartTotal(0);
                    setCouponName("");
                    setTotalPriceAfterDiscount(0);
                    // store redux
                    dispatch({
                        type: "ADD_COUPON",
                        payload: false,
                    });
                    toast.success("Cart Is Empty! Continue Shopping");
                    setLoading({
                        ...loading,
                        emptingCartLoading: false,
                    });
                    setTimeout(() => {
                        navigate("/cart");
                    }, 5000);
                })
                .catch((error) => {
                    setLoading({
                        ...loading,
                        emptingCartLoading: false,
                    });
                    console.log(error);
                });
        }
    };
    const handleAddressValueChange = (e) => {
        setAddressValues({
            ...addressValues,
            [e.target.name]: e.target.value,
        });
    };
    // save address to the database
    const submitShippingAddressToDb = (e) => {
        e.preventDefault();
        const { error, isValid, validMessage } = validator();

        if (isValid) {
            if (user && user.token) {
                setLoading({
                    ...loading,
                    shippingAddressLoading: true,
                });
                saveShippingAddress(addressValues, user.token)
                    .then((res) => {
                        setIsAddressSave(true);
                        toast.success("Save Address!");

                        if (typeof window !== "undefined") {
                            window.localStorage.setItem(
                                "shippingAddress",
                                JSON.stringify(res.data.address)
                            );
                        }
                        dispatch({
                            type: "ADD_SHIPPING_ADDRESS",
                            payload: res.data.address,
                        });
                        setLoading({
                            ...loading,
                            shippingAddressLoading: false,
                        });
                    })
                    .catch((error) => {
                        setLoading({
                            ...loading,
                            shippingAddressLoading: false,
                        });
                        console.log(error);
                    });
            }
        } else {
            setValidationMessage(validMessage);
            setvValidationError(error);
        }
    };

    const validator = () => {
        const { fullName, address, country, city, postalCode } = addressValues;
        let error = {};
        let validMessage = {};

        if (!fullName || fullName.trim() === "") {
            error.fullName = "Enter Your Valid Name !";
        } else {
            validMessage.fullName = "Look Good!";
        }
        if (!address || address.trim() === "") {
            error.address = "Enter Your Valid Address !";
        } else {
            validMessage.address = "Look Good!";
        }
        if (!country || country.trim() === "") {
            error.country = "Enter Your Valid Country !";
        } else {
            validMessage.country = "Look Good!";
        }
        if (!city || city.trim() === "") {
            error.city = "Enter Your Valid City !";
        } else {
            validMessage.city = "Look Good!";
        }
        if (!postalCode || postalCode.trim() === "") {
            error.postalCode = "Enter Your Valid Postal-Code !";
        } else {
            validMessage.postalCode = "Look Good!";
        }
        const isValid = Object.keys(error).length === 0;

        return {
            isValid,
            error,
            validMessage,
        };
    };

    const couponForm = () => (
        <form onSubmit={handleCouponSubmit}>
            <div className="form-group">
                <label htmlFor="coupon">Coupon:</label>
                <input
                    type="text"
                    name="couponName"
                    value={couponName}
                    onChange={(e) => setCouponName(e.target.value)}
                    className="form-control "
                    id="coupon"
                    placeholder="Enter Coupon"
                    autoFocus
                />
            </div>
            <button
                className="btn btn-outline-info mt-1"
                disabled={carts.length === 0 || loading.couponLoading}
            >
                {loading.couponLoading ? "Saving..." : "Save"}
            </button>
        </form>
    );

    const handleCouponSubmit = (e) => {
        e.preventDefault();
        setLoading({
            ...loading,
            couponLoading: true,
        });
        getTotalPriceAfterDiscount(couponName, user.token).then((res) => {
            console.log(res.data.totalPriceAfterDiscount);
            if (res.data.totalPriceAfterDiscount) {
                setTotalPriceAfterDiscount(res.data.totalPriceAfterDiscount);
                setLoading({
                    ...loading,
                    couponLoading: false,
                });
                // store redux
                dispatch({
                    type: "ADD_COUPON",
                    payload: true,
                });
                setInValidCouponName("");
            }
            if (res.data.error) {
                setInValidCouponName(res.data.error);
                setLoading({
                    ...loading,
                    couponLoading: false,
                });
            }
        });
    };

    const handleCashOrderDelievry = () => {
        setLoading({
            ...loading,
            processingOrderLoading: true,
        });
        if (user && user.token) {
            createOrderCashOnDelivery(isCashOnDelivery, isCouponed, user.token)
                .then((res) => {
                    console.log(res.data);
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
                    emptyCart(user.token);
                    // reset coupon from redux
                    dispatch({
                        type: "ADD_COUPON",
                        payload: false,
                    });
                    // reset cash on delivery from redux
                    dispatch({
                        type: "CASH_ON_DELIVERY",
                        payload: false,
                    });
                    setLoading({
                        ...loading,
                        processingOrderLoading: false,
                    });
                    setTimeout(() => {
                        navigate("/user/history");
                    }, 300);
                })
                .catch((error) => {
                    setLoading({
                        ...loading,
                        processingOrderLoading: false,
                    });
                });
        }
    };

    return (
        <div className="container-fluid px-4 pt-3">
            <Row gutter={16}>
                <Col span={12}>
                    <h4>Delivery Address</h4>
                    <hr />
                    {/* <ReactQuill
                        value={address}
                        onChange={(value) => setAddress(value)}
                    /> */}
                    <ShippingAddressForm
                        addressValues={addressValues}
                        validationError={validationError}
                        validationMessage={validationMessage}
                        loading={loading.shippingAddressLoading}
                        handleAddressValueChange={handleAddressValueChange}
                        submitShippingAddressToDb={submitShippingAddressToDb}
                    />
                    <hr />
                    <h4>Got Coupon?</h4>
                    {inValidCouponName && (
                        <div className="bg-success text-center">
                            <h6 className="text-white p-2">
                                {inValidCouponName}
                            </h6>
                        </div>
                    )}
                    {couponForm()}
                </Col>
                <Col span={12}>
                    <h4>Order Summary</h4>
                    <hr />
                    <h6>Products</h6>
                    <hr />
                    {products &&
                        products.length &&
                        products.map((product) => (
                            <p key={product._id}>
                                {product.product.title} x {product.count} ={" "}
                                {`$${product.price * product.count}`}
                            </p>
                        ))}
                    <hr />
                    <p>Cart Total: ${cartTotal}</p>
                    {totalPriceAfterDiscount > 0 && (
                        <div className="bg-success mb-2">
                            <h6 className="text-white p-2">
                                Total Price After Discount : $
                                {totalPriceAfterDiscount}
                            </h6>
                        </div>
                    )}
                    <Row>
                        <Col span={12}>
                            {isCashOnDelivery ? (
                                <button
                                    className="btn btn-outline-info"
                                    disabled={
                                        !isAddressSave ||
                                        products.length < 1 ||
                                        loading.processingOrderLoading
                                    }
                                    onClick={handleCashOrderDelievry}
                                >
                                    {loading.processingOrderLoading
                                        ? "Processing..."
                                        : "Place Order"}
                                </button>
                            ) : (
                                <button
                                    className="btn btn-outline-info"
                                    disabled={
                                        !isAddressSave ||
                                        products.length < 1 ||
                                        loading.processingOrderLoading
                                    }
                                    onClick={() => {
                                        setLoading({
                                            ...loading,
                                            processingOrderLoading: true,
                                        });
                                        navigate("/user/payment");
                                    }}
                                >
                                    {loading.processingOrderLoading
                                        ? "Processing..."
                                        : "Place Order"}
                                </button>
                            )}
                        </Col>
                        <Col span={12}>
                            <button
                                className="btn btn-outline-info"
                                disabled={
                                    products.length < 1 ||
                                    loading.emptingCartLoading
                                }
                                onClick={handleEmptyCart}
                            >
                                {loading && loading.emptingCartLoading
                                    ? "Removing..."
                                    : "Empty Cart"}
                            </button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Checkout;
