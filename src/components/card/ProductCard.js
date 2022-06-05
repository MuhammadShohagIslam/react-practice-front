/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import _ from "lodash";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { avgRating } from "../../functions/avgRating";
import { Card, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
const { Meta } = Card;

const ProductCard = ({ product }) => {
    const [tooltipTitle, setTooltipTitle] = useState("Add to Cart");
    const { slug, title, images, description } = product;
    const dispatch = useDispatch();

    const handleAddCart = (e) => {
        // create cart array
        let carts = [];
        // // checking available window or not
        if (typeof window !== "undefined") {
            // checking already carts to the window localStrogage
            if (window.localStorage.getItem("carts")) {
                carts = JSON.parse(window.localStorage.getItem("carts"));
            }
        }
        // added cart
        carts.push({
            ...product,
            count: 1,
        });
        // remove duplicates
        const uniqueCarts = _.uniqWith(carts, _.isEqual);
        // set cart object in windows localStorage
        window.localStorage.setItem("carts", JSON.stringify(uniqueCarts));
        // tooltip
        setTooltipTitle("Added!");

        // added cart in redux store
        dispatch({
            type: "ADD_CART",
            payload: uniqueCarts,
        });
        // show drawer carts in the side bar
        dispatch({
            type: "VISIBLE_DRAWER",
            payload: true,
        });

    };
    return (
        <>
            {product && product.ratings && product.ratings.length > 0 ? (
                avgRating(product)
            ) : (
                <div className="text-center pb-3 pt-0">Not Rating Yet</div>
            )}
            <Card
                cover={
                    <img
                        alt={title}
                        src={images && images.length && images[0].url}
                        style={{ objectFit: "cover", height: "250px" }}
                    />
                }
                actions={[
                    <Link to={`/products/${slug}`} className="text-warning">
                        <EyeOutlined /> <br /> View Product
                    </Link>,
                    <Tooltip title={tooltipTitle}>
                        <a className="text-danger" onClick={handleAddCart}>
                            <ShoppingCartOutlined /> <br /> Add To Cart
                        </a>
                    </Tooltip>,
                ]}
            >
                <Meta
                    title={title}
                    description={
                        description && description.substr(0, 100) + " ..."
                    }
                />
            </Card>
        </>
    );
};

export default ProductCard;
