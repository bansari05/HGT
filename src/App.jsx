import Aos from "aos";
import "aos/dist/aos.css";
import "./styles/index.scss";
import { useEffect } from "react";
import ScrollToTop from "./components/common/ScrollTop";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "react-toastify/dist/ReactToastify.css";

if (typeof window !== "undefined") {
  import("bootstrap");
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";
import HomePage1 from "./pages/home/home-1";
import DashboardEmploeeDBPage from "./pages/employers-dashboard/dashboard";
import CompanyProfileEmploeeDBPage from "./pages/employers-dashboard/company-profile";
import PostJobsEmploeeDBPage from "./pages/employers-dashboard/post-jobs";
import ManageJobsEmploeeDBPage from "./pages/employers-dashboard/manage-jobs";
import AllApplicantsEmploeesPage from "./pages/employers-dashboard/all-applicants";
import ShortListedResumeEmploeeDBPage from "./pages/employers-dashboard/shortlisted-resumes";
import PackageEmploeeDBPage from "./pages/employers-dashboard/packages";
import MessageEmploeeDBPage from "./pages/employers-dashboard/messages";
import ResumeAlertsEmploeeDBPage from "./pages/employers-dashboard/resume-alerts";
import ChangePasswordEmploeeDBPage from "./pages/employers-dashboard/change-password";
import JobTypeMasterDBPage from "./pages/employers-dashboard/job-type-master";
import JobListPage1 from "./pages/job-list/job-list-v1";
import JobSingleDynamicV1 from "./pages/job-single/job-single-v1";

import RegisterPage from "./pages/others/register";
import BookmarkPage from "./pages/mybookmark/Bookmark";
import ProtectedRoute from "./components/ProtectedRoute";
import CategoriesPage from "./pages/employers-dashboard/categories";
import QualificationPage from "./pages/employers-dashboard/qualification";

import CandidateSingleDynamicV1 from "./pages/candidates-single/candidates-single-v1"
import UserPage from "./pages/User";

import IndustriesPage from "./pages/employers-dashboard/industry";
import AboutPage from "./pages/others/about";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1400,
      once: true,
    });
  }, []);

  return (
    <>
    <Provider store={store}>
      <div className="page-wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home-1" element={<HomePage1 />} />
            <Route path="/about" element={<AboutPage />}/>

            {/* Admin-only routes */}
            <Route
              path="employers-dashboard/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="dashboard" element={<DashboardEmploeeDBPage />} />
                    <Route path="company-profile" element={<CompanyProfileEmploeeDBPage />} />
                    <Route path="post-jobs" element={<PostJobsEmploeeDBPage />} />
                    <Route path="post-jobs/:jobId" element={<PostJobsEmploeeDBPage />} />
                    <Route path="manage-jobs" element={<ManageJobsEmploeeDBPage />} />
                    <Route path="all-applicants" element={<AllApplicantsEmploeesPage />} />
                    <Route path="shortlisted-resumes" element={<ShortListedResumeEmploeeDBPage />} />
                    <Route path="packages" element={<PackageEmploeeDBPage />} />
                    <Route path="messages" element={<MessageEmploeeDBPage />} />
                    <Route path="resume-alerts" element={<ResumeAlertsEmploeeDBPage />} />
                    <Route path="change-password" element={<ChangePasswordEmploeeDBPage />} />
                    <Route path="categories" element={<CategoriesPage/>} />
                    <Route path="qualification" element={<QualificationPage/>} />
                    <Route path="job-type-master" element={<JobTypeMasterDBPage />} />
                    <Route path="industry" element={<IndustriesPage />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

              <Route path="candidates-single-v1/:applicationId" element={<CandidateSingleDynamicV1 />} />
              <Route path="job-list-v1" element={<JobListPage1 />} />
              <Route path="job-single-v1/:id" element={<JobSingleDynamicV1 />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="mybookmark/:jobId" element={<BookmarkPage />} />
              <Route path="my-profile" element={<UserPage />} />
            </Routes>
          </BrowserRouter>

          {/* <!-- Scroll To Top --> */}
          <ScrollToTop />
        </div>
      </Provider>
    </>
  );
}

export default App;
