import React from "react";

const Categories = () => {
    return (
        <div className="tabs-box">
            <div className="widget-title">
                <h4>Categories</h4>
                <button 
                    style={{
                        padding: "10px",
                        height: "40px",
                        borderRadius: "4px",
                        backgroundColor: "#ebf5ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease-in-out",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#047d3e")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ebf5ff")}
                    onClick={() => {
                        setCurrentJobType(null);
                        setIsPopupOpen(true);
                    }}
                >
                    <i
                        className="la la-plus"
                        style={{
                            fontSize: "18px",
                            color: "#04598b",
                        }}
                    > Add </i>
                </button>
            </div>

            <div className="widget-content">
                <div className="table-outer">
                    <table className="default-table manage-job-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Job Category Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {jobTypes.map((item) => (
                <tr key={item.job_type_id}>
                  <td>{item.job_type_id}</td>
                  <td>{item.job_type}</td>
                  <td>{item.is_active ? "Active" : "Inactive"}</td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                          <button
                            data-text="View Application"
                            title={item.is_active ? "Deactivate" : "Activate"}
                            onClick={() => handleToggleStatus(item)}
                          >
                            <span className={item.is_active ? "la la-eye-slash" : "la la-eye"}></span>
                          </button>


                        </li>
                        <li>
                          <button
                            data-text="Edit Application"
                            onClick={() => handleEdit(item.job_type_id)}
                          >
                            <span className="la la-pencil"></span>
                          </button>
                        </li>
                        <li>
                          <button
                            data-text="Delete Application"
                          >
                            <span className="la la-trash"></span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))} */}
                            {/* {jobTypes.length === 0 && ( */}
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center" }}>
                                    No Category found.
                                </td>
                            </tr>
                            {/* )} */}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default Categories
