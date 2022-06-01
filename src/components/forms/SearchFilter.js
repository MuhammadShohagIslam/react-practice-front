import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchFilter = () => {
    const dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;
    const navigate = useNavigate();
    
    const changeHandler = (e) => {
        dispatch({
            type: "SEARCH_FILTER_VALUE",
            payload: {
                text: e.target.value,
            },
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/shop?${text}`);
    };

    return (
        <form className="form-inline" onSubmit={handleSubmit}>
            <div className="d-flex">
                <input
                    type="search"
                    value={text}
                    onChange={changeHandler}
                    placeholder="Search"
                    className="form-control mr-sm-2 searchInput"
                />
                <SearchOutlined
                    className="searchInputIcon"
                    onClick={handleSubmit}
                />
            </div>
        </form>
    );
};

export default SearchFilter;
