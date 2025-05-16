

const Address = () => {
  const addressContent = [
    {
      id: 1,
      iconName: "placeholder",
      title: "Address",
      text: (
        <>
          Unit 16, 83 Kennedy Rd South,
          <br /> Brampton, ON, L6W 3E1, Canada.
        </>
      ),
    },
    {
      id: 2,
      iconName: "smartphone",
      title: "Call Us",
      text: (
        <>
          <a href="tel:+19055660004" className="phone">
            +1 (905) 566-0004
          </a>
        </>
      ),
    },
    {
      id: 3,
      iconName: "letter",
      title: "Email",
      text: (
        <>
          {" "}
          <a href="mailto:vipin@visamastercanada.com">vipin@visamastercanada.com</a>
        </>
      ),
    },
  ];
  return (
    <>
      {addressContent.map((item) => (
        <div
          className="contact-block col-lg-4 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className="inner-box">
            <span className="icon">
              <img
               
                src={`/images/icons/${item.iconName}.svg`}
                alt="icon"
              />
            </span>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Address;
