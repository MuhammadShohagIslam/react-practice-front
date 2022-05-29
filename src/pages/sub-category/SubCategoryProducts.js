import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubCategory } from "./../../functions/sub-category";
import { Row, Col } from "antd";
import { Skeleton } from "antd";
import LoadingCards from "./../../components/card/LoadingCards";
import ProductCard from "./../../components/card/ProductCard";

const SubCategoryProducts = () => {
    const [subCategory, setSubCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState();

    const { slug } = useParams();

    useEffect(() => {
        setLoading(true);
        getSubCategory(slug).then((res) => {
            setSubCategory(res.data.subCategory);
            setProducts(res.data.subCategoryProduct);
            setLoading(false);
        });
    }, [slug]);

    return (
        <>
            {loading ? (
                <h4 className="text-center p-1 mt-5 mb-5 display-6 jumbotron">
                    <Row>
                        <Col span={14} offset={5}>
                            <Skeleton
                                active
                                paragraph={{ rows: 0 }}
                                title={{ width: "100%" }}
                            />
                        </Col>
                    </Row>
                </h4>
            ) : (
                <h4 className="text-center p-3 mt-5 mb-5 display-6 jumbotron">
                    Sub-Category Is{" "}
                    {`"${subCategory.name}"`} and{" "}
                    {`"${products && products.length}"`} Has{" "}
                    {products && products.length === 1 ? "Porduct" : "Products"}{" "}
                </h4>
            )}

            <div className="container">
                {loading ? (
                    <LoadingCards count={3} />
                ) : (
                    <Row gutter={12}>
                        {products &&
                            products.length > 0 &&
                            products.map((product) => (
                                <Col span={8} key={product._id}>
                                    <ProductCard product={product} />
                                </Col>
                            ))}
                    </Row>
                )}
            </div>
        </>
    );
};

export default SubCategoryProducts;
