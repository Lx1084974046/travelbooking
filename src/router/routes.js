export default [
  {
    path: "/",
    name: "userHome",
    component: () => import("../userViews/homePage.vue"),
    children: [
      {
        path: "/home",
        name: "homeScreen",
        component: () => import("../userComponents/homeScreen"),
      },
      {
        path: "/dynamic",
        name: "dynamic",
        component: () => import("../userComponents/dynamic"),
      },
      {
        path: "/travel",
        name: "travel",
        component: () => import("../userComponents/travel"),
      },
      {
        path: "/me",
        name: "me",
        component: () => import("../userComponents/me"),
      },
    ],
  },
];
