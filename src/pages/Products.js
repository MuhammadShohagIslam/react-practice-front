import { useCallback, useEffect, useState } from "react";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    getProduct,
    productRating,
    relatedProducts,
} from "../functions/product";
import SingleProduct from "../components/products/SingleProduct";
import ProductCard from "./../components/card/ProductCard";

const Products = () => {
    const [product, setProduct] = useState({});
    const [relProducts, setRelProducts] = useState({});
    const [star, setStar] = useState(0);
    const [loading, setLoading] = useState(false);

    // redux
    const { user } = useSelector((state) => ({ ...state }));
    const { slug } = useParams();

    // slider

    const loadProduct = useCallback(() => {
        setLoading(true);
        getProduct(slug)
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [slug]);

    useEffect(() => {
        loadProduct();
    }, [slug, loadProduct]);

    useEffect(() => {
        if (product && product._id) {
            setLoading(true);
            relatedProducts(product._id).then((res) => {
                setRelProducts(res.data);
                setLoading(false);
            });
        }
    }, [product]);

    useEffect(() => {
        if (product.ratings && user) {
            const existingUserRatingObject = product.ratings.find(
                (rating) => rating.postedBy.toString() === user._id
            );
            existingUserRatingObject && setStar(existingUserRatingObject.star);
        }
    }, [user, product]);

    const handleClickRating = (newRating, name) => {
        setStar(newRating);
        productRating(user.token, name, newRating).then((res) => {
            loadProduct(); // if we want to show real time rating
        });
    };

    return (
        <div className="container">
            <div>
                <SingleProduct
                    product={product}
                    handleClickRating={handleClickRating}
                    star={star}
                />
            </div>

            <div className="ralated-product mt-5">
                <h4 className="text-center p-3 mt-5 mb-4 display-6 jumbotron">
                    Related Product
                </h4>
                <Row gutter={16}>
                    {relProducts &&
                        relProducts.length > 0 &&
                        relProducts.map((relProduct) => (
                            <Col  span={8} key={relProduct._id}>
                                <ProductCard product={relProduct} />
                            </Col>
                        ))}
                </Row>
            </div>
        </div>
    );
};

export default Products;
