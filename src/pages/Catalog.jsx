import React, { useEffect, useState } from 'react'
import Footer from '../components/Common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { courseEndpoints } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentsData';
import CourseCard from '../components/core/Catalog/CourseCard';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from 'react-redux';
import Error from "./Error"

const Catalog = () => {

    const {loading} = useSelector((state) => state.profile)
    const {catalogName} = useParams();
    const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState(null);

    // fetch all categories
    useEffect(() => {
        const getCategories = async () => {
            const res = await apiConnector("GET", courseEndpoints.COURSE_CATEGORIES_API);
            const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);
            } catch (error) {
                console.log(error);
            }
        }
        if(categoryId != null) getCategoryDetails();
    },[categoryId]);

    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
    }

    if (!loading && !catalogPageData.success) {
        return <Error />
    }

  return (
    <div className='text-white'>
      {/* Hero Section */}
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      <div>
        {/* Section 1 */}
        <div>
            <div>Courses to get you started</div>
            <div className='flex gap-x-3'>
                <p>Most Popular</p>
                <p>New</p>
            </div>
            <div>
                <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
            </div>
        </div>

        {/* Section 2 */}
        <div>
            <p>Top courses in {catalogPageData?.data?.selectedCategory?.name}</p>
            <div>
                <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses}/>
            </div>
        </div>

        {/* Section 3 */}
        <div>
            <p>Frequently Bought</p>
            <div className='py-8'>

                <div className='grid grid-cols-1 lg:grid-cols-2'>

                    {
                        catalogPageData?.data?.mostSellingCourses?.slice(0.4).map((course,index) => (
                            <CourseCard course={course} key={index} Height = {"h-[400px]"}/>
                        ))
                    }

                </div>

            </div>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default Catalog
