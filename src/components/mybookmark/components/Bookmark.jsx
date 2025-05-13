import { Link } from "react-router-dom";
import jobs from "@/data/job-featured.js";

const Bookmark = () => {
  return (
    <>
    {/* Search Section */}
   
    <div className="job-search-container">
    <div className="w-100 ml-84">
            <h2>My Favorites Jobs</h2>
        </div>
  <div className="search-field">
    <i className="la la-search"></i>
    <input type="text" placeholder="Job title, keywords, or company" />
  </div>

  <div className="search-field">
    <i className="la la-map-marker"></i>
    <input type="text" placeholder="City or postcode" />
  </div>

  <div className="search-field">
    <i className="la la-briefcase"></i>
    <select  style={{ fontFamily: "Jost, sans-serif" }}>
      <option>Choose a category</option>
      <option>Development</option>
      <option>Design</option>
      <option>Marketing</option>
    </select>
  </div>

  {/* Search Button */}
  <button className="search-btn">Find Jobs</button>
</div>


{/* job section */}
      <div className="tabs-box">
        <div className="widget-title">

          <div className="chosen-outer">
            {/* <!--Tabs Box--> */}
            <select className="chosen-single form-select">
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
              <option>Last 16 Months</option>
              <option>Last 24 Months</option>
              <option>Last 5 year</option>
            </select>
          </div>
        </div>
        {/* End filter top bar */}

        {/* Start table widget content */}
        <div className="widget-content">
          <div className="table-outer">
            <div className="table-outer">
              <table className="default-table manage-job-table">
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {jobs.slice(8, 12).map((item) => (
                    <tr key={item.id}>
                      <td>
                        {/* <!-- Job Block --> */}
                        <div className="job-block">
                          <div className="inner-box">
                            <div className="content">
                              <span className="company-logo">
                                <img src={item.logo} alt="logo" />
                              </span>
                              <h4>
                                <Link to={`/job-single-v3/${item.id}`}>
                                  {item.jobTitle}
                                </Link>
                              </h4>
                              <ul className="job-info">
                                <li>
                                  <span className="icon flaticon-briefcase"></span>
                                  Segment
                                </li>
                                <li>
                                  <span className="icon flaticon-map-locator"></span>
                                  London, UK
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="status">Active</td>
                      <td>
                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button data-text="View Aplication">
                                <span className="la la-eye"></span>
                              </button>
                            </li>
                            <li>
                              <button data-text="Delete Aplication">
                                <span className="la la-trash"></span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* End table widget content */}
      </div>
    </>
  );
};

export default Bookmark;
