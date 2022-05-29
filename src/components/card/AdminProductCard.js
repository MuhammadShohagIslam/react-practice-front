import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

const AdminProductCard = ({ product, handleRemoveProduct }) => {
    const { slug, title, images, description } = product;
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
                <Link to={`/admin/products/${slug}`} className="text-warning">
                    <EditOutlined />
                </Link>,
                <DeleteOutlined
                    className="text-danger"
                    onClick={() => handleRemoveProduct(slug)}
                />,
            ]}
        >
            <Meta
                title={title}
                description={description && description.substr(0, 50) + " ..."}
            />
        </Card>
    );
};

export default AdminProductCard;
