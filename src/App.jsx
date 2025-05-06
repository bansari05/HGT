
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
