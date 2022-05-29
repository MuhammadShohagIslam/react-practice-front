import { useState, useEffect } from "react";
import AdminNavigation from "./../../../components/navigation/AdminNavigation";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
    createCategory,
    getListOfCategory,
    deleteCategory,
} from "./../../../functions/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CreateCategory = () => {
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    // step1
    const [keyword, setKeyword] = useState("");
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        handleShowCategory();
    }, []);

    // search filter
    // const filtering = categories.filter(category => category.name.toLowerCase().includes(keyword));
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

    const handleShowCategory = () =>
        getListOfCategory().then((res) => {
            setCategories(res.data);
        });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        createCategory(user.token, category)
            .then((res) => {
                setLoading(false);
                toast.success(`${res.data.name} Catergory Created!`);
                setCategory("");
                handleShowCategory();
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error("Category Creating Failed!");
                    setLoading(false);
                }
                setLoading(false);
            });
    };

    const handleRemoveCategory = async (slug) => {
        if (window.confirm("Are You Sure?, Want to Delete Category!")) {
            deleteCategory(user.token, slug)
                .then((res) => {
                    toast.success(`${res.data.name} is deleted!`);
                    handleShowCategory();
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        toast.error("Category Deleting Failed!");
                    }
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
                    <h4>Create Category</h4>
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={category}
                        setName={setCategory}
                        buttonName="Save"
                        loading={loading}
                    />
                    <hr />
                    <h3 className="text-center">
                        List of {categories.length}{" "}
                        {categories.length === 1 ? "Category" : "Categories"}
                    </h3>
                    <hr />
                    <LocalSearch
                        keyword={keyword}
                        setKeyword={setKeyword}
                        placeholder="Filter Category"
                    />
                    <hr />
                    {/*  {filtering.map((category) => ( */}
                    {categories.filter(searched(keyword)).map((category) => (
                        <div
                            className="alert alert-secondary"
                            key={category._id}
                        >
                            {category.name}
                            <span
                                onClick={() =>
                                    handleRemoveCategory(category.slug)
                                }
                                className="btn btn-sm float-end"
                            >
                                <DeleteOutlined className="text-danger" />
                            </span>
                            <Link to={`/admin/category/${category.slug}`}>
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

export default CreateCategory;
