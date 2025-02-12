import menuUI from "./menus/ui.menu";
import menuApps from "./menus/apps.menu";
import menuPages from "./menus/pages.menu";
import menuCharts from "./menus/charts.menu";
import menuUML from "./menus/uml.menu";
import menuLanding from "./menus/landing.menu";
import menuData from "./menus/data.menu";
import menuAi from "./menus/ai.menu";
import appsMenu from "./menus/apps.menu";

export default {
  menu: [
    {
      key: "menu.community",
      text: "community",
      items: appsMenu,
    },
    {
      key: "menu.toolkit",
      text: "toolkit",
      items: menuAi,
      icon: "mdi-chat-processing-outline"
    }
  ],
};

// export default {
//   menu: [
//     {
//       text: "",
//       key: "",
//       items: [
//         {
//           key: "menu.dashboard",
//           text: "Dashboard",
//           link: "/dashboard",
//           icon: "mdi-view-dashboard-outline",
//         },
//       ],
//     },
//     {
//       text: "chatgpt",
//       items: menuAi,
//     },
//     {
//       text: "Apps",
//       items: menuApps,
//     },
//     {
//       text: "Data",
//       items: menuData,
//     },
//     {
//       text: "Landing",
//       items: [
//         ...menuLanding,
//         // {
//         //   icon: "mdi-airplane-landing",
//         //   key: "menu.landingPage",
//         //   text: "Landing Page",
//         //   link: "/landing",
//         // },
//       ],
//     },
//     {
//       text: "UI - Theme Preview",
//       items: menuUI,
//     },
//     {
//       text: "Pages",
//       key: "menu.pages",
//       items: menuPages,
//     },
//     {
//       text: "Charts",
//       key: "menu.charts",
//       items: menuCharts,
//     },
//     {
//       text: "UML",
//       // key: "menu.uml",
//       items: menuUML,
//     },
//   ],
// };

