/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import _ from "lodash";
import { Row, Col, Card, Tabs, Tooltip } from "antd";
import StarRatings from "react-star-ratings";
import CardCarousel from "../card/CardCarousel";
import ProductItemList from "../card/ProductItemList";
import {
    ShoppingCartOutlined,
    HeartOutlined,
    HeartFilled,
} from "@ant-design/icons";
import { avgRating } from "../../functions/avgRating";
import Laptop from "../../images/aircx7.jpg";
import RatingModal from "../modal/RatingModal";
import { useDispatch } from "react-redux";
import { addToWhisList, removeWhisList, getWhisList } from "../../functions/user";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const { TabPane } = Tabs;

const SingleProduct = ({ product, handleClickRating, star }) => {
    const [heartFillIcon, setHeartFillIcon] = useState(false);
    const [tooltipTitle, setTooltipTitle] = useState("Add to Cart");
    const { title, images, description, slug, _id, quantity } = product;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if(user && user.token){
            getWhisList(user.token, _id).then(res => {
                if(res.data.wishList.length > 0){
                    setHeartFillIcon(true)
                }
            })
        }
    },[user, _id])

    // const loadWishList = (user) => {
       
    // }

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

        // show drawer carts in the side bar
        dispatch({
            type: "VISIBLE_DRAWER",
            payload: true,
        });
    };

    const handleAddToWhisList = () => {
        if (user && user.token) {
            if (heartFillIcon) {
                removeWhisList(user.token, _id).then((res) => {
                    setHeartFillIcon(false);
                    toast.error("Product Removed To The WhisList");
                });
            } else {
                addToWhisList(user.token, _id, true).then((res) => {
                    setHeartFillIcon(true);
                    toast.success("Product Added To The WhisList");
                });
            }
        } else {
            navigate("/login", { state: { from: `/products/${slug}` } });
        }
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
                            <button
                                className="addToCart"
                                onClick={handleAddCart}
                                disabled={quantity < 1}
                            >
                                <ShoppingCartOutlined className="text-success" />{" "}
                                <br />
                                {quantity < 1 ? "Out Of Stock" : "Add To Cart"}
                            </button>{" "}
                        </Tooltip>,
                        <button
                            className="addToCart"
                            onClick={handleAddToWhisList}
                        >
                            {heartFillIcon ? (
                                <>
                                    <HeartFilled className="text-info" /> <br /> Removed To Wishlist
                                </>
                            ) : (
                                <>
                                <HeartOutlined className="text-info" /> <br /> Add To Wishlist
                                </>
                            )}
                           
                        </button>,
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
