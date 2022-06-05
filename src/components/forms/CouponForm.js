import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CouponForm = ({
    couponValues,
    handleCouponChange,
    expireDate,
    setExpireDate,
    loading,
    handleCouponSubmit,
}) => {
    const { couponName, discount } = couponValues;
    return (
        <form onSubmit={handleCouponSubmit}>
            <div className="form-group">
                <label htmlFor="coupon">Coupon:</label>
                <input
                    type="text"
                    name="couponName"
                    value={couponName}
                    onChange={handleCouponChange}
                    className="form-control "
                    id="coupon"
                    placeholder="Enter Coupon"
                    autoFocus
                />
            </div>
            <div className="form-group">
                <label htmlFor="discount">Discount:</label>
                <input
                    type="text"
                    name="discount"
                    value={discount}
                    onChange={handleCouponChange}
                    className="form-control "
                    id="discount"
                    placeholder="Enter Discount"
                />
            </div>
            <div className="form-group">
                <label htmlFor="expireDate">Expire Date:</label>
                <DatePicker
                    selected={expireDate}
                    onChange={(date) => setExpireDate(date)}
                    id="expireDate"
                />
            </div>
            <button className="btn btn-outline-info mt-1">
                {loading ? "Saving" : "Save"}
            </button>
        </form>
    );
};

export default CouponForm;
