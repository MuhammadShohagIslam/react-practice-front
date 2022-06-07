import { EyeOutlined, HeartFilled } from "@ant-design/icons";
import { Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

const WhisListProductCard = ({ product, handleRemovedToWhisList }) => {
    const { slug, title, images, description, _id } = product;
    return (
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
                <button className="addToCart" onClick={() => handleRemovedToWhisList(_id)}>
                    <HeartFilled className="text-info" /> <br /> Removed To
                    Wishlist
                </button>,
            ]}
        >
            <Meta
                title={title}
                description={description && description.substr(0, 50) + " ..."}
            />
        </Card>
    );
};

export default WhisListProductCard;
