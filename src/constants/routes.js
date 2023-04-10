export const LANDING = "/";
export const LOGIN = "/login";
export const E_LEARNING = "/lms";
export const MARKETPLACE = "/marketplace";
export const DASHBOARD = "/dashboard";
export const PASSWORD_RESET = "/resetPassword";

// admin routes
export const ADMIN_HOME = "/admin";
export const ADMIN_DASHBOARD = "/admin/dashboard";
export const ADMIN_STUDENTS = "/admin/students";
export const ADMIN_PROFILE = (userId) => {
  return `admin/profile/id=${userId}`;
};
