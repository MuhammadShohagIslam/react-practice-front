import React, { useEffect } from "react";
import { Row, Col } from "antd";
import AdminNavigation from "./../../../components/navigation/AdminNavigation";
import CouponForm from "../../../components/forms/CouponForm";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import {
    getListOfCoupons,
    removingCoupon,
    creatingCoupon,
} from "../../../functions/coupon";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const initalCouponValues = {
    couponName: "",
    discount: "",
};
const CreateCoupon = () => {
    const [couponValues, setCouponValues] = useState(initalCouponValues);
    const [expireDate, setExpireDate] = useState(new Date());
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);

    // redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadinglistOfCoupons(user);
    }, [user]);

    // loading list of coupons
    const loadinglistOfCoupons = (user) => {
        if (user && user.token) {
            getListOfCoupons(user.token)
                .then((res) => {
                    setCoupons(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleCouponChange = (e) => {
        setCouponValues({
            ...couponValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleCouponSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (!couponValues.couponName || couponValues.couponName.trim() === "") {
            toast.error("Invalid Coupon. Provide Valid Coupon!");
            setLoading(false);
            return;
        }
        if (user && user.token) {
            setLoading(true);
            creatingCoupon(
                user.token,
                couponValues.couponName,
                couponValues.discount,
                expireDate
            )
                .then((res) => {
                    setCoupons(res.data);
                    setLoading(false);
                    toast.success(`${res.data.name} coupon is created!`);
                    loadinglistOfCoupons(user);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    };

    const removeCoupon = (couponId) => {
        if (user && user.token) {
            removingCoupon(user.token, couponId)
                .then((res) => {
                    toast.error(`${res.data.name} coupon is deleted!`);
                    setLoading(false);
                    loadinglistOfCoupons(user);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    };

    return (
        <div className="container-fluid">
            <Row gutter={16}>
                <Col span={4}>
                    <AdminNavigation />
                </Col>
                <Col span={20}>
                    <h4>Coupon</h4>
                    <Row>
                        <Col span={16}>
                            <CouponForm
                                couponValues={couponValues}
                                expireDate={expireDate}
                                setExpireDate={setExpireDate}
                                loading={loading}
                                handleCouponChange={handleCouponChange}
                                handleCouponSubmit={handleCouponSubmit}
                            />
                        </Col>
                    </Row>
                    <hr />
                    <h5>
                        List of {coupons.length}{" "}
                        {coupons.length > 1 ? "Coupons" : "Coupon"}
                    </h5>
                    <hr />
                    <table className="table align-middle">
                        <thead className="table-secondary text-center">
                            <tr>
                                <th scope="col">Coupon-Name</th>
                                <th scope="col">Expire Date</th>
                                <th scope="col">Discount</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons && coupons.length > 0 ? (
                                coupons.map((coupon) => (
                                    <tr key={coupon._id}>
                                        <td className="text-center">
                                            {coupon.name}
                                        </td>
                                        <td className="text-center">
                                            {new Date(
                                                coupon.expiry
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="text-center">
                                            {coupon.discount}
                                        </td>
                                        <td className="text-center">
                                            {" "}
                                            <CloseOutlined
                                                className="text-danger"
                                                onClick={() =>
                                                    removeCoupon(coupon._id)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="text-center" colSpan="4">
                                        <h5>No Coupon</h5>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </div>
    );
};

export default CreateCoupon;
