import axios from "axios";

export const createCategory = async (authtoken, categoryName) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/category`,
        {
            categoryName,
        },
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const getListOfCategory = async () =>
    await axios.get(`${process.env.REACT_APP_API_URL}/categories`);

export const getSingleCategory = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API_URL}/categories/${slug}`);

export const updateCategory = async (authtoken, updateCategoryName, slug) => {
    return await axios.put(
        `${process.env.REACT_APP_API_URL}/categories/${slug}`,
        {
            updateCategoryName,
        },
        {
            headers: {
                authtoken,
            },
        }
    );
};

export const deleteCategory = async (authtoken, slug) => {
    return await axios.delete(
        `${process.env.REACT_APP_API_URL}/categories/${slug}`,
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const subCategoryOnCategory = async (authtoken, _id) => {
    return await axios.get(
        `${process.env.REACT_APP_API_URL}/categories/sub-categories/${_id}`,
        {
            headers: {
                authtoken,
            },
        }
    );
};

// export const productByCategory = async (_id) => {
//     return await axios.get(
//         `${process.env.REACT_APP_API_URL}/products/category/${_id}`
//     );
// };
