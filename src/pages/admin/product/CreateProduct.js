import { useState, useEffect } from "react";
import AdminNavigation from "./../../../components/navigation/AdminNavigation";
import { createProduct } from "./../../../functions/product";
import { useSelector } from "react-redux";
import ProductCreateForm from "./../../../components/forms/ProductCreateForm";
import { toast } from "react-toastify";
import ImageFileUploadForm from "./../../../components/forms/ImageFileUploadForm";
import {
    getListOfCategory,
    subCategoryOnCategory,
} from "../../../functions/category";

const initialValues = {
    title: "",
    description: "",
    images: [],
    price: "",
    shipping: "",
    quantity: "",
    color: "",
    colors: ["Green", "Black", "Red", "White"],
    brand: "",
    brands: ["Apple", "Life-Digital", "Samsung", "ASUS", "Lenvo", "HP"],
    category: "",
    categories: [],
    subCategory: [],
};
const CreateProduct = () => {
    const [values, setValues] = useState(initialValues);
    const [subCategories, setSubCategories] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadingCategories();
    }, []);

    const loadingCategories = () => {
        getListOfCategory().then((res) => {
            setValues({
                ...values,
                categories: res.data,
            });
        });
    };
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };
    const handleChangeCategory = (event) => {
        setValues({
            ...values,
            subCategory: [],
            category: event.target.value,
        });
        if (event.target.value === "Select Category") {
            setIsShow(false);
        } else {
            subCategoryOnCategory(user.token, event.target.value)
                .then((res) => {
                    setSubCategories(res.data);
                })
                .catch((error) => {
                    console.log(error);
                    setIsShow(false);
                });
            setIsShow(true);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        createProduct(user.token, values)
            .then((res) => {
                setLoading(false);
                window.alert(`${res.data.title} Product Created!`);
                window.location.reload();
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error(`${error.data.error}`);
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
                    <h2>Create New Product</h2>
                    <div className="p-3">
                        <ImageFileUploadForm
                            setValues={setValues}
                            values={values}
                            setLoading={setLoading}
                        />
                    </div>
                    <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        handleChangeCategory={handleChangeCategory}
                        subCategories={subCategories}
                        values={values}
                        setValues={setValues}
                        isShow={isShow}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
