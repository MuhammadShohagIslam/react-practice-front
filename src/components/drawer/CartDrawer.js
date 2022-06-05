import React from "react";
import { Drawer, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Images from "../../images/aircx7.jpg";
import { Link } from "react-router-dom";

const CartDrawer = () => {
    const { userCarts, drawer } = useSelector((state) => ({ ...state }));
    const { carts } = userCarts;
    const dispatch = useDispatch();

    const imageStyle = {
        width: "100%",
        height: "50px",
        objectFit: "cover",
    };

    return (
        <>
            <Drawer
                title={`Cart ${carts.length} ${
                    carts.length > 1 ? "Products" : "Product"
                }`}
                placement="right"
                onClose={() => {
                    dispatch({
                        type: "VISIBLE_DRAWER",
                        payload: false,
                    });
                }}
                visible={drawer}
                closable={false}
                className="text-center"
            >
                <Row>
                    {carts.map((cart) => (
                        <Col span={24} className="pb-1" key={cart._id}>
                            {cart.images ? (
                                <>
                                    <img
                                        src={cart.images[0].url}
                                        alt={cart.title}
                                        style={imageStyle}
                                    />
                                    <p className="text-center bg-secondary text-light">
                                        {cart.title} ({cart.color}) x{" "}
                                        {cart.count}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <img src={Images} alt={cart.title} />
                                    <p className="text-center bg-secondary text-light">
                                        {cart.title} ({cart.color}) x{" "}
                                        {cart.count}
                                    </p>
                                </>
                            )}
                        </Col>
                    ))}
                    <div style={{ width: "100%" }}>
                        <Link to="/cart">
                            <button
                                className="text-center btn  btn-outline-info btn-block"
                                onClick={() => {
                                    dispatch({
                                        type: "VISIBLE_DRAWER",
                                        payload: false,
                                    });
                                }}
                            >
                                Go To Cart
                            </button>
                        </Link>
                    </div>
                </Row>
            </Drawer>
        </>
    );
};

export default CartDrawer;
