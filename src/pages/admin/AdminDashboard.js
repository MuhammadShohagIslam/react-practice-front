import AdminNavigation from "./../../components/navigation/AdminNavigation";

const AdminDashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <AdminNavigation />
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
};

export default AdminDashboard;
