"use strict";
import authRoutes from "./driver/driver-auth-route.js";
import registrationRoutes from "./driver/driver-registration-route.js";
import globalRoutes from "./driver/drive-global-route.js";
const setupRoutes = (app) => {
  registrationRoutes(app);
  authRoutes(app);
  globalRoutes(app);
};
export default setupRoutes;
