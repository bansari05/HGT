import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addKeyword, addLocation } from "../../../features/filter/filterSlice";

const SearchForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchTerm = formData.get('search');
    const location = formData.get('location');
    
    // Update Redux store with search values
    dispatch(addKeyword(searchTerm));
    dispatch(addLocation(location));
    
    // Navigate to job list page
    navigate("/job-list-v1");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-lg-5 col-md-12 col-sm-12">
          <span className="icon flaticon-search-1"></span>
          <input
            type="text"
            name="search"
            placeholder="Job title, keywords, or company"
          />
        </div>

        <div className="form-group col-lg-4 col-md-12 col-sm-12 location">
          <span className="icon flaticon-map-locator"></span>
          <input 
            type="text" 
            name="location" 
            placeholder="City"
          />
        </div>

        <div className="form-group col-lg-3 col-md-12 col-sm-12 btn-box">
          <button
            type="submit"
            className="theme-btn btn-style-one"
          >
            <span className="btn-title">Find Jobs</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;