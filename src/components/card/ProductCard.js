import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { avgRating } from "../../functions/avgRating";
import { Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

const ProductCard = ({ product }) => {
    const { slug, title, images, description } = product;
    return (
        <>
            {product && product.ratings && product.ratings.length > 0 ? (
                avgRating(product)
            ) : (
                <div className="text-center pb-3 pt-0">Not Rating Yet</div>
            )}
            <Card
                cover={
                    <img
                        alt={title}
                        src={images && images.length && images[0].url}
                        style={{ objectFit: "cover", height: "250px" }}
                    />
                }
                actions={[
                    <Link to={`/products/${slug}`} className="text-warning">
                        <EyeOutlined /> <br /> View Product
                    </Link>,
                    <Link to={`/products/${slug}`} className="text-danger">
                        <ShoppingCartOutlined /> <br /> Add To Cart
                    </Link>,
                ]}
            >
                <Meta
                    title={title}
                    description={
                        description && description.substr(0, 100) + " ..."
                    }
                />
            </Card>
        </>
    );
};

export default ProductCard;
