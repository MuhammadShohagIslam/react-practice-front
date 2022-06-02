/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import _ from "lodash";
import { Row, Col, Card, Tabs, Tooltip } from "antd";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import CardCarousel from "../card/CardCarousel";
import ProductItemList from "../card/ProductItemList";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { avgRating } from "../../functions/avgRating";
import Laptop from "../../images/aircx7.jpg";
import RatingModal from "../modal/RatingModal";
import { useDispatch } from "react-redux";
const { TabPane } = Tabs;

const SingleProduct = ({ product, handleClickRating, star }) => {
    const [tooltipTitle, setTooltipTitle] = useState("Add to Cart");
    const { title, images, description, slug, _id } = product;
    const dispatch = useDispatch();

    const handleAddCart = () => {
        let carts = [];

        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("carts")) {
                carts = JSON.parse(window.localStorage.getItem("carts"));
            }
        }
        // push carts into carts array
        carts.push({
            ...product,
            count: 1,
        });

        // remove duplicates value
        const uniqueCarts = _.uniqWith(carts, _.isEqual);

        // set data local storage
        window.localStorage.setItem("carts", JSON.stringify(uniqueCarts));
        setTooltipTitle("Added!");

        // data store to the redux
        dispatch({
            type: "ADD_CART",
            payload: uniqueCarts,
        });
    };

    return (
        <Row gutter={24}>
            <Col span={11}>
                {product && title && product.images && product.images.length ? (
                    <CardCarousel images={images} title={title} />
                ) : (
                    <Card cover={<img src={Laptop} alt="laptop" />} />
                )}

                <Tabs defaultActiveKey="1">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Call use on xxxx xxx xxx to learn more about this
                        product.
                    </TabPane>
                </Tabs>
            </Col>
            <Col span={12} offset={1}>
                <h2 className="bg-info p-3 text-center">{title}</h2>
                {product && product.ratings && product.ratings.length > 0 ? (
                    avgRating(product)
                ) : (
                    <div className="text-center pb-3 pt-0">Not Rating Yet</div>
                )}
                <Card
                    actions={[
                        <Tooltip title={tooltipTitle}>
                            <a onClick={handleAddCart}>
                                <ShoppingCartOutlined className="text-success" />{" "}
                                <br />
                                Add to Cart
                            </a>{" "}
                        </Tooltip>,
                        <Link to="/">
                            <HeartOutlined className="text-info" /> <br /> Add
                            to Wishlist
                        </Link>,
                        <RatingModal slug={slug}>
                            <StarRatings
                                rating={star}
                                starRatedColor="red"
                                changeRating={handleClickRating}
                                numberOfStars={5}
                                name={_id}
                            />
                        </RatingModal>,
                    ]}
                >
                    <ProductItemList product={product} />
                </Card>
            </Col>
        </Row>
    );
};

export default SingleProduct;
