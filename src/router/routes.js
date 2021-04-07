export default [
  {
    path: "/",
    redirect: "/userHome/home",
  },
  {
    path: "/userHome",
    name: "userHome",
    component: () => import("../userViews/homePage.vue"),//路由懒加载
    children: [
      {
        path: "home",
        name: "homeScreen",
        component: () => import("../userComponents/homeScreen"),
      },
      {
        path: "dynamic",
        name: "dynamic",
        component: () => import("../userComponents/dynamic"),
      },
      {
        path: "travel",
        name: "travel",
        component: () => import("../userComponents/travel"),
      },
      {
        path: "me",
        name: "me",
        redirect: "/userHome/me/nologin",
        component: () => import("../userComponents/me"),
        children: [
          {
            path: "nologin",//*路径名应与实际路径一致
            name: "nologin",
            component: () => import("../userComponents/Model/nologin"),
          },
          {
            path: "login",
            name: "login",
            component: () => import("../userComponents/Model/login"),
          },
          {
            path: "register",
            name: "register",
            component: () => import("../userComponents/Model/register"),
          },
          {
            path: "person",
            name: "person",
            component: () => import("../userComponents/Model/person"),
          }
        ],
      },
    ],
  }
];
