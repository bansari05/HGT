const WorkTogether = () => {
    
  return (
    <section className="call-to-action">
      <div className="auto-container">
        <div className="outer-box" data-aos="fade-up">
          <div className="content-column">
            <div className="sec-title">
              <h2>Let’s Work Together</h2>
              <div className="text">
                Whether you need 1 employee or 1,000, Hire Global Talent is here to help. <br /> Post a job with us or request staff today — we’ll handle the rest.
                {/*  CVs in our database. */}
              </div>
              <a href="#" className="theme-btn btn-style-one bg-blue">
                <span className="btn-title">Contact Us</span>
              </a>
            </div>
          </div>
          {/* End .content-column */}

          <div
            className="image-column"
            style={{ backgroundImage: " url(images/resource/image-1.png)" }}
          >
            <figure className="image">
              <img
               
                src="/images/resource/image-1.png"
                alt="resource"
              />
            </figure>
          </div>
          {/* End .image-column */}
        </div>
      </div>
    </section>
  );
};

export default WorkTogether;