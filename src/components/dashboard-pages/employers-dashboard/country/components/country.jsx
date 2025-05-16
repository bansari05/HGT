import { useState } from "react";
import AddCountryModel from "./country-popup";

const Country = () => {
    // const [Country, Country] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedCountry,setSelectedCountry] = useState(null);
    const [loading, setLoading] = useState(false);
  

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
                Countrys.map((c) => (
                  <tr key={c.Country_id}>
                    <td>{c.Country_id}</td>
                    <td>{c.Country}</td>
                    <td>{c.is_active ? "Active" : "Inactive"}</td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button
                              title={c.is_active ? "Deactivate" : "Activate"}
                              onClick={() =>
                                handleToggleStatus(c.Country_id)
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
                            <button onClick={() => handleEdit(c)}>
                              <span className="la la-pencil"></span>
                            </button>
                          </li>
                          <li>
                            <button>
                              <span className="la la-trash"></span>
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
            selectedCountry(null);
          }}
          onSave={handleSave}
          initialData={selectedCountry}
        />
      )}
    </div>
  );
};

export default Country;