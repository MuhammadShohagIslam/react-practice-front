import { useState, useEffect } from "react";
import AdminNavigation from "../../../components/navigation/AdminNavigation";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import CategoryForm from "../../../components/forms/CategoryForm";
import {
    createSubCategory,
    getAllSubCategories,
    deleteSubCategory,
} from "../../../functions/subCategory";
import { getListOfCategory } from "../../../functions/category";
import { toast } from "react-toastify";
import LocalSearch from "../../../components/forms/LocalSearch";

const CreateSubCategory = () => {
    const [subCategoryName, setSubCategoryName] = useState("");
    const [subCategories, setSubCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState("");
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        getAllCategories();
        allSubCategories();
    }, []);

    const getAllCategories = async () => {
        getListOfCategory().then((res) => {
            setCategories(res.data);
        });
    };
    const allSubCategories = async () => {
        getAllSubCategories().then((res) => {
            setSubCategories(res.data);
        });
    };

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        createSubCategory(user.token, subCategoryName, parentCategory)
            .then((res) => {
                toast.success(`${res.data.name} Sub-Category Created!`);
                allSubCategories();
                setParentCategory("")
                setSubCategoryName("");
                setLoading(false);
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error(`Sub-Category Creating is Failed!`);
                }
                setLoading(false);
            });
    };

    const handleRemoveSubCategory = async (slug) => {
        if (
            window.confirm(
                `Are You Sure? To Remove ${slug.toUpperCase()} Sub-Category!`
            )
        ) {
            deleteSubCategory(user.token, slug)
                .then((res) => {
                    toast.success(`${res.data.name} Sub-Category Deleted!`);
                    setLoading(false);
                    allSubCategories();
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        toast.error(`Sub-Category Removing is Failed!`);
                    }
                    setLoading(false);
                });
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNavigation />
                </div>
                <div className="col-md-8">
                    <h4>Create Sub Category</h4>
                    <div className="form-group mb-3">
                        <label className="mb-2">Parent Category</label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={(e) => setParentCategory(e.target.value)}
                            value={parentCategory}
                        >
                            <option>Select Any Category</option>
                            {categories &&
                                categories.length > 0 &&
                                categories.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={subCategoryName}
                        setName={setSubCategoryName}
                        buttonName="Save"
                        loading={loading}
                    />
                    <hr />
                    <h3 className="text-center">
                        List of {subCategories.length}{" "}
                        {subCategories.length === 1
                            ? "Sub-Category"
                            : "Sub-Categories"}
                    </h3>
                    <hr />
                    <LocalSearch
                        keyword={keyword}
                        setKeyword={setKeyword}
                        placeholder="Filter Sub Category"
                    />
                    <hr />
                    {subCategories
                        .filter(searched(keyword))
                        .map((subCategory) => (
                            <div
                                className="alert alert-secondary"
                                key={subCategory._id}
                            >
                                {subCategory.name}
                                <span
                                    onClick={() =>
                                        handleRemoveSubCategory(
                                            subCategory.slug
                                        )
                                    }
                                    className="btn btn-sm float-end"
                                >
                                    <DeleteOutlined className="text-danger" />
                                </span>
                                <Link to={`/admin/sub/${subCategory.slug}`}>
                                    <span className="btn btn-sm float-end">
                                        <EditOutlined className="text-warning" />
                                    </span>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default CreateSubCategory;
