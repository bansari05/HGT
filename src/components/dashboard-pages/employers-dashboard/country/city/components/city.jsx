import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddCityModel from "./city-popup";

const City = () => {
    const [selectedCity, setSelectedCity] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState([]);
    const [countryName, setCountryName] = useState("");
    const [stateName, setStateName] = useState("");
    const { countryId, stateId } = useParams();

    const fetchAllCityByStateId = async () => {
        try {
            const response = await fetch(`https://apihgt.solvifytech.in/api/v1/City/SelectByStateId/${stateId}`, {
                headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
                },
            });

            const result = await response.json();
            setCity(result.data || []);
            fetchCountryDetails();
            fetchStateDetails();
        } catch (error) {
            console.error("Error fetching qualifications:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (city) => {
        setSelectedCity(city);
        setIsPopupOpen(true);
    }

    const handleSave = async (formData) => {
        try {
            const isEdit = selectedCity !== null;

            const url = isEdit ? "https://apihgt.solvifytech.in/api/v1/City/Update" : "https://apihgt.solvifytech.in/api/v1/City/Add";

            const method = isEdit ? "PUT" : "POST";

            const bodyData = isEdit ? {
                cityId: selectedCity.city_id,
                city: formData.city,
                stateId: stateId,
            } : {
                city: formData.city,
                stateId: stateId,
            }

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjoxIiwiZXhwIjoxNzQ3MzgwNzc4LCJpYXQiOjE3NDczNzg5Nzh9.ddzA_MeIScaOfC5TO8GToY3CoFYUOjeK95fVF8HHn5s",
                },
                body: JSON.stringify(bodyData),
            })

            const result = await response.json();

            if(response.ok) {
                setIsPopupOpen(false);
                setSelectedCity(null);
                fetchAllCityByStateId();
            } else {
                console.error("Error saving city:", result.message);
            }
        } catch (error) {
            console.error("Error saving city:", error.message);
        }
    };

    const handleToggleStatus = async (cityId) => {
        try {
            const response = await fetch(`https://apihgt.solvifytech.in/api/v1/City/Status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjoxIiwiZXhwIjoxNzQ3MzgwNzc4LCJpYXQiOjE3NDczNzg5Nzh9.ddzA_MeIScaOfC5TO8GToY3CoFYUOjeK95fVF8HHn5s",
                },
                body: JSON.stringify({ cityId }),
            });

            const result = await response.json();

            if(response.ok) {
                setIsPopupOpen(false);
                setSelectedCity(null);
                fetchAllCityByStateId();
            } else {
                console.error("Error toggling city status:", result.message);
            }
        } catch (error) {
            console.error("Error toggling city status:", error.message);
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
    };

    const fetchStateDetails = async () => {
        try {
            const response = await fetch(`https://apihgt.solvifytech.in/api/v1/State/SelectById/${stateId}`, {
                headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM"
                }  
            });
            const result = await response.json();
            setStateName(result.data.state);
        } catch (error) {
            console.error("Error fetching country:", error);
        }
    }

    useEffect(() => {
        fetchAllCityByStateId();
    }, []);

    return (
        <div className="tabs-box">
            <div className="widget-title">
                <div className="form-group text-right">
                    <button
                        type="button"
                        className="theme-btn btn-style-one"
                        style={{marginLeft: '815    px'}}
                        onClick={() => {
                        setSelectedCity(null);
                        setIsPopupOpen(true);
                        }}
                    >
                        Add City
                    </button>
                </div>
            </div>

            <div className="widget-content">
                <div className="table-outer">
                    <table className="default-table manage-job-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>City Name</th>
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
                            ) : city.length === 0 ? (
                                <tr>
                                <td colSpan="4" className="text-center">
                                    No Cities found
                                </td>
                                </tr>
                            ) : (
                                city.map((c) => (
                                <tr key={c.city_id}>
                                    <td>{c.city_id}</td>
                                    <td>{c.city}</td>
                                    <td>{c.is_active ? "Active" : "Inactive"}</td>
                                    <td>
                                    <div className="option-box">
                                        <ul className="option-list">
                                        <li>
                                            <button
                                            data-text="Change Status"
                                            title={c.is_active ? "Deactivate" : "Activate"}
                                            onClick={() =>
                                                handleToggleStatus(c.city_id)
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
                <AddCityModel
                    onClose={() => {
                        setIsPopupOpen(false);
                        setSelectedCity(null);
                    }}
                    onSave={handleSave}
                    countryName={countryName}
                    stateName={stateName}
                    initialData={selectedCity}
                />
            )}
        </div>
    );
}

export default City;