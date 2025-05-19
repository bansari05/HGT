import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddStateModel from "./state-popup";

const State = () => {
    const navigate = useNavigate();
    const [selectedState,setSelectedState] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState([]);
    const [countryName, setCountryName] = useState("");
    const { countryId } = useParams();

    const handleFetchCities = (stateId) => {
        navigate(`/employers-dashboard/city/${countryId}/${stateId}`);
    }

    const fetchAllStatesByCountryId = async () => {
        try {
            const response = await fetch(`https://apihgt.solvifytech.in/api/v1/State/SelectByCountryId/${countryId}`, {
                headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
                },
            });

            const result = await response.json();
            setState(result.data || []);
            fetchCountryDetails();
        } catch (error) {
            console.error("Error fetching qualifications:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (state) => {
        setSelectedState(state);
        setIsPopupOpen(true);
    }

    const handleSave = async (formData) => {
        try {
            const isEdit = selectedState !== null;
            const url = isEdit ? "https://apihgt.solvifytech.in/api/v1/State/Update" : "https://apihgt.solvifytech.in/api/v1/State/Add";

            const method = isEdit ? "PUT" : "POST";

            const bodyData = isEdit ? {
                stateId : selectedState.state_id,
                state: formData.state,
                countryId: countryId,
            } : {
                state: formData.state,
                countryId: countryId,
            };

            const response = await fetch (url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjoxIiwiZXhwIjoxNzQ3MzgwNzc4LCJpYXQiOjE3NDczNzg5Nzh9.ddzA_MeIScaOfC5TO8GToY3CoFYUOjeK95fVF8HHn5s",
                },
                body: JSON.stringify(bodyData),
            });

            const result = await response.json();

            if(response.ok) {
                setIsPopupOpen(false);
                setSelectedState(null);
                fetchAllStatesByCountryId();
            } else {
                console.warn(result.message || "Failed to save country");
            }
        } catch (error) {
           console.error("Save Country Error:", error); 
        }
    };

    const handleToggleStatus = async (stateId) => {
        try {
            const response = await fetch(`https://apihgt.solvifytech.in/api/v1/State/Status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjoxIiwiZXhwIjoxNzQ3MzgwNzc4LCJpYXQiOjE3NDczNzg5Nzh9.ddzA_MeIScaOfC5TO8GToY3CoFYUOjeK95fVF8HHn5s",
                },
                body: JSON.stringify({ stateId }),
            });

            const result = await response.json();

            if(response.ok) {
                setIsPopupOpen(false);
                setSelectedState(null);
                fetchAllStatesByCountryId();
            } else {
                console.warn(result.message || "Failed to save state");
            }
        } catch (error) {
            console.error("Save state Error:", error);
        }
    };

    const fetchCountryDetails = async () => {
        try {
            const response = await fetch(`https://apihgt.solvifytech.in/api/v1/Country/SelectById/${countryId}`, {
                headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
                }   
            });

            const result = await response.json();
            setCountryName(result.data.country);
        } catch (error) {
            console.error("Error fetching country:", error);
        }
    }

    useEffect(() => {
        fetchAllStatesByCountryId();
    },[]);

    return (
        <div className="tabs-box">
            <div className="widget-title">
                <div className="form-group text-right">
                    <button
                        type="button"
                        className="theme-btn btn-style-one"
                        style={{marginLeft: '795px'}}
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
                                            onClick={() => handleFetchCities(c.state_id)}
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

            {isPopupOpen && (
                <AddStateModel
                onClose={() => {
                    setIsPopupOpen(false);
                    setSelectedState(null);
                }}
                onSave={handleSave}
                countryName={countryName}
                initialData={selectedState}
                />
            )}
        </div>
    );
}

export default State;