import React, { useState, useEffect } from "react";
import { Row, Col, Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
    getProductsByCount,
    getFilterRelatedProducts,
} from "../functions/product";
import { getListOfCategory } from "../functions/category";
import { getAllSubCategories } from "../functions/sub-category";
import FilterMenu from "../components/navigation/FilterMenu";
import ProductCard from "./../components/card/ProductCard";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoriesId, setCategoriesId] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [subCategoryId, setSubCategoryId] = useState([]);
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
        getProductsByCount(10).then((res) => {
            setProducts(res.data);
        });
    };

    // 1.1 loading categories
    const loadingCategories = () => {
        getListOfCategory().then((res) => {
            setCategories(res.data);
        });
    };
    // 1.2 loading sub-categories
    const loadingSubCategories = () => {
        getAllSubCategories().then((res) => {
            setSubCategories(res.data);
            console.log(res.data);
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

    // 4. fetching or filtering products based on sub-categories

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

    const changeHandlerSubCategory = (e) => {
        // reset
        dispatch({
            type: "SEARCH_FILTER_VALUE",
            payload: { text: "" },
        });
        setPrice([0, 0]);
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

    return (
        <div className="container-fluid">
            <Row>
                <Col span={6}>
                    <span>Search / Filter</span>
                    <FilterMenu
                        price={price}
                        onAfterPriceChangeHandler={onAfterPriceChangeHandler}
                        checkboxCategories={showCategories}
                        checkboxSubCategories={checkboxSubCategories}
                    />
                </Col>
                <Col span={17} offset={1}>
                    <h2 className="text-dark ">Products</h2>
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
                </Col>
            </Row>
            {JSON.stringify(categories)}
        </div>
    );
};

export default Shop;
