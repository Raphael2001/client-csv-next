const BaseRoutes = {
  root: "/",
  cms: "/cms/content",
  cmsLogin: "/cms/login",
};

const Routes = {
  home: BaseRoutes.root + "home",
  cmsLogin: BaseRoutes.cmsLogin,
  cmsTexts: BaseRoutes.cms + "/texts",
  cmsMedia: BaseRoutes.cms + "/media",
  cmsAddMedia: BaseRoutes.cms + "/media" + "/addNewMedia",
  cmsGeneral: BaseRoutes.cms + "/general",
  cmsHome: BaseRoutes.cms + "/main",
  cmsClient: BaseRoutes.cms + "/clients",
  cmsClientUploadFile: BaseRoutes.cms + "/clients" + "/uploadfile",
  cmsClientPendingClients: BaseRoutes.cms + "/clients" + "/pendingclients",
  cmsClientAvailableClients: BaseRoutes.cms + "/clients" + "/available",
};

export { BaseRoutes, Routes };
