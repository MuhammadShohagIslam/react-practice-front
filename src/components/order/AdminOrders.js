import React from "react";
import OrderPaymentInfo from "./OrderPaymentInfo";
import { Row, Col } from "antd";
import OrderCartInTable from "./OrderCartInTable";

const AdminOrders = ({ orders, handleChangeOrderStatus }) => {
    return (
        <>
            {orders &&
                orders.length > 1 &&
                orders.reverse().map((order) => (
                    <Row key={order._id} className="pb-5">
                        <div className="btn btn-block bg-light">
                            <OrderPaymentInfo
                                order={order}
                                showStatus={false}
                            />

                            <Row gutter={16} className="mb-3">
                                <Col span={6}>
                                    <div className="pt-1 d-flex justify-content-end">
                                        Delivery Status:{" "}
                                    </div>
                                </Col>
                                <Col span={18}>
                                    <select
                                        name="status"
                                        className="form-control"
                                        defaultValue={order.orderStatus}
                                        onChange={(e) =>
                                            handleChangeOrderStatus(
                                                order._id,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="Not Processed">
                                            Not Processed
                                        </option>
                                        <option value="Cash On Delivery">
                                            Cash On Delivery
                                        </option>
                                        <option value="Processing">
                                            Processing
                                        </option>
                                        <option value="Cancelled">
                                            Cancelled
                                        </option>
                                        <option value="Completed">
                                            Completed
                                        </option>
                                    </select>
                                </Col>
                            </Row>
                            <OrderCartInTable order={order} />
                        </div>
                    </Row>
                ))}
        </>
    );
};

export default AdminOrders;
