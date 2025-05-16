

const Block1 = () => {
  const blockContent = [
    {
      id: 1,
      icon: "/images/resource/work-1.png",
      title: "Create Your Profile",
      text: `Sign up and build a professional profile showcasing your skills, experience, and resume.`,
    },
    {
      id: 2,
      icon: "/images/resource/work-2.png",
      title: "Explore & Apply to Jobs",
      text: `Browse jobs tailored to your interests and qualifications, then apply with ease.`,
    },
    {
      id: 3,
      icon: "/images/resource/work-3.png",
      title: "Get Shortlisted",
      text: `Our system helps connect you with employers, increasing your chances to get shortlisted and move to the next stage.`,
    },
  ];
  return (
    <>
      {blockContent.map((item) => (
        <div className="work-block col-lg-4 col-md-6 col-sm-12" key={item.id}>
          <div className="inner-box">
            <figure className="image">
              <img
               
                src={item.icon}
                alt="how it works"
              />
            </figure>
            <h5>{item.title}</h5>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Block1;
