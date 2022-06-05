import React from "react";

const ShippingAddressForm = ({
    addressValues,
    validationError,
    validationMessage,
    loading,
    handleAddressValueChange,
    submitShippingAddressToDb,
}) => {
    const { fullName, address, country, city, postalCode } = addressValues;
    return (
        <form onSubmit={submitShippingAddressToDb}>
            <div className="form-group">
                <label htmlFor="fullName">Full Name:</label>
                <input
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={handleAddressValueChange}
                    className={`form-control ${
                        validationError && validationError.fullName
                            ? "is-invalid"
                            : validationMessage && validationMessage.fullName
                            ? "is-valid"
                            : ""
                    }`}
                    id="fullName"
                    placeholder="Enter Your Full Name"
                />
                {validationError && validationError.fullName ? (
                    <div className="invalid-feedback">
                        {validationError.fullName}
                    </div>
                ) : (
                    <div className="valid-feedback">Look Good!</div>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleAddressValueChange}
                    className={`form-control ${
                        validationError && validationError.address
                            ? "is-invalid"
                            : validationMessage && validationMessage.address
                            ? "is-valid"
                            : ""
                    }`}
                    id="address"
                    placeholder="Enter Your Address"
                />
                {validationError && validationError.address ? (
                    <div className="invalid-feedback">
                        {validationError.address}
                    </div>
                ) : (
                    <div className="valid-feedback">Look Good!</div>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                    type="text"
                    name="country"
                    value={country}
                    onChange={handleAddressValueChange}
                    className={`form-control ${
                        validationError && validationError.country
                            ? "is-invalid"
                            : validationMessage && validationMessage.country
                            ? "is-valid"
                            : ""
                    }`}
                    id="country"
                    placeholder="Enter Your Country Name"
                />
                {validationError && validationError.country ? (
                    <div className="invalid-feedback">
                        {validationError.country}
                    </div>
                ) : (
                    <div className="valid-feedback">Look Good!</div>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={handleAddressValueChange}
                    className={`form-control ${
                        validationError && validationError.city
                            ? "is-invalid"
                            : validationMessage && validationMessage.city
                            ? "is-valid"
                            : ""
                    }`}
                    id="city"
                    placeholder="Enter Your City Name"
                />
                {validationError && validationError.city ? (
                    <div className="invalid-feedback">
                        {validationError.city}
                    </div>
                ) : (
                    <div className="valid-feedback">Look Good!</div>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="postalCode">Postal Code:</label>
                <input
                    type="text"
                    name="postalCode"
                    value={postalCode}
                    onChange={handleAddressValueChange}
                    className={`form-control ${
                        validationError && validationError.postalCode
                            ? "is-invalid"
                            : validationMessage && validationMessage.postalCode
                            ? "is-valid"
                            : ""
                    }`}
                    id="postalCode"
                    placeholder="Enter Your Postal Code"
                />
                {validationError && validationError.postalCode ? (
                    <div className="invalid-feedback">
                        {validationError.postalCode}
                    </div>
                ) : (
                    <div className="valid-feedback">Look Good!</div>
                )}
            </div>
            <button type="submit" className="btn btn-outline-info mt-1">
                {loading ? "Saving" : "Save"}
            </button>
        </form>
    );
};

export default ShippingAddressForm;
