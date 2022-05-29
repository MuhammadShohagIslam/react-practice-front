import { Fragment, useState } from "react";
import { Modal } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RatingModal = ({ children, slug }) => {
    const [visible, setVisible] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate();

    const handleAuthenticateStart = () => {
        if (user && user.token) {
            setVisible(true);
        } else {
            navigate("/login", { state: { from: `/products/${slug}` } });
        }
    };

    return (
        <Fragment>
            <div onClick={handleAuthenticateStart}>
                <StarOutlined className="text-danger" />
                <br />
                {user && user.token ? " Leave to Star" : "Loging to Leave Star"}
            </div>
            <Modal
                title="Leave to Star"
                visible={visible}
                onOk={() => {
                    setVisible(false);
                    toast.success("Wow! Rating you give me!");
                }}
                onCancel={() => setVisible(false)}
                centered
            >
                {children}
            </Modal>
        </Fragment>
    );
};

export default RatingModal;
