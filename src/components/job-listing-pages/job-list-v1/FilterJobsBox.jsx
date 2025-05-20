import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addDatePosted,
  addDestination,
  addKeyword,
  addLocation,
  addPerPage,
  addSalary,
  addSort,
  addTag,
  clearExperience,
  clearJobType,
} from "../../../features/filter/filterSlice";
import {
  clearDatePostToggle,
  clearExperienceToggle,
  clearJobTypeToggle,
} from "../../../features/job/jobSlice";

const FilterJobsBox = () => {
  const [jobsData, setJobsData] = useState([]);
  const dispatch = useDispatch();

  const { jobList, jobSort } = useSelector((state) => state.filter);
  const {
    keyword,
    location,
    destination,
    category,
    jobType,
    datePosted,
    experience,
    salary,
    tag,
  } = jobList || {};

  const { sort, perPage } = jobSort;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://apihgt.solvifytech.in/api/v1/Job/SelectAll", {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM`,
          },
        });

        const result = await response.json();

        if (result?.status === 1) {
          setJobsData(result.data);
        } else {
          console.error("API responded with error:", result?.message || "Unknown error");
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Filters
  const keywordFilter = (item) =>
    keyword ? item.job_title.toLowerCase().includes(keyword.toLowerCase()) : true;

  const locationFilter = (item) =>
    location
      ? `${item.city}, ${item.state}, ${item.country}`
          .toLowerCase()
          .includes(location.toLowerCase())
      : true;

  const destinationFilter = (item) => {
    const destValue = parseFloat(item.destination || 0);
    return destValue >= destination.min && destValue <= destination.max;
  };

  const categoryFilter = (item) =>
    category ? item.job_category?.toLowerCase() === category.toLowerCase() : true;

  const jobTypeFilter = (item) =>
    jobType?.length && item?.job_type
      ? jobType.includes(item.job_type.toLowerCase().replace(/\s+/g, "-"))
      : true;

  const datePostedFilter = (item) => {
    if (datePosted === "all" || datePosted === "") return true;
    const createdDate = new Date(item.created).toISOString().split("T")[0];
    return createdDate.includes(datePosted);
  };

  const experienceFilter = (item) =>
    experience?.length
      ? experience.includes(item.career_level?.toLowerCase().replace(/\s+/g, "-"))
      : true;

  const salaryFilter = (item) => {
    const salaryStr = item.salary || "";
    const salaryNumbers = salaryStr
      .replace(/[^0-9,-]/g, "")
      .split(",")
      .map((s) => parseInt(s, 10))
      .filter((n) => !isNaN(n));

    if (!salaryNumbers.length) return true;

    const minSalary = Math.min(...salaryNumbers);
    const maxSalary = Math.max(...salaryNumbers);

    return minSalary >= salary.min && maxSalary <= salary.max;
  };

  const tagFilter = (item) =>
    tag ? item.specialisms?.toLowerCase() === tag.toLowerCase() : true;

  const sortFilter = (a, b) =>
    sort === "des"
      ? new Date(b.created) - new Date(a.created)
      : new Date(a.created) - new Date(b.created);

  const filteredJobs = jobsData
    .filter(keywordFilter)
    .filter(locationFilter)
    .filter(destinationFilter)
    .filter(categoryFilter)
    .filter(jobTypeFilter)
    .filter(datePostedFilter)
    .filter(experienceFilter)
    .filter(salaryFilter)
    .filter(tagFilter)
    .sort(sortFilter);

  const paginatedJobs =
    perPage.end !== 0 ? filteredJobs.slice(perPage.start, perPage.end) : filteredJobs;

  const sortHandler = (e) => dispatch(addSort(e.target.value));
  const perPageHandler = (e) => dispatch(addPerPage(JSON.parse(e.target.value)));

  const clearAll = () => {
    dispatch(addKeyword(""));
    dispatch(addLocation(""));
    dispatch(addDestination({ min: 0, max: 100 }));
    dispatch(addCategory(""));
    dispatch(clearJobType());
    dispatch(clearJobTypeToggle());
    dispatch(addDatePosted(""));
    dispatch(clearDatePostToggle());
    dispatch(clearExperience());
    dispatch(clearExperienceToggle());
    dispatch(addSalary({ min: 0, max: 20000 }));
    dispatch(addTag(""));
    dispatch(addSort(""));
    dispatch(addPerPage({ start: 0, end: 0 }));
  };

  return (
    <>
      <div className="ls-switcher">
        <div className="show-result">
          <div className="show-1023">
            <button
              type="button"
              className="theme-btn toggle-filters"
              data-bs-toggle="offcanvas"
              data-bs-target="#filter-sidebar"
            >
              <span className="icon icon-filter"></span> Filter
            </button>
          </div>

          <div className="text">
            Show <strong>{filteredJobs.length}</strong> jobs
          </div>
        </div>

        <div className="sort-by">
          {(keyword ||
            location ||
            destination?.min !== 0 ||
            destination?.max !== 100 ||
            category ||
            jobType?.length !== 0 ||
            datePosted ||
            experience?.length !== 0 ||
            salary?.min !== 0 ||
            salary?.max !== 20000 ||
            tag ||
            sort ||
            perPage.start !== 0 ||
            perPage.end !== 0) && (
            <button
              onClick={clearAll}
              className="btn btn-danger text-nowrap me-2"
              style={{ minHeight: "45px", marginBottom: "15px" }}
            >
              Clear All
            </button>
          )}

          <select value={sort} className="form-select" onChange={sortHandler}>
            <option value="">Sort by (default)</option>
            <option value="asc">Newest</option>
            <option value="des">Oldest</option>
          </select>

          <select
            className="form-select ms-3"
            onChange={perPageHandler}
            value={JSON.stringify(perPage)}
          >
            <option value={JSON.stringify({ start: 0, end: 0 })}>All</option>
            <option value={JSON.stringify({ start: 0, end: 10 })}>10 per page</option>
            <option value={JSON.stringify({ start: 0, end: 20 })}>20 per page</option>
            <option value={JSON.stringify({ start: 0, end: 30 })}>30 per page</option>
          </select>
        </div>
      </div>

      {
      paginatedJobs.length === 0 ? (
        <p>No jobs to display</p>
      ) : (
          paginatedJobs.map((job) => (
            <div
              key={job.job_id}
              className="job-block col-lg-12 col-md-12 col-sm-12"
            >
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <img src={job.logo} alt="logo" />
                  </span>
                  <h4>
                    <a href="#">{job.job_title}</a>
                  </h4>
                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {job.company_name}
                    </li>
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {job.city}, {job.state}, {job.country}
                    </li>
                    <li>
                      <span className="icon flaticon-clock-3"></span>
                      {job.job_type}
                    </li>
                    <li>
                      <span className="icon flaticon-money"></span>
                      {job.salary}
                    </li>
                  </ul>
                  <ul className="job-other-info">
                    <li className="time">{job.career_level}</li>
                    <li className="privacy">{job.gender}</li>
                    <li className="required">{job.experience}</li>
                  </ul>
                  <button className="bookmark-btn">
                    <span className="flaticon-bookmark"></span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )
      }

      <div className="ls-show-more">
        <p>
          Show {paginatedJobs.length} of {filteredJobs.length} Jobs
        </p>
        <div className="bar">
          <span
            className="bar-inner"
            style={{
              width: `${
                filteredJobs.length > 0
                  ? (paginatedJobs.length / filteredJobs.length) * 100
                  : 0
              }%`,
            }}
          ></span>
        </div>
        <button className="show-more">Show More</button>
      </div>
    </>
  );
};

export default FilterJobsBox;
