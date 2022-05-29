import axios from "axios";

export const createSubCategory = async (authtoken, subCategoryName, parent) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/sub-category`,
        { subCategoryName, parent },
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const getAllSubCategories = async () =>
    await axios.get(`${process.env.REACT_APP_API_URL}/sub-categories`);

export const getSubCategory = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API_URL}/sub-categories/${slug}`);

export const updateSubCategory = async (
    authtoken,
    updateSubCategoryName,
    parent,
    slug
) => {
    return await axios.put(
        `${process.env.REACT_APP_API_URL}/sub-categories/${slug}`,
        { updateSubCategoryName, parent },
        {
            headers: {
                authtoken,
            },
        }
    );
};
export const deleteSubCategory = async (authtoken, slug) => {
    return await axios.delete(
        `${process.env.REACT_APP_API_URL}/sub-categories/${slug}`,
        {
            headers: {
                authtoken,
            },
        }
    );
};
