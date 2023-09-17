const BASE_URL = process.env.REACT_APP_BASE_URL;

const BASE_AUTH = BASE_URL + "/auth/"
const BASE_PROFILE = BASE_URL + "/profile/"
const BASE_COURSE = BASE_URL + "/course/"

// authorization end points
export const authEndpoints = {
    SEND_OTP_API : BASE_AUTH + "sendotp",
    SIGNUP_API : BASE_AUTH + "signup",
    LOGIN_API : BASE_AUTH + "login",
    RESET_PASS_TOKEN_API : BASE_AUTH + "reset-password-token",
    RESET_PASSWORD_API : BASE_AUTH + "reset-password",
}

// Profile end points
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_PROFILE + "getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_PROFILE + "getEnrolledCourses",
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_COURSE + "getAllCourses",
    COURSE_DETAILS_API: BASE_COURSE + "getCourseDetails",
    EDIT_COURSE_API: BASE_COURSE + "updateCourse",
    COURSE_CATEGORIES_API: BASE_COURSE + "showAllCategories",
    CREATE_COURSE_API: BASE_COURSE + "createCourse",
    CREATE_SECTION_API: BASE_COURSE + "addSection",
    CREATE_SUBSECTION_API: BASE_COURSE + "addSubSection",
    UPDATE_SECTION_API: BASE_COURSE + "updateSection",
    UPDATE_SUBSECTION_API: BASE_COURSE + "updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_COURSE + "getInstructorCourses",
    DELETE_SECTION_API: BASE_COURSE + "deleteSection",
    DELETE_SUBSECTION_API: BASE_COURSE + "deleteSubSection",
    DELETE_COURSE_API: BASE_COURSE + "deleteInstructorCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_COURSE + "getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_COURSE + "updateCourseProgress",
    CREATE_RATING_API: BASE_COURSE + "createRating",
}
export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_COURSE + "getReviews",
}
// CATALOG PAGE DATA
export const catalogData = {
    CATALOGPAGEDATA_API: BASE_COURSE + "getCategoryPageDetails",
}

// CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_PROFILE + "updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_PROFILE + "updateProfile",
    CHANGE_PASSWORD_API: BASE_AUTH + "changepassword",
    DELETE_PROFILE_API: BASE_PROFILE + "deleteProfile",
}