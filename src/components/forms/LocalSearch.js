// import classes from "./LocalSearch.module.css";

const LocalSearch = ({ keyword, setKeyword, placeholder }) => {
    const handleKeyword = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    };
    return (
        <input
            type="search"
            value={keyword}
            onChange={handleKeyword}
            placeholder={placeholder}
            className="form-control mb-4"
        />
    );
};

export default LocalSearch;
