import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";

const OrderCartInTable = ({order}) => {
    return (
        <table className="table table-bordered align-middle text-center mb-0">
            <thead className="table-secondary">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                </tr>
            </thead>
            <tbody>
                {order.products &&
                    order.products.map((item) => (
                        <tr key={item._id}>
                            <td>{item.product.title}</td>
                            <td>{item.product.price}</td>
                            <td>{item.product.brand}</td>
                            <td>{item.color}</td>
                            <td>{item.count}</td>
                            <td>
                                {item.product.shipping === "Yes" ? (
                                    <CheckCircleOutlined
                                        style={{ color: "green" }}
                                    />
                                ) : (
                                    <CheckCircleOutlined
                                        style={{ color: "red" }}
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export default OrderCartInTable;
