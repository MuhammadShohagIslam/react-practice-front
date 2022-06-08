import { useState } from "react";
import { Col, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { saveOrder } from "./../functions/user";
import ProductCardInCheck from "./../components/card/ProductCardInCheck";

const Cart = () => {
    const [loading, setLoading] = useState({
        onlinePaymentCheckOut: false,
        cashOnDelivery: false,
    });
    const { userCarts, user } = useSelector((state) => ({ ...state }));
    const { carts } = userCarts;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const showCartItems = () => (
        <table className="table align-middle">
            <thead className="table-secondary text-center">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col" style={{ width: "140px" }}>
                        Count
                    </th>
                    <th scope="col">Shipping</th>
                    <th scope="col">Remove</th>
                </tr>
            </thead>
            <tbody>
                {carts &&
                    carts.length &&
                    carts.map((cart) => (
                        <ProductCardInCheck key={cart._id} product={cart} />
                    ))}
            </tbody>
        </table>
    );

    const getTotalPrice = () => {
        const totalPrice =
            carts &&
            carts.reduce((acc, cur, i) => {
                return acc + cur.price * cur.count;
            }, 0);
        return totalPrice;
    };

    const savePaymentOrderToDb = () => {
        setLoading({
            ...loading,
            onlinePaymentCheckOut: true,
        });
        saveOrder(carts, user.token)
            .then((res) => {
                if (res.data.ok) {
                    setLoading({
                        ...loading,
                        onlinePaymentCheckOut: false,
                    });
                    navigate("/user/checkout");
                }
            })
            .catch((error) => {
                setLoading({
                    ...loading,
                    onlinePaymentCheckOut: false,
                });
                console.log(error);
            });
    };
    const saveCashOrderToDb = () => {
        setLoading({
            ...loading,
            cashOnDelivery: true,
        });
        saveOrder(carts, user.token)
            .then((res) => {
                if (res.data.ok) {
                    dispatch({
                        type: "CASH_ON_DELIVERY",
                        payload: true,
                    });
                    setLoading({
                        ...loading,
                        cashOnDelivery: false,
                    });
                    navigate("/user/checkout");
                }
            })
            .catch((error) => {
                setLoading({
                    ...loading,
                    cashOnDelivery: false,
                });
                console.log(error);
            });
    };

    return (
        <div className="container-fluid pt-4">
            <Row gutter={12}>
                <Col span={18}>
                    <h4>
                        Cart {carts && carts.length}{" "}
                        {carts && carts.length > 1 ? "Products" : "Product"}
                    </h4>
                    {!carts.length ? (
                        <h5>
                            No Cart Yet{" "}
                            <Link to="/shop">Continue Shopping</Link>
                        </h5>
                    ) : (
                        showCartItems()
                    )}
                </Col>
                <Col span={6}>
                    <h4>Order Summary</h4>
                    <hr />
                    <h4>Product</h4>
                    <hr />
                    {carts &&
                        carts.map((product) => (
                            <p key={product._id}>
                                {product.title} x {product.count} ={" "}
                                {`$${product.price * product.count}`}
                            </p>
                        ))}
                    <hr />
                    <p>Total Price = {`$${getTotalPrice()}`}</p>
                    <hr />
                    {user ? (
                        <>
                            <button
                                className="btn btn-sm btn-outline-info  mt-2"
                                disabled={!carts.length || loading.onlinePaymentCheckOut}
                                onClick={savePaymentOrderToDb}
                            >
                                {loading.onlinePaymentCheckOut
                                    ? "Processing..."
                                    : "Procced To Checkout"}
                            </button>
                            <br />
                            <button
                                className="btn btn-sm btn-outline-danger  mt-2"
                                disabled={!carts.length || loading.cashOnDelivery}
                                onClick={saveCashOrderToDb}
                            >
                                {loading.cashOnDelivery
                                    ? "Processing..."
                                    : "Checkout To Cash On Delivery"}
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            state={{
                                from: "/cart",
                            }}
                        >
                            {" "}
                            <button
                                className="btn btn-sm btn-outline-info mt-2"
                                disabled={!carts.length}
                            >
                                Login To Checkout
                            </button>
                        </Link>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default Cart;
