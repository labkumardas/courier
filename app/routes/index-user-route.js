"use strict";
import authRoutes from "./user/user-auth-route.js";
import registrationRoutes from "./user/user-registration-route.js";
import globalUserRoute from "./user/user-global-route.js";
const setupUserRoutes = (app) => {
  registrationRoutes(app);
  authRoutes(app);
  globalUserRoute(app);
};
export default setupUserRoutes;
