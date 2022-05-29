import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListOfCategory } from "../../../functions/category";
import {
    getSubCategory,
    updateSubCategory,
} from "../../../functions/subCategory";
import AdminNavigation from "../../../components/navigation/AdminNavigation";
import CategoryForm from "../../../components/forms/CategoryForm";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdateSubCategory = () => {
    const [updateSubCategoryName, setUpdateSubCategoryName] = useState("");
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const naviage = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        loadSingleSubCategories(slug);
    }, [slug]);

    const loadCategories = async () => {
        getListOfCategory().then((res) => {
            setCategories(res.data);
        });
    };

    const loadSingleSubCategories = async (slug) => {
        getSubCategory(slug).then((res) => {
            console.log(res.data.parent)
            setUpdateSubCategoryName(res.data.name);
            setParentCategory(res.data.parent);
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        updateSubCategory(
            user.token,
            updateSubCategoryName,
            parentCategory,
            slug
        )
            .then((res) => {
                toast.success(`${res.data.name} Sub-Catergory Updated!`);
                setLoading(false);
                naviage("/admin/sub");
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error("Sub-Category Updating Failed!");
                }
                setLoading(false);
            });
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
                        >
                            <option>Select Any Category</option>
                            {categories &&
                                categories.length > 0 &&
                                categories.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category._id}
                                        selected={
                                            category._id === parentCategory
                                        }
                                    >
                                        {category.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={updateSubCategoryName}
                        setName={setUpdateSubCategoryName}
                        buttonName="Update"
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default UpdateSubCategory;
