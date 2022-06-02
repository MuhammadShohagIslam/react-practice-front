import { Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckBox from "./../components/card/ProductCardInCheckBox";

const Cart = () => {
    const { carts, user } = useSelector((state) => ({ ...state }));

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
                        <ProductCardInCheckBox key={cart._id} product={cart} />
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
                        <button
                            className="btn btn-sm btn-primary mt-2"
                            disabled={!carts.length}
                        >
                            Procced To Checkout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            state={{
                                from: "/cart",
                            }}
                        >
                            {" "}
                            <button
                                className="btn btn-sm btn-primary mt-2"
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
