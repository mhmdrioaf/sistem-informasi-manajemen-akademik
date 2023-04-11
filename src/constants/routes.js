export const LANDING = "/";
export const LOGIN = "/login";
export const E_LEARNING = "/e-learning";
export const MARKETPLACE = "/marketplace";
export const DASHBOARD = "/dashboard";
export const PASSWORD_RESET = "/resetPassword";
export const PPDB = "/ppdb";

// admin routes
export const ADMIN_HOME = "/admin";
export const ADMIN_DASHBOARD = "/admin/dashboard";
export const ADMIN_STUDENTS = "/admin/siswa";
export const ADMIN_PROFILE = (userId) => {
  return `admin/profile/id=${userId}`;
};

// student routes
export const STUDENT_HOME = "/siswa";
export const STUDENT_DASHBOARD = "/siswa/dashboard";
export const STUDENT_PROFILE = (userId) => {
  return `siswa/profile/id=${userId}`;
};

// teacher routes
export const TEACHER_HOME = "/guru";
export const TEACHER_DASHBOARD = "/guru/dashboard";
