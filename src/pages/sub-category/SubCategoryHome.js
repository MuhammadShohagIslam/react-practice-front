import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import SubCategoryList from "../../components/sub-category/SubCategoryList";
import { getAllSubCategories } from "../../functions/sub-category";

const SubCategoryHome = () => {
    const [subCategories, setSubCategories] = useState();

    useEffect(() => {
        getAllSubCategories().then((res) => {
            setSubCategories(res.data);
        });
    },[]);

    return (
        <div className="container">
            <Row>
                <Col span={20} offset={2}>
                    {subCategories &&
                        subCategories.length > 0 &&
                        subCategories.map((subCategory) => (
                            <SubCategoryList subCategory={subCategory} key={subCategory._id}/>
                        ))}
                </Col>
            </Row>
        </div>
    );
};

export default SubCategoryHome;
