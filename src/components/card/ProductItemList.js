import { Link } from "react-router-dom";

const ProductItemList = ({ product }) => {
    const {
        price,
        category,
        subCategory,
        shipping,
        color,
        brand,
        quantity,
        sold,
    } = product;

    return (
        <ul className="list-group">
            <li className="list-group-item">
                Price{" "}
                <span className="label label-default label-pill float-end">
                    ${price}
                </span>
            </li>
            {category && (
                <li className="list-group-item">
                    Category
                    <span className="label label-default float-end">
                        <Link to={`/products/category/${category.slug}`}>
                            {" "}
                            {category.name}
                        </Link>
                    </span>
                </li>
            )}
            <li className="list-group-item">
                Sub-Category
                {subCategory &&
                    subCategory.map((sub) => {
                        return (
                            <span
                                key={sub._id}
                                className="label label-default label-pill float-end"
                            >
                                <Link
                                    to={`/products/${sub.slug}`}
                                    className="mr-1"
                                >
                                    {sub.name}
                                </Link>
                            </span>
                        );
                    })}
            </li>
            <li className="list-group-item">
                Shipping{" "}
                <span className="label label-default label-pill float-end">
                    {shipping}
                </span>
            </li>
            <li className="list-group-item">
                Color{" "}
                <span className="label label-default label-pill float-end">
                    {color}
                </span>
            </li>
            <li className="list-group-item">
                Brand{" "}
                <span className="label label-default label-pill float-end">
                    {brand}
                </span>
            </li>
            <li className="list-group-item">
                Quantity{" "}
                <span className="label label-default label-pill float-end">
                    {quantity}
                </span>
            </li>
            <li className="list-group-item">
                Sold{" "}
                <span className="label label-default label-pill float-end">
                    {sold}
                </span>
            </li>
        </ul>
    );
};

export default ProductItemList;
