/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ModalImage from "react-modal-image";
import Images from "../../images/aircx7.jpg";
import { useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const colorArray = ["Green", "Black", "Red", "White"];

const ProductCardInCheckBox = ({ product }) => {
    const [countNumber, setCountNumber] = useState(product.count);
    const { images, title, shipping, color, brand, price, quantity } = product;
    const dispatch = useDispatch();

    useEffect(() => {
        handleQuantityChange();
    }, [countNumber]);

    const handleColorChange = (e) => {
        let carts = [];
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("carts")) {
                carts = JSON.parse(window.localStorage.getItem("carts"));
            }
            // carts.map((product, i) => {
            //     if (product._id === p._id) {
            //       cart[i].color = e.target.value;
            //     }
            //   });
            // updating cart color
            for (let i = 0; i < carts.length; i++) {
                if (carts[i]._id === product._id) {
                    carts[i].color = e.target.value;
                }
            }
            // set local storage updated object
            window.localStorage.setItem("carts", JSON.stringify(carts));

            // store data into redux
            dispatch({
                type: "ADD_CART",
                payload: carts,
            });
        }
    };
    const handleNumberChange = (e) => {
        setCountNumber(e.target.value);
    };

    const handleQuantityChange = () => {
        let count = parseInt(countNumber) < 1 ? 1 : parseInt(countNumber);

        // checking available product
        if (count > quantity) {
            toast.error(`Max available ${quantity} products`);
            return;
        }
        let carts = [];
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("carts")) {
                carts = JSON.parse(window.localStorage.getItem("carts"));
            }
            for (let i = 0; i < carts.length; i++) {
                if (carts[i]._id === product._id) {
                    carts[i].count = parseInt(countNumber);
                }
            }
            // changing count value store local storage
            window.localStorage.setItem("carts", JSON.stringify(carts));
            // store data into redux
            dispatch({
                type: "ADD_CART",
                payload: carts,
            });
        }
    };

    const removeCartHandler = () => {
        let carts = [];
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("carts")) {
                carts = JSON.parse(window.localStorage.getItem("carts"));
            }
        }
        // delete carts
        for (let i = 0; i < carts.length; i++) {
            if (carts[i]._id === product._id) {
                carts.splice(i, 1);
            }
        }
        // set undeleted carts into the window local storage
        window.localStorage.setItem("carts", JSON.stringify(carts));
        // store redux
        dispatch({
            type: "ADD_CART",
            payload: carts,
        });
    };

    return (
        <tr>
            <td>
                <div style={{ width: "100px", height: "auto" }}>
                    {product && images && images.length ? (
                        <ModalImage
                            small={images[0].url}
                            large={images[0].url}
                            alt={title}
                        />
                    ) : (
                        <ModalImage
                            small={Images}
                            large={Images}
                            alt={title && title}
                        />
                    )}
                </div>
            </td>
            <td className="text-center">{title} </td>
            <td className="text-center">${price} </td>
            <td className="text-center">{brand} </td>
            <td>
                <select
                    onChange={handleColorChange}
                    name="color"
                    className="form-select"
                >
                    {color ? (
                        <option value={color}>{color}</option>
                    ) : (
                        <option>Select Color</option>
                    )}
                    {colorArray &&
                        colorArray
                            .filter((c) => c !== color)
                            .map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                </select>
            </td>
            <td>
                <input
                    type="number"
                    min="1"
                    max={quantity}
                    className="form-control"
                    value={countNumber}
                    name="count"
                    onChange={handleNumberChange}
                />
            </td>
            <td className="text-center">
                {shipping === "Yes" ? (
                    <CheckCircleOutlined className="text-success" />
                ) : (
                    <CheckCircleOutlined className="text-danger" />
                )}
            </td>
            <td className="text-center">
                <CloseOutlined
                    className="text-danger"
                    onClick={removeCartHandler}
                />
            </td>
        </tr>
    );
};

export default ProductCardInCheckBox;
