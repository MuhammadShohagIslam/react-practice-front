import { useState, useEffect } from "react";
import AdminNavigation from "./../../components/navigation/AdminNavigation";
import { getOrders, updateOrderStatus } from "./../../functions/admin";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";
import AdminOrders from "../../components/order/AdminOrders";
import { toast } from "react-toastify";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadingAllOrders(user);
    }, [user]);

    // loading all orders
    const loadingAllOrders = (user) => {
        if (user && user.token) {
            getOrders(user.token).then((res) => {
                setOrders(res.data);
            });
        }
    };

    const handleChangeOrderStatus = (orderId, orderStatus) => {
        updateOrderStatus(user.token, orderId, orderStatus).then((res) => {
            toast.success("Status is Updating!");
            loadingAllOrders(user);
        });
    };

    return (
        <div className="container-fluid">
            <Row gutter={16}>
                <Col span={5}>
                    <AdminNavigation />
                </Col>
                <Col span={19} className="mt-3">
                    <AdminOrders
                        orders={orders}
                        handleChangeOrderStatus={handleChangeOrderStatus}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default AdminDashboard;
