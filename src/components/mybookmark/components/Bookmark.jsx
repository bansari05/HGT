import { Link } from "react-router-dom";
import jobs from "@/data/job-featured.js";
import SearchBox from "../../job-listing-pages/components/SearchBox.jsx";
import LocationBox from "../../job-listing-pages/components/LocationBox.jsx";
import Categories from "../../job-listing-pages/components/Categories.jsx";

const Bookmark = () => {
  return (
    <>
    <div className="page-title style-two">
  <div className="job-search-form">
    <h2 className="my-fav-job">My Favorite Jobs</h2>
      <div className="row">
        <div className="form-group col-lg-4 col-md-12 col-sm-12">
          <SearchBox />
        </div>
        {/* <!-- Form Group --> */}

        <div className="form-group col-lg-3 col-md-12 col-sm-12 location">
          <LocationBox />
        </div>
        {/* <!-- Form Group --> */}

        <div className="form-group col-lg-3 col-md-12 col-sm-12 location">
          <Categories />
        </div>
        {/* <!-- Form Group --> */}

        <div className="form-group col-lg-2 col-md-12 col-sm-12 text-right">
          <button type="submit" className="theme-btn btn-style-one">
            Find Jobs
          </button>
        </div>
        {/* <!-- Form Group --> */}
      </div>
    </div>
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
