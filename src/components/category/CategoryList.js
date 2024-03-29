import { Link } from "react-router-dom";

const CategoryList = ({ category }) => {
    const { slug , name } = category;

    return (
        <ul className="category-list">
            <Link to={`/products/categories/${slug}`}>
                <li>{name}</li>
            </Link>
        </ul>
    );
};

export default CategoryList;
