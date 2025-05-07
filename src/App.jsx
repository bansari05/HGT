
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
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="home-1" element={<HomePage1 />} />
                  
                </Route>

                <Route path="employers-dashboard" >
                    <Route path="dashboard" element={<DashboardEmploeeDBPage/>} />
                    <Route path="company-profile" element={<CompanyProfileEmploeeDBPage/>} />
                    <Route path="post-jobs" element={<PostJobsEmploeeDBPage/>} />
                    <Route path="manage-jobs" element={<ManageJobsEmploeeDBPage/>} />
                    <Route path="all-applicants" element={<AllApplicantsEmploeesPage/>} />
                    <Route path="shortlisted-resumes" element={<ShortListedResumeEmploeeDBPage/>} />
                    <Route path="packages" element={<PackageEmploeeDBPage/>} />
                    <Route path="messages" element={<MessageEmploeeDBPage/>} />
                    <Route path="resume-alerts" element={<ResumeAlertsEmploeeDBPage/>} />
                    <Route path="change-password" element={<ChangePasswordEmploeeDBPage/>} />
            
                    
                  </Route>
              </Routes>
            </BrowserRouter>

            {/* <!-- Scroll To Top --> */}
            <ScrollToTop />
          </div>
        </Provider>
     
    </>
  )
}

export default App
