import { Row, Col } from "antd";
import AdminNavigation from "../../../components/navigation/AdminNavigation";
import { useState, useEffect } from "react";
import { getProduct, updateProduct } from "../../../functions/product";
import { useParams, useNavigate } from "react-router-dom";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import {
    getListOfCategory,
    subCategoryOnCategory,
} from "../../../functions/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ImageFileUploadForm from './../../../components/forms/ImageFileUploadForm';

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

const UpdateProduct = () => {
    const [values, setValues] = useState(initialValues);
    const [categories, setCategories] = useState([]);
    const [seletedCategory, setSeletedCategory] = useState();
    const [subCategories, setSubCategories] = useState([]);
    const [arraySubCategories, setArraySubCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));
    const { slug } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        loadingProduct();
        loadingCategory();
    }, []);

    const loadingProduct = () => {
        getProduct(slug)
            .then((res) => {
                setValues({ ...values, ...res.data });
                subCategoryOnCategory(user.token, res.data.category._id).then(
                    (res) => {
                        setSubCategories(res.data);
                    }
                );
                let array = [];
                res.data.subCategory.map((d) => {
                    return array.push(d._id);
                });
                setArraySubCategories((prev) => array);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loadingCategory = () => {
        getListOfCategory()
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleCategoryChange = (event) => {
        setValues({
            ...values,
            subCategory: [],
        });
        setSeletedCategory(event.target.value);
        subCategoryOnCategory(user.token, event.target.value)
            .then((res) => {
                setSubCategories(res.data);
            })
            .catch((error) => {
                console.log(error);
            });

        if (values.category._id === event.target.value) {
            loadingProduct();
        }
        setArraySubCategories([]);
    };

    const handleSubmitProduct = (event) => {
        event.preventDefault();
        values.category = seletedCategory ? seletedCategory : values.category;
        values.subCategory = arraySubCategories;
        setLoading(true);
        updateProduct(user.token, slug, values)
            .then((res) => {
                toast.success(`${res.data.title} Product Is Updated!`);
                setLoading(false);
                navigate("/admin/products");
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error(error.response.error.message);
                }
                console.log(error);
                setLoading(false);
            });
    };

    return (
        <div className="container-fluid">
            <Row>
                <Col span={4}>
                    <AdminNavigation />
                </Col>
                <Col span={20} className="pt-3">
                    <div className="p-3">
                        <ImageFileUploadForm
                            setValues={setValues}
                            values={values}
                            setLoading={setLoading}
                        />
                    </div>
                    <ProductUpdateForm
                        values={values}
                        setValues={setValues}
                        categories={categories}
                        subCategories={subCategories}
                        arraySubCategories={arraySubCategories}
                        setArraySubCategories={setArraySubCategories}
                        seletedCategory={seletedCategory}
                        loading={loading}
                        handleSubmitProduct={handleSubmitProduct}
                        handleChange={handleChange}
                        handleCategoryChange={handleCategoryChange}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default UpdateProduct;
