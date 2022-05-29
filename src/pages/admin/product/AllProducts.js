import { Row, Col } from "antd";
import AdminProductCard from "../../../components/card/AdminProductCard";
import AdminNavigation from "../../../components/navigation/AdminNavigation";
import { useState, useEffect } from "react";
import { getProductsByCount, deleteProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadingProducts();
    }, []);

    const loadingProducts = () => {
        setLoading(true);
        getProductsByCount(100)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    const handleRemoveProduct = (slug) => {
        if (user && user.token) {
            setLoading(true);
            deleteProduct(user.token, slug)
                .then((res) => {
                    toast.error(`${res.data.title} product is deleted!`);
                    loadingProducts();
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    };

    if(loading){
        return  <p className="text-center text-danger">Loading</p>
   }

    return (
        <div className="container-fluid">
            <Row>
                <Col span={4}>
                    <AdminNavigation />
                </Col>
                <Col span={20} className="pt-3">
                    <Row gutter={12}>
                        {products &&
                            products.length &&
                            products.map((product) => (
                                <Col span={8} key={product._id} className="mb-3">
                                    <AdminProductCard
                                        product={product}
                                        handleRemoveProduct={
                                            handleRemoveProduct
                                        }
                                    />
                                </Col>
                            ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default AllProducts;
