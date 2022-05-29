import { Row, Col, Card, Tabs } from "antd";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import CardCarousel from "../card/CardCarousel";
import ProductItemList from "../card/ProductItemList";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { avgRating } from "../../functions/avgRating";
import Laptop from "../../images/aircx7.jpg";
import RatingModal from "../modal/RatingModal";
const { TabPane } = Tabs;

const SingleProduct = ({ product, handleClickRating, star }) => {
    const { title, images, description, slug, _id } = product;

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
                        <>
                            <ShoppingCartOutlined className="text-success" />{" "}
                            <br />
                            Add to Cart
                        </>,
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
