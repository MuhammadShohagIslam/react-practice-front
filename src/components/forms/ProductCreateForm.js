import { Select } from "antd";

const ProductCreateForm = ({
    handleSubmit,
    handleChange,
    handleChangeCategory,
    values,
    setValues,
    subCategories,
    isShow,
    loading,
}) => {
    const {
        title,
        description,
        price,
        quantity,
        colors,
        brands,
        categories,
        subCategory,
    } = values;
    
    return (
        <form onSubmit={handleSubmit}>
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
                >
                    <option>Select Shipping</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
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
                >
                    <option>Select Color</option>
                    {colors.map((color) => (
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
                >
                    <option>Select Brand</option>
                    {brands.map((brand) => (
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
                    className="form-control"
                    onChange={handleChangeCategory}
                >
                    <option>Select Category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            {isShow && (
                <div className="form-group">
                    <label>Sub Category</label>
                    <Select
                        mode="multiple"
                        placeholder="Select Sub-Category"
                        value={subCategory}
                        onChange={(value) =>
                            setValues({ ...values, subCategory: value })
                        }
                        style={{ width: "100%" }}
                    >
                        {subCategories &&
                            subCategories.map((subCategory) => (
                                <Select.Option
                                    key={subCategory._id}
                                    value={subCategory._id}
                                >
                                    {subCategory.name}
                                </Select.Option>
                            ))}
                    </Select>
                </div>
            )}
            <br />
            <button className="btn btn-outline-info">
                {loading ? "Saving" : "Save"}
            </button>
        </form>
    );
};

export default ProductCreateForm;
