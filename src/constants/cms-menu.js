import { Routes } from "./routes";

export const menuList = [
  {
    text: "ראשי",
    route: Routes.cmsHome,
  },
  {
    text: "לקוחות",
    route: Routes.cmsClient,
    menus: [
      {
        text: "העלאת קובץ",
        route: Routes.cmsClientUploadFile,
      },
      {
        text: "לקוחות בהמתנה",
        route: Routes.cmsClientPendingClients,
      },
      {
        text: "לקוחות זמינים",
        route: Routes.cmsClientAvailableClients,
      },
    ],
  },
  {
    text: "טקסטים",
    route: Routes.cmsTexts,
  },
  {
    text: "מדיה",
    route: Routes.cmsMedia,
    menus: [
      {
        text: "הוספת מדיה",
        route: Routes.cmsAddMedia,
      },
    ],
  },
  {
    text: "הגדרות כלליות",
    route: Routes.cmsGeneral,
  },
];
