import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSingleCategory } from "./../../functions/category";
import { useState } from "react";
import { Col, Row, Skeleton } from "antd";
import ProductCard from "./../../components/card/ProductCard";
import LoadingCards from "../../components/card/LoadingCards";


const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = useParams();

    useEffect(() => {
        setLoading(true);
        getSingleCategory(slug).then((res) => {
            setProducts(res.data.products);
            setCategory(res.data.category);
            setLoading(false);
        });
    }, [slug]);

    console.log(products.length);
    return (
        <>
            {loading ? (
                    <h4 className="text-center p-1 mt-5 mb-5 display-6 jumbotron">
                        <Row>
                            <Col span={14} offset={5}>
                                <Skeleton active paragraph={{rows:0}} title={{width: "100%"}}/>
                            </Col>
                        </Row>
                    </h4>
            ) : (
                <h4 className="text-center p-3 mt-5 mb-5 display-6 jumbotron">
                    Category is{" "}
                    {`" ${products && products[0]?.category?.name} "`} and{" "}
                    {`"${products && products.length}"`} Has{" "}
                    {products && products.length === 1 ? "Porduct" : "Products"}{" "}
                    Under {category && category.name}
                </h4>
            )}

            <div className="container">
                {loading ? (
                    <LoadingCards count={products.length < 2 ? 2 : 3} />
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

export default CategoryProduct;
