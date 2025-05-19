import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const Applicants = () => {
  const [candidateData, setCandidatedData] = useState([]);

  const fetchShortListed = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/Application/SelectShortListed", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const result = await response.json();
      switch (result.status) {
        case 1:
          setCandidatedData(result?.data);
          break;
        case 0:
          toast.error(result?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }

  useEffect(() => {
    fetchShortListed();
  }, []);

  const deleteApplication = async (deletedApplicationId, applicationType) => {
    try {
      const token = localStorage.getItem("authToken");
      const statusBody = {
        applicationId: deletedApplicationId,
        status: applicationType
      }
      const response = await fetch("https://apihgt.solvifytech.in/api/v1/Application/Status", {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(statusBody)
      });

      const result = await response.json();
      switch (result?.status) {
        case 1:
          toast.success(result?.message);
          fetchShortListed();
          break;
        case 0:
          toast.error(result?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }

  return (
    <>
      {candidateData?.map((candidate) => (
        <div
          className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
          key={candidate.id}
        >
          <div className="inner-box">
            <div className="content">
              {/* <figure className="image">
                <img

                  src={candidate.avatar}
                  alt="candidates"
                />
              </figure> */}
              {/* <h4 className="name">
                <Link to={`/candidates-single-v1/${candidate?.id}`}>
                  {candidate?.name}
                </Link>
              </h4> */}

              <ul className="candidate-info">
                {/* <li className="designation">{candidate.designation}</li>
                <li>
                  <span className="icon flaticon-map-locator"></span>{" "}
                  {candidate.location}
                </li>
                <li>
                  <span className="icon flaticon-money"></span> $
                  {candidate.hourlyRate} / hour
                </li> */}
              </ul>

              {/* <ul className="post-tags">
                {candidate.tags.map((val, i) => (
                  <li key={i}>
                    <a href="#">{val}</a>
                  </li>
                ))}
              </ul> */}
            </div>

            <div className="option-box">
              <ul className="option-list">
                <li>
                  <Link
                    to={`/candidates-single-v1/${candidate?.application_id}`}
                    data-text="View Aplication"
                  >
                    <span className="la la-eye"></span>
                  </Link>
                </li>
                {/* <li>
                  <button data-text="Approve Aplication">
                    <span className="la la-check"></span>
                  </button>
                </li>
                <li>
                  <button data-text="Reject Aplication">
                    <span className="la la-times-circle"></span>
                  </button>
                </li> */}
                <li>
                  <button data-text="Delete Aplication" onClick={() => deleteApplication(candidate?.application_id, "Deleted")}>
                    <span className="la la-trash"></span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Applicants;
