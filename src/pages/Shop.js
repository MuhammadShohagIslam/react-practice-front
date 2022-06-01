import { Checkbox, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Star from "../components/forms/Star";
import FilterMenu from "../components/navigation/FilterMenu";
import { getListOfCategory } from "../functions/category";
import {
    getFilterRelatedProducts,
    getProductsByCount,
} from "../functions/product";
import { getAllSubCategories } from "../functions/sub-category";
import ProductCard from "./../components/card/ProductCard";

const brandArray = ["Apple", "Life-Digital", "Samsung", "ASUS", "Lenvo", "HP"];
const colorArray = ["Green", "Black", "Red", "White"];
const shippingArray = ["No", "Yes"];

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoriesId, setCategoriesId] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [subCategoryId, setSubCategoryId] = useState([]);
    const [brand, setBrand] = useState("");
    const [color, setColor] = useState("");
    const [shipping, setShipping] = useState("");
    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;
    const dispatch = useDispatch();

    useEffect(() => {
        // loading products
        loadingProducts();

        // loading categories
        loadingCategories();

        // loading sub-categories
        loadingSubCategories();
    }, []);

    const fetchProducts = (arg) => {
        getFilterRelatedProducts(arg)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // 1. loading products
    const loadingProducts = () => {
        getProductsByCount(10)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // 1.1 loading categories
    const loadingCategories = () => {
        getListOfCategory()
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    // 1.2 loading sub-categories
    const loadingSubCategories = () => {
        getAllSubCategories()
            .then((res) => {
                setSubCategories(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // 2. fetching or filtering products based on searching query
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ searchQuery: text });
            if (!text) {
                loadingProducts();
            }
        }, 300);
        return () => clearTimeout(delayed);
    }, [text]);

    // 3. fetching or filtering products based on price range
    useEffect(() => {
        fetchProducts({ price });
        console.log("Pricing");
    }, [ok]);

    const onAfterPriceChangeHandler = (value) => {
        dispatch({
            type: "SEARCH_FILTER_VALUE",
            payload: { text: "" },
        });
        setCategoriesId([]);
        setBrand("");
        setColor("");
        setSubCategoryId([]);
        setTimeout(() => {
            setPrice(value);
            setOk(!ok);
        }, 300);
    };

    // 4. fetching or filtering products based on categories
    const showCategories = () =>
        categories.map((category) => (
            <div key={category._id}>
                <Checkbox
                    onChange={handleCheck}
                    className="pl-4 pr-4"
                    value={category._id}
                    name="category"
                    checked={categoriesId.includes(category._id)}
                >
                    {category.name}
                </Checkbox>
                <br />
            </div>
        ));

    // handle check for categories
    const handleCheck = (e) => {
        // reset
        dispatch({
            type: "SEARCH_FILTER_VALUE",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setBrand("");
        setColor("");

        // console.log(e.target.value);
        let inTheState = [...categoriesId];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked); // index or -1

        // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            // if found pull out one item from index
            inTheState.splice(foundInTheState, 1);
        }

        setCategoriesId(inTheState);
        if (inTheState && inTheState.length > 0) {
            fetchProducts({ category: inTheState });
        } else {
            if (subCategoryId && subCategoryId.length > 0) {
                fetchProducts({ subCategory: subCategoryId });
            } else {
                loadingProducts();
            }
        }
    };
    // 5. fetching or filtering products based on color
    const starRatingFilter = () => (
        <div className="pl-4 pr-4">
            <Star numberOfStars={5} clickRating={clickRating} />
            <Star numberOfStars={4} clickRating={clickRating} />
            <Star numberOfStars={3} clickRating={clickRating} />
            <Star numberOfStars={2} clickRating={clickRating} />
            <Star numberOfStars={1} clickRating={clickRating} />
        </div>
    );
    const clickRating = (num) => {
        // reset
        dispatch({
            type: "SEARCH_FILTER_VALUE",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoriesId([]);
        setSubCategoryId([]);
        setBrand("");
        setColor("");
        fetchProducts({ star: num });
    };

    // 6. fetching or filtering products based on sub-categories
    const checkboxSubCategories = () =>
        subCategories &&
        subCategories.length > 0 &&
        subCategories.map((subCategory) => (
            <div key={subCategory._id}>
                <Checkbox
                    value={subCategory._id}
                    onChange={changeHandlerSubCategory}
                    className="pl-4 pr-4"
                    checked={subCategoryId.includes(subCategory._id)}
                    name="subCategory"
                >
                    {subCategory.name}
                </Checkbox>
            </div>
        ));

    // check for sub-categories
    const changeHandlerSubCategory = (e) => {
        // reset
        dispatch({
            type: "SEARCH_FILTER_VALUE",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setBrand("");
        setColor("");
        let inTheState = [...subCategoryId];
        let justChecked = e.target.value;

        let foundTheState = inTheState.indexOf(justChecked);
        if (foundTheState === -1) {
            inTheState.push(justChecked);
        } else {
            inTheState.splice(foundTheState, 1);
        }
        setSubCategoryId(inTheState);

        if (inTheState && inTheState.length > 0) {
            fetchProducts({ subCategory: inTheState });
        } else {
            if (categoriesId && categoriesId.length > 0) {
                fetchProducts({ category: categoriesId });
            } else {
                loadingProducts();
            }
        }
    };
    // 7. fetching or filtering products based on brand
    const checkboxBrands = () =>
        brandArray &&
        brandArray.length &&
        brandArray.map((b) => (
            <div key={b}>
                <Checkbox
                    onChange={handleBrandChange}
                    value={b}
                    className="pl-4 pr-4"
                    name="brand"
                    checked={brand === b}
                >
                    {b}
                </Checkbox>
            </div>
        ));

    // check for brand
    const handleBrandChange = (event) => {
        // reset
        dispatch({
            type: "SEARCH_FILTER_VALUE",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoriesId([]);
        setSubCategoryId([]);
        setBrand(event.target.value);
        setTimeout(() => {
            fetchProducts({ brand: event.target.value });
        }, 300);
    };

    // 8. fetching or filtering products based on color
    const checkboxColor = () =>
        colorArray &&
        colorArray.length &&
        colorArray.map((c) => (
            <div key={c}>
                <Checkbox
                    onChange={handleColorChange}
                    value={c}
                    className="pl-4 pr-4"
                    name="brand"
                    checked={color === c}
                >
                    {c}
                </Checkbox>
            </div>
        ));

    // check for brand
    const handleColorChange = (event) => {
        // reset
        dispatch({
            type: "SEARCH_FILTER_VALUE",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoriesId([]);
        setSubCategoryId([]);
        setBrand("");
        setColor(event.target.value);
        setTimeout(() => {
            fetchProducts({ color: event.target.value });
        }, 300);
    };

    // 9. fetching or filtering products based on shipping
    const checkboxShipping = () =>
        shippingArray &&
        shippingArray.length &&
        shippingArray.map((s, index) => (
            <div key={index}>
                <Checkbox
                    onChange={handleShipping}
                    value={s}
                    className="pl-4 pr-4"
                    name="shipping"
                    checked={s === shipping}
                >
                    {s}
                </Checkbox>
            </div>
        ));
    // check shipping
    const handleShipping = (e) => {
        // reset
        dispatch({
            type: "SEARCH_FILTER_VALUE",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoriesId([]);
        setSubCategoryId([]);
        setBrand("");
        setColor("");
        setShipping(e.target.value);
        setTimeout(() => {
            fetchProducts({ shipping: e.target.value });
        }, 300);
    };
    return (
        <div className="container-fluid">
            <Row>
                <Col span={6}>
                    <span>Search / Filter</span>
                    <FilterMenu
                        price={price}
                        onAfterPriceChangeHandler={onAfterPriceChangeHandler}
                        checkboxCategories={showCategories}
                        starRatingFilter={starRatingFilter}
                        checkboxSubCategories={checkboxSubCategories}
                        checkboxBrands={checkboxBrands}
                        checkboxColor={checkboxColor}
                        checkboxShipping={checkboxShipping}
                    />
                </Col>
                <Col span={17} offset={1}>
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4>Products</h4>
                    )}

                    {products && products.length < 1 ? (
                        <p>No Product Found</p>
                    ) : (
                        <Row gutter={16} className="mt-5">
                            {products &&
                                products.length &&
                                products.map((product) => (
                                    <Col
                                        span={8}
                                        key={product._id}
                                        className="mb-4"
                                    >
                                        <ProductCard product={product} />
                                    </Col>
                                ))}
                        </Row>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default Shop;

// useEffect(() => {
//     setPrice([0, 0]);
//     loadingCategories()
//     console.log(categoriesId, "SearchCategory");
//     let delayRequest = setTimeout(() => {
//         if (text) {

//             fetchProducts({ searchQuery: text });
//         } else {
//             loadingProducts();
//         }
//     }, 300);
//     console.log("Searching");

//     return () => clearTimeout(delayRequest);
// }, [text]);

// const onChangeCategoryHandler = (checkedValues) => {
//     if (checkedValues && checkedValues.length === 0) {
//         loadingProducts();
//     } else {
//         console.log(checkedValues);
//         // reset
//         dispatch({
//             type: "SEARCH_FILTER_VALUE",
//             payload: { text: "" },
//         });
//         setPrice([0, 0]);
//         setCategoriesId(checkedValues);
//         fetchProducts({ category: checkedValues });
//     }
// };
// const onChange = (e) => {
//     console.log("checked = ", e.target.checked);
//     setChecked(e.target.checked);
// };
// const checkboxCategories = () => {
//     console.log(categoriesId, "Categories Id");
//     return (
//         <Checkbox.Group onChange={onChangeCategoryHandler}>
//             <Row>
//                 {categories &&
//                     categories.length &&
//                     categories.map((category) => (
//                         <Col span={24} key={category._id}>
//                             {JSON.stringify(setCategoriesId)}
//                             <Checkbox
//                                 value={category._id}
//                                 checked={checked}
//                                 onChange={onChange}
//                             >
//                                 {category.name}
//                             </Checkbox>
//                         </Col>
//                     ))}
//             </Row>
//         </Checkbox.Group>
//     );
// };
