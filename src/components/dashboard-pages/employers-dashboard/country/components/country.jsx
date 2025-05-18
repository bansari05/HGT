import { useState , useEffect} from "react";
import AddCountryModel from "./country-popup";
import { useNavigate } from "react-router-dom";

const Country = () => {
    const [Country, setCountry] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedCountry,setSelectedCountry] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFetchStates  = async (countryId) => {
      navigate(`/employers-dashboard/state/${countryId}`);
    }

    const fetchCountry= async () => {
      // setLoading(true);
      try {
        const response = await fetch(
          "https://apihgt.solvifytech.in/api/v1/Country/SelectAll",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjoxIiwiZXhwIjoxNzQ3MzgwNzc4LCJpYXQiOjE3NDczNzg5Nzh9.ddzA_MeIScaOfC5TO8GToY3CoFYUOjeK95fVF8HHn5s",
            },
          }
        );
  
        const result = await response.json();
        setCountry(result.data || []);
      } catch (error) {
        console.error("Error fetching qualifications:", error.message);
        // alert("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };
  
    const handleEdit = (country) => {
      setSelectedCountry(country);
      setIsPopupOpen(true);
    };

    const handleSave = async (formData) => {
      try {
        const isEdit = selectedCountry !== null;
        const url = isEdit
          ? "https://apihgt.solvifytech.in/api/v1/Country/Update"
          : "https://apihgt.solvifytech.in/api/v1/Country/Add";
    
        const method = isEdit ? "PUT" : "POST";
    
        const bodyData = isEdit
          ? {
              countryId: selectedCountry.country_id, 
              country: formData.country,
            }
          : {
              country: formData.country,
            };
    
        const response = await fetch(url, {
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
    
        if (response.ok) {
          // alert(isEdit ? "Country updated successfully!" : "Country added successfully!");
          setIsPopupOpen(false);
          setSelectedCountry(null);
          fetchCountry();
        } else {
          console.warn(result.message || "Failed to save country");
        }
      } catch (error) {
        console.error("Save Country Error:", error);
        // alert("Something went wrong while saving the country.");
      }
    };
    
    const handleToggleStatus = async (countryId) => {
      try {
        const response = await fetch("https://apihgt.solvifytech.in/api/v1/Country/Status", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjoxIiwiZXhwIjoxNzQ3MzgwNzc4LCJpYXQiOjE3NDczNzg5Nzh9.ddzA_MeIScaOfC5TO8GToY3CoFYUOjeK95fVF8HHn5s",
          },
          body: JSON.stringify({ countryId }),
        });
    
        const result = await response.json();
    
        if (response.ok) {
          // alert("Status updated successfully!");
          fetchCountry(); 
        } else {
          console.warn(result.message || "Failed to update status.");
        }
      } catch (error) {
        console.error("Status toggle error:", error.message);
        // alert("Something went wrong while toggling status.");
      }
    };
   
     useEffect(() => {
      fetchCountry();
      }, []);


  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Country</h4>
        <div className="form-group text-right">
          <button
            type="button"
            className="theme-btn btn-style-one"
            onClick={() => {
              setSelectedCountry(null);
              setIsPopupOpen(true);
            }}
          >
            Add Country
          </button>
        </div>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Country Name</th>
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
              ) : Country.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Country found
                  </td>
                </tr>
              ) : (
                Country.map((c) => (
                  <tr key={c.country_id}>
                    <td>{c.country_id}</td>
                    <td>{c.country}</td>
                    <td>{c.is_active ? "Active" : "Inactive"}</td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button
                              data-text="Change Status"
                              title={c.is_active ? "Deactivate" : "Activate"}
                              onClick={() =>
                                handleToggleStatus(c.country_id)
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
                            <button data-text="Edit Country" onClick={() => handleEdit(c)}>
                              <span className="la la-pencil"></span>
                            </button>
                          </li>
                          <li>
                            <button 
                              data-text="Fetch States" 
                              onClick={() => handleFetchStates(c.country_id)}
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
        <AddCountryModel
          onClose={() => {
            setIsPopupOpen(false);
            setSelectedCountry(null);
          }}
          onSave={handleSave}
          initialData={selectedCountry}
        />
      )}
    </div>
  );
};

export default Country;