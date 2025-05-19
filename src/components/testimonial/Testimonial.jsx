import { useEffect, useState } from "react";
import Slider from "react-slick";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    center: true,
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          "https://apihgt.solvifytech.in/api/v1/Testimonial/SelectActive",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaXBBZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsImV4cCI6MTc0Njc2ODkyOSwiaWF0IjoxNzQ2NzY3MTI5fQ.iGxoXTkBCDs9_PVYc_uiGufysBkBf-jk59H0-GBlACM",
            },
          }
        );

        const data = await response.json();
        
        if (data.status === 1 && data.data.length > 0) {
          setTestimonials(data.data);
        } else {
          setError(new Error("No testimonials found"));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) return <div className="text-center">Loading testimonials...</div>;
  if (error) return <div className="text-center text-danger">Error: {error.message}</div>;

  return (
    <Slider {...settings} arrows={false}>
      {testimonials.map((testimonial) => (
        <div className="testimonial-block" key={testimonial.testimonial_id}>
          <div className="inner-box">
            <h4 className="title">{testimonial.title}</h4>
            <div className="text">{testimonial.description}</div>
            <div className="info-box">
              <div className="thumb">
                <img
                  src={`https://apihgt.solvifytech.in/${testimonial.image}`}
                  alt={testimonial.name}
                />
              </div>
              <h4 className="name">{testimonial.name}</h4>
              <span className="designation">{testimonial.designation}</span>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonial;