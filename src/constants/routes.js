export const LANDING = "/";
export const MARKETPLACE = "/marketplace";
export const MARKETPLACE_CATEGORY = "/marketplace/category/";
export const LOGIN = "/login";
export const PASSWORD_RESET = "/resetPassword";
export const REGISTER = "/register";

// admin routes
export const ADMIN_HOME = "/admin";
export const ADMIN_DASHBOARD = "/admin/dashboard";
export const ADMIN_STUDENTS = "/admin/siswa";

// authenticated user routes
export const USER_HOME = "/user"
export const USER_CART = "/user/cart"
export const USER_PROFILE = "/user/profile"

// seller routes
export const SELLER_HOME = "/seller";

export const PRODUCT_DETAIL = (productId) => `/product/${productId}`;
