import "./App.css";
import {Route,Routes} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenRoute from "./components/core/Auth/OpenRoute"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import MyProfile from "./components/core/Dashboard/MyProfile/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from './pages/Error';
import Wishlist from "./components/core/Dashboard/Wishlist/Wishlist";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses/EnrolledCourses";
import PurchaseHistory from "./components/core/Dashboard/PurchaseHistory";
import Settings from "./components/core/Dashboard/Settings/Settings";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import MyCourses from "./components/core/Dashboard/MyCoursePage/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import Cart from "./components/core/Dashboard/Cart";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import { InstructorDashboard } from "./components/core/Dashboard/InstructorDashboard";



function App() {
  const {user} = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>

        {/* Home path */}
        <Route path="/" element={<Home/>}/>
        {/* About us page path */}
        <Route path="/about" element={<About/>}/>
        {/* Contact us page path */}
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="/catalog/:catalogName" element={<Catalog/>}/>

        {/* ------------------ Auth --------------- */}
        <Route path="/login" element={
          <OpenRoute>
            <Login/>
          </OpenRoute>
        }/>
        <Route path="/signup" element={
          <OpenRoute>
            <Signup/>
          </OpenRoute>
        }/>
        <Route path="/forgot-password" element={
          <OpenRoute>
            <ForgotPassword/>
          </OpenRoute>
        }/>
        <Route path="/update-password/:id" element={
          <OpenRoute>
            <UpdatePassword/>
          </OpenRoute>
        }/>
        <Route path="/verify-email" element={
          <OpenRoute>
            <VerifyEmail/>
          </OpenRoute>
        }/>

        {/* Dashboard paths */}
        <Route element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }>
            <Route path="dashboard/my-profile" element = {<MyProfile/>}/>
            <Route path='dashboard/settings' element={<Settings/>}/>

            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path='dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
                <Route path='dashboard/wishlist' element={<Wishlist/>}/>
                <Route path='dashboard/purchase-history' element={<PurchaseHistory/>}/>
                <Route path='dashboard/cart' element={<Cart/>}/>
                
              </>
            )}
            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path='dashboard/my-courses' element={<MyCourses/>}/>
                <Route path='dashboard/add-course' element={<AddCourse/>}/>
                <Route path='dashboard/instructor' element={<InstructorDashboard/>}/>
                <Route path='dashboard/edit-course/:courseId' element={<EditCourse/>}/>
              </>
            )}
        </Route>

        <Route element={
          <PrivateRoute >
            <ViewCourse />
          </PrivateRoute>
        }>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                 />
              </>
            )
          }
        </Route>
        
        {/* Invalid Path */}
        <Route path="*" element={<Error/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
