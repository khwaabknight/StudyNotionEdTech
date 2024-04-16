import { toast } from "react-hot-toast"
import { setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser,setLoading } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints,settingsEndpoints } from "../apis"

const {
    // GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DATA_API
} = profileEndpoints;
const {UPDATE_DISPLAY_PICTURE_API, UPDATE_PROFILE_API, CHANGE_PASSWORD_API, DELETE_PROFILE_API} = settingsEndpoints;

export function updateDisplayPicture(token,formData){
    return async (dispatch) => {
        const toastId = toast.loading('Uploading file ...');
        setLoading(true)

        try {
            const response = await apiConnector('PUT',
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                }
            ).then((response) => {
                console.log('update display picture response ', response)
                if (!response.data.success) {
                    throw new Error(response.data.message)
                }
                toast.success("Display Picture Updated Successfully")
                dispatch(setUser(response.data.data))
            }).catch((error) => console.log(error))

            return response
            
        } catch (error) {
            console.log("UPDATE_DISPLAY_PICTURE_API ERROR............", error)
            toast.error("Could Not Update Display Picture")
        }
        setLoading(false)
        toast.dismiss(toastId)
    }
}

export function updateProfile(token,formData) {
    return async(dispatch) => {
        const toastId = toast.loading('Updating Profile Information ...');
        setLoading(true);
        try {
            const response = await apiConnector('PUT',
                UPDATE_PROFILE_API,
                formData,
                {
                    "Authorization": `Bearer ${token}`,
                }
            );
            console.log('Update profile response', response);
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Profile details update successfully")
            dispatch(setUser(response.data.userDetails))
        } catch (error) {
            console.log("UPDATE_PROFILE_API ERROR............", error)
            toast.error("Could Not Update Picture Information")
        }

        setLoading(false)
        toast.dismiss(toastId)
    }

}

export function changePassword(token,oldPassword,newPassword,newConfirmPassword,navigate) {
    return async(dispatch) => {
        const toastId = toast.loading('Updating Profile Information ...');
        setLoading(true);

        try {
            const data = {
                oldPassword,
                newPassword,
                newConfirmPassword,
            }
            const response = await apiConnector('POST',
                CHANGE_PASSWORD_API,
                data,
                {
                    "Authorization": `Bearer ${token}`,
                }
            );
            console.log('Update profile response', response);
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Password updated successfully")
            dispatch(setToken(null))
            dispatch(setUser(null))
            dispatch(resetCart())
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            toast.success("Please Log in again")
            navigate('/login')
        } catch (error) {
            console.log("CHANGE_PASSWORD_API ERROR............", error)
            toast.error("Could Not Change Password")
        }

        setLoading(false)
        toast.dismiss(toastId)
    }
}

export function deleteAccount(token,navigate) {
    return async(dispatch) => {
        const toastId = toast.loading('Updating Profile Information ...');
        setLoading(true);

        try {
            const response = await apiConnector('DELETE',
                DELETE_PROFILE_API,
                {},
                {
                    "Authorization": `Bearer ${token}`,
                }
            );
            console.log('Delete Account response', response);
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Account deleted successfully")
            dispatch(setToken(null))
            dispatch(setUser(null))
            dispatch(resetCart())
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            navigate('/')
        } catch (error) {
            console.log("DELETE_PROFILE_API ERROR............", error)
            toast.error("Could Not Delete Account")
        }

        setLoading(false)
        toast.dismiss(toastId)
    }
}

export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await apiConnector(
        "GET",
        GET_USER_ENROLLED_COURSES_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("GET_USER_ENROLLED_COURSES_API API RESPONSE............",response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
      toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET",GET_INSTRUCTOR_DATA_API,null,{Authorization: `Bearer ${token}`,});

        console.log("Get instructor dashboard api response",response);
        result = response?.data?.courses
        
    } catch (error) {
        console.log("Get instructor dashboard api error",error);
        toast.error("Could not get Istructor Data");
    }
    toast.dismiss(toastId);
    return result;
}