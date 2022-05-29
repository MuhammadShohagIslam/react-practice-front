import { Row, Col, Pagination } from "antd";
import { useState, useEffect } from "react";
import { getProductsBySort, getTotalProducts } from "../../functions/product";
import ProductCard from "../card/ProductCard";
import LoadingCards from "../card/LoadingCards";

const BestSellerProduct = () => {
    const [products, setProducts] = useState();
    const [totalProduct, setTotalProduct] = useState();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getTotalProducts().then((res) => setTotalProduct(res.data));
    });

    useEffect(() => {
        setLoading(true);
        getProductsBySort("sold", "desc", page).then((res) => {
            setProducts(res.data);
            setLoading(false);
        });
    }, [page]);

    const floorTotalProductLength = Math.floor((totalProduct / 3) * 10);

    return (
        <section>
            <div className="container">
                {loading ? (
                    <LoadingCards count={3} />
                ) : (
                    <Row gutter={12}>
                        {products &&
                            products.length &&
                            products.map((product) => (
                                <Col span={8} key={product._id}>
                                    <ProductCard product={product} />
                                </Col>
                            ))}
                    </Row>
                )}
                <Row>
                    <Col span={24}>
                        <div className="pagination-area">
                            <Pagination
                                current={page}
                                onChange={(page) => setPage(page)}
                                total={floorTotalProductLength ? floorTotalProductLength : 15}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default BestSellerProduct;
