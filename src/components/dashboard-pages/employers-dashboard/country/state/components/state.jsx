import { useEffect, useState } from "react";

const State = () => {

    const [selectedState,setSelectedState] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState([]);

    const fetchAllStates = async () => {
        try {
            const response = await fetch("https://apihgt.solvifytech.in/api/v1/State/SelectAll", {
                headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
                },
            });

            const result = await response.json();
            setState(result.data || []);
        } catch (error) {
            console.error("Error fetching qualifications:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllStates()
    })

    return (
        <div className="tabs-box">
            <div className="widget-title">
                <h4>States</h4>
                <div className="form-group text-right">
                    <button
                        type="button"
                        className="theme-btn btn-style-one"
                        onClick={() => {
                        setSelectedState(null);
                        setIsPopupOpen(true);
                        }}
                    >
                        Add State
                    </button>
                </div>
            </div>

            <div className="widget-content">
                <div className="table-outer">
                    <table className="default-table manage-job-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>State Name</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                <td colSpan="4" className="text-center">
                                    Loading...
                                </td>
                                </tr>
                            ) : state.length === 0 ? (
                                <tr>
                                <td colSpan="4" className="text-center">
                                    No States found
                                </td>
                                </tr>
                            ) : (
                                state.map((c) => (
                                <tr key={c.state_id}>
                                    <td>{c.state_id}</td>
                                    <td>{c.state}</td>
                                    <td>{c.is_active ? "Active" : "Inactive"}</td>
                                    <td>
                                    <div className="option-box">
                                        <ul className="option-list">
                                        <li>
                                            <button
                                            data-text="Change Status"
                                            title={c.is_active ? "Deactivate" : "Activate"}
                                            onClick={() =>
                                                handleToggleStatus(c.state_id)
                                            }
                                            >
                                            <span
                                                className={
                                                c.is_active ? "la la-eye-slash" : "la la-eye"
                                                }
                                            ></span>
                                            </button>
                                        </li>
                                        <li>
                                            <button data-text="Edit State" onClick={() => handleEdit(c)}>
                                            <span className="la la-pencil"></span>
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                            data-text="Fetch Cities" 
                                            onClick={() => handleFetchStates(c.state_id)}
                                            >
                                            <span className="la la-list"></span>
                                            </button>
                                        </li>
                                        </ul>
                                    </div>
                                    </td>
                                </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default State;