import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import { getOrdersByUser } from "../../functions/user";
import UserNavigation from "../../components/navigation/UserNavigation";
import OrderPaymentInfo from "./../../components/order/OrderPaymentInfo";
import OrderInvoiceDownload from "./../../components/order/OrderInvoiceDownload";
import OrderCartInTable from "./../../components/order/OrderCartInTable";

const History = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadOrders(user);
    }, [user]);

    // loading all orders from backend
    const loadOrders = (user) => {
        setLoading(true);
        if (user && user.token) {
            getOrdersByUser(user.token)
                .then((res) => {
                    setOrders(res.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    };

    // show invoce download
    const showDownloadLink = (order) => {
        return (
            <Row className="mt-2">
                <Col span={12} offset={6}>
                    <PDFDownloadLink
                        document={<OrderInvoiceDownload order={order} />}
                        fileName="invoice.pdf"
                        className="btn btn-sm btn-block btn-outline-info"
                        style={{ width: "100%" }}
                    >
                        DownLoad PDF
                    </PDFDownloadLink>
                </Col>
            </Row>
        );
    };

    return (
        <div className="container-fluid">
            <Row gutter={16}>
                <Col span={4}>
                    <UserNavigation />
                </Col>
                <Col span={20}>
                    {loading ? (
                        <h4 className="text-center">Loading...</h4>
                    ) : (
                        <>
                            <h4 className="text-center mt-2 mb-0">
                                {orders && orders.length > 0
                                    ? "User Purchase Order"
                                    : "No Purchase Order"}
                            </h4>
                            <hr />
                            {orders &&
                                orders.length > 0 &&
                                orders.reverse().map((order) => (
                                    <div
                                        className="mx-5 my-3 p-3 card"
                                        key={order._id}
                                    >
                                        <OrderPaymentInfo order={order} />
                                        <OrderCartInTable order={order} />
                                        {showDownloadLink(order)}
                                    </div>
                                ))}
                        </>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default History;
