export default [
  {
    path: "/",
    redirect: "/userHome/home",
    name: "userHome",
    component: () => import("../userViews/homePage.vue"),
    children: [
      {
        path: "/userHome/home",
        name: "homeScreen",
        component: () => import("../userComponents/homeScreen"),
      },
      {
        path: "/userHome/dynamic",
        name: "dynamic",
        component: () => import("../userComponents/dynamic"),
      },
      {
        path: "/userHome/travel",
        name: "travel",
        component: () => import("../userComponents/travel"),
      },
      {
        path: "/userHome/me",
        name: "me",
        redirect: "/userHome/me/nologin",
        component: () => import("../userComponents/me"),
        children: [
          {
            path: "/userHome/me/nologin",
            name: "nologin",
            component: () => import("../userComponents/Model/nologin"),
          },
          {
            path: "/userHome/me/login",
            name: "login",
            component: () => import("../userComponents/Model/login"),
          },
          {
            path: "/userHome/me/register",
            name: "register",
            component: () => import("../userComponents/Model/register"),
          },
          {
            path: "/userHome/me/person",
            name: "person",
            component: () => import("../userComponents/Model/person"),
          },
        ],
      },
    ],
  },
];
