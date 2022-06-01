import axios from "axios";

// for creating product
export const createProduct = async (authtoken, productObject) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/product`,
        productObject,
        {
            headers: {
                authtoken,
            },
        }
    );
};

// for getting products with number how many we want
export const getProductsByCount = async (count) =>
    await axios.get(`${process.env.REACT_APP_API_URL}/products/count/${count}`);

// for getting all products by sorting with pagination
export const getProductsBySort = async (sort, order, page) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/products`, {
        sort,
        order,
        page,
    });
};

// for getting all products
export const getTotalProducts = async () =>
    await axios.post(`${process.env.REACT_APP_API_URL}/products/total`);

// for getting single product
export const getProduct = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/products/${slug}`);
};

// for update product
export const updateProduct = async (authtoken, slug, updateProducts) => {
    return await axios.put(
        `${process.env.REACT_APP_API_URL}/products/${slug}`,
        updateProducts,
        {
            headers: {
                authtoken,
            },
        }
    );
};

// for removing product
export const deleteProduct = async (authtoken, slug) => {
    return await axios.delete(
        `${process.env.REACT_APP_API_URL}/products/${slug}`,
        {
            headers: {
                authtoken,
            },
        }
    );
};

// for ratings  product
export const productRating = async (authtoken, productId, star) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/products/ratings/${productId}`,
        { star },
        {
            headers: {
                authtoken,
            },
        }
    );
};

// for getting related product
export const relatedProducts = async (productId) => {
    return await axios.get(
        `${process.env.REACT_APP_API_URL}/products/related/${productId}`
    );
};

// for getting fllter related product
export const getFilterRelatedProducts = async (argument) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/products/filter`,
        argument
    );
};
