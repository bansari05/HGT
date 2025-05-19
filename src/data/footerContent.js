const footerContent = [
  {
    id: 1,
    title: "For Candidates",
    menuList: [
      { name: "Browse Jobs", route: "/job-list-v1" },
      { name: "Browse Categories", route: "/job-single-v1" },
      { name: "My Bookmarks",route: "/mybookmark"},
    ],
  },
  {
    id: 2,
    title: "For Employers",
    menuList: [
      { name: "Employer Dashboard", route: "/employers-dashboard/dashboard" },
      { name: "Add Job", route: "/employers-dashboard/post-jobs" },
    ],
  },
  {
    id: 3,
    title: "About Us",
    menuList: [
      { name: "About Us", route: "/about" },
      { name: "Blog", route: "/blog" },
      { name: "Contact", route: "/contact" },
    ],
  },
  {
    id: 4,
    title: "Helpful Resources",
    menuList: [
      { name: "Site Map", route: "/" },
      { name: "Terms of Use", route: "/terms" },

    ],
  },
];
export default footerContent