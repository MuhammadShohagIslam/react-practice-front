import { Row, Col } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { getListOfCategory } from "../../functions/category";
import CategoryList from "./../../components/category/CategoryList";

const CategoryHome = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getListOfCategory()
            .then((res) => setCategories(res.data))
            .catch((error) => console.log(error));
    }, []);
    
    return (
        <div className="container">
            <Row gutter={12}>
                <Col span={20} offset={2}>
                    {categories &&
                        categories.length > 0 &&
                        categories.map((category) => (
                            <CategoryList
                                category={category}
                                key={category._id}
                            />
                        ))}
                </Col>
            </Row>
        </div>
    );
};

export default CategoryHome;
