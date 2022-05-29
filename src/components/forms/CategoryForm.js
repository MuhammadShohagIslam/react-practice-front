const CategoryForm = ({ handleSubmit, setName, name, buttonName, loading }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name" className="mb-2">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autoFocus
                    required
                />
                <br />
                <button className="btn btn-outline-primary">
                    {loading
                        ? buttonName === "Save"
                            ? "Saving"
                            : "Updating"
                        : buttonName}
                </button>
            </div>
        </form>
    );
};

export default CategoryForm;
