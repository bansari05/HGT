const employerMenu = [
  {
    id: 1,
    name: "Dashboard",
    icon: "la-home",
    routePath: "/employers-dashboard/dashboard",
    active: "active",
    type: "overview"
  },
  // {
  //   id: 2,
  //   name: "Company Profile",
  //   icon: "la-user-tie",
  //   routePath: "/employers-dashboard/company-profile",
  //   active: "",
  //   type: "overview"
  // },
  {
    id: 3,
    name: "Master",
    icon: "la-cc-mastercard",
    routePath: "",
    active: "active",
    type: "detail",
    subtype: [
      {
        id: 1,
        name: "Job Type",
        icon: "la-tasks",
        routePath: "/employers-dashboard/job-type-master",
        active: "",
      },
      {
        id: 2,
        name: "Qualification",
        icon: "la-graduation-cap",
        routePath: "/employers-dashboard/qualification",
        active: "",
      },
      {
        id: 3,
        name: "Categories",
        icon: "las la-sticky-note",
        routePath: "/employers-dashboard/categories",
        active: "",
      },
      {
        id: 4,
        name: "Industry",
        icon: "las la-industry",
        routePath: "/employers-dashboard/industry",
        active: "",
      },
      {
        id: 5,
        name: "country",
        icon: "la-globe",
        routePath: "/employers-dashboard/country",
        active: "",
      },
    ]
  },
  {
    id: 9,
    name: "Post a New Job",
    icon: "la-paper-plane",
    routePath: "/employers-dashboard/post-jobs",
    active: "",
    type: "overview"
  },
  {
    id: 10,
    name: "Manage Jobs",
    icon: "la-briefcase",
    routePath: "/employers-dashboard/manage-jobs",
    active: "",
    type: "overview"
  },
  {
    id: 11,
    name: "All Applicants",
    icon: "la-file-invoice",
    routePath: "/employers-dashboard/all-applicants",
    active: "",
    type: "overview"
  },
  {
    id: 12,
    name: "Blogs",
    icon: "la-list",
    routePath: "",
    active: "active",
    type: "detail",
    subtype: [
      {
        id: 1,
        name: "Post a new Blog",
        icon: "la-plus",
        routePath: "/employers-dashboard/post-blog",
        active: "",
      },
      {
        id: 2,
        name: "Manage Blogs",
        icon: "la-tasks",
        routePath: "/employers-dashboard/blog",
        active: "",
      },
    ]

  },
  {
    id: 13,
    name: "Testimonials",
    icon: "la-comments",
    routePath: "",
    active: "active",
    type: "detail",
    subtype: [
      {
        id: 1,
        name: "Add Testimonial",
        icon: "la-plus",
        routePath: "/employers-dashboard/post-testimonial",
        active: "",
      },
      {
        id: 2,
        name: "Testimonials List",
        icon: "la-tasks",
        routePath: "/employers-dashboard/testimonial",
        active: "",
      },
    ]

  },
  // {
  //   id: 12,
  //   name: "Blogs",
  //   icon: "la-list",
  //   routePath: "/employers-dashboard/blog",
  //   active: "",
  //   type: "overview"
  // },
  {
    id: 13,
    name: "Shortlisted Resumes",
    icon: "la-bookmark-o",
    routePath: "/employers-dashboard/shortlisted-resumes",
    active: "",
    type: "overview"
  },
  // {
  //   id: 13,
  //   name: "Packages",
  //   icon: "la-box",
  //   routePath: "/employers-dashboard/packages",
  //   active: "",
  //   type: "overview"
  // },
  // {
  //   id: 14,
  //   name: "Messages",
  //   icon: "la-comment-o",
  //   routePath: "/employers-dashboard/messages",
  //   active: "",
  //   type: "overview"
  // },
  {
    id: 15,
    name: "Resume Alerts",
    icon: "la-bell",
    routePath: "/employers-dashboard/resume-alerts",
    active: "",
    type: "overview"
  },
  {
    id: 16,
    name: "Contact Us",
    icon: "la-comment-o",
    routePath: "/employers-dashboard/contact-us",
    active: "",
    type: "overview"
  },
  {
    id: 17,
    name: "Change Password",
    icon: "la-lock",
    routePath: "/employers-dashboard/change-password",
    active: "",
    type: "overview"
  },
  {
    id: 18,
    name: "Logout",
    icon: "la-sign-out",
    routePath: "/",
    active: "",
    type: "overview"
  },
];
export default employerMenu