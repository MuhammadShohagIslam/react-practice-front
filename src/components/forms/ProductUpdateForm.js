import { Select } from "antd";

const ProductUpdateForm = ({
    handleSubmitProduct,
    handleChange,
    handleCategoryChange,
    setArraySubCategories,
    values,
    loading,
    categories,
    subCategories,
    seletedCategory,
    arraySubCategories,
}) => {
    const {
        title,
        description,
        price,
        quantity,
        shipping,
        colors,
        color,
        brands,
        brand,
        category,
        subCategory,
    } = values;

    console.log(brand);
    return (
        <form onSubmit={handleSubmitProduct}>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Shipping</label>
                <select
                    name="shipping"
                    className="form-control"
                    onChange={handleChange}
                    value={shipping === "Yes" ? "Yes" : "No"}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            <div className="form-group">
                <label>Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Color</label>
                <select
                    name="color"
                    className="form-control"
                    onChange={handleChange}
                    value={color}
                >
                    {colors &&
                        colors.map((color) => (
                            <option key={color} value={color}>
                                {color}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <label>Brand</label>
                <select
                    name="brand"
                    className="form-control"
                    onChange={handleChange}
                    value={brand}
                >
                    {brands &&
                        brands.map((brand) => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <label>Category</label>
                <select
                    name="category"
                    className="form-select" aria-label="Default select example"
                    onChange={handleCategoryChange}
                    value={seletedCategory ? seletedCategory : category._id}
                >
                    {categories &&
                        categories.length &&
                        categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label>Sub Category</label>
                <Select
                    mode="multiple"
                    placeholder="Select Sub-Category"
                    value={arraySubCategories}
                    onChange={(value) => setArraySubCategories(value)}
                    style={{ width: "100%" }}
                >
                    {subCategories &&
                        subCategories.map((subC) => (
                            <Select.Option key={subC._id} value={subC._id}>
                                {subC.name}
                            </Select.Option>
                        ))}
                </Select>
            </div>
            {JSON.stringify(category)}
            {JSON.stringify(seletedCategory)}

            <br />
            <button className="btn btn-outline-info">
                {loading ? "Saving" : "Save"}
            </button>
        </form>
    );
};

export default ProductUpdateForm;
