import React from "react";
import { Link } from "react-router-dom";

const SubCategoryList = ({ subCategory }) => {
    const { name, slug } = subCategory;
    return (
        <ul className="sub-category-list">
            <Link to={`/products/sub-categories/${slug}`}>
                <li>{name}</li>
            </Link>
        </ul>
    );
};

export default SubCategoryList;
