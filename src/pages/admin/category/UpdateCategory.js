import { useState, useEffect } from "react";
import AdminNavigation from "./../../../components/navigation/AdminNavigation";
import { useParams, useNavigate } from "react-router-dom";
import {
    getSingleCategory,
    updateCategory,
} from "./../../../functions/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CategoryForm from "../../../components/forms/CategoryForm";

const UpdateCategory = () => {
    const [updateCategoryName, setUpdateCategoryName] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const naviage = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        const handleShowCategory = async () =>
            getSingleCategory(slug).then((res) => {
                setUpdateCategoryName(res.data.name);
            });
        handleShowCategory();
    }, [slug]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        updateCategory(user.token, updateCategoryName, slug)
            .then((res) => {
                toast.success(`${res.data.name} Catergory Updated!`);
                setLoading(false);
                naviage('/admin/category')
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error("Category Updating Failed!");
                    setLoading(false);
                }
            });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNavigation />
                </div>
                <div className="col-md-8">
                    <h4>Update Category</h4>
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={updateCategoryName}
                        setName={setUpdateCategoryName}
                        buttonName="Update"
                        loading = {loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default UpdateCategory;
