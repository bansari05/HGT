import React from "react";

const Categories = () => {
    return (
        <div className="tabs-box">
            <div className="widget-title">
                <h4>Categories</h4>
                <div className="form-group col-lg-12 col-md-12 text-right">
              <button type="submit" className="theme-btn btn-style-one"  onClick={() => {
            setCurrentJobType(null);
            setIsPopupOpen(true);
          }}>
                Add Categories
              </button>
            </div>
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
