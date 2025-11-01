import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { deleteOne, insertAndReturn, query, queryOne, updateOne } from "pages/api/supabase";
import { ICompany, IImage, IService } from "types/interfaces";
import { IBusinessHours, IHour, ILocation, IMetric, ISocial, VideoCourse, VideoElement } from "types/types";

export const usePaymentsElements = () => {
  const { user } = useUser();
  const [paymentsElements, setPaymentsElements] = useState<VideoElement[] | null>();
  const [courses, setCourses] = useState<VideoCourse[] | null>();
  const [videoElements, setVideoElements] = useState<VideoElement[] | null>();

  useEffect(() => {
    const fetchPaymentsElements = async () => {
      const paymentsElements = await query('payments', 'user', user?.id || '');
      if(paymentsElements){
        for(const payment of paymentsElements){
          let videoElement: VideoElement | VideoCourse | null = null;
          if(payment.type === 'course'){
            videoElement = await queryOne('video_course', 'id', payment.id_element);
            setCourses([...(courses || []), videoElement as VideoCourse]);
          }else{
            videoElement = await queryOne('video_element', 'id', payment.id_element);
            setVideoElements([...(videoElements || []), videoElement as VideoElement]);
          }
        }
      }
    }
    if(user && user.id){
      fetchPaymentsElements();
    }
  }, [user]);

  return { paymentsElements, courses, videoElements };
}

export const useVideoElements = () => {
  const [videoElements, setVideoElements] = useState<VideoElement[] | null>();
  const [courses, setCourses] = useState<VideoElement[] | null>();

  useEffect(() => {
    const fetchVideoElements = async () => {
      const videoElements = await query('video_element', 'element_type', 1);
      setVideoElements(videoElements);
    }
    fetchVideoElements();
  }, []);

  return { videoElements };
}

export const useCourses = () => {
  const [courses, setCourses] = useState<VideoCourse[] | null>();

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await query('video_course', 'status', 1);
      if(courses){
        for(const course of courses){
          const videos = await query('video_element', 'plans', course.id);
          course.videos = videos;
        }
        setCourses(courses);
      }
    }
    fetchCourses();
  }, []);

  return { courses };
}

export const useBusiness = () => {
    const defaultHours: IHour[] = [
      { day: 'Lunes', start: '09:00', end: '18:00', isOpen: true },
      { day: 'Martes', start: '09:00', end: '18:00', isOpen: true },
      { day: 'Miércoles', start: '09:00', end: '18:00', isOpen: true },
      { day: 'Jueves', start: '09:00', end: '18:00', isOpen: true },
      { day: 'Viernes', start: '09:00', end: '18:00', isOpen: true },
      { day: 'Sábado', start: '09:00', end: '18:00', isOpen: false },
      { day: 'Domingo', start: '09:00', end: '18:00', isOpen: false }
    ];
    const [business, setBusiness] = useState<ICompany>();
    const [socials, setSocials] = useState<ISocial>();
    const [businessHours, setBusinessHours] = useState<IBusinessHours>();
    const [services, setServices] = useState<IService[] | null>();
    const [images, setImages] = useState<IImage[] | null>();
    const [locations, setLocations] = useState<ILocation[] | null>();
    const [metrics, setMetrics] = useState<IMetric[] | null>();
    const { user } = useUser();

    const updateBusiness = async (business: ICompany) => {
      const updatedBusiness = await updateOne('business', business.id, business);
      setBusiness(updatedBusiness);
    }

    const updateBusinessHours = async (businessHours: IBusinessHours) => {
      const updatedHours = await updateOne('business_hour', businessHours.id, { hours: businessHours.hours });
      setBusinessHours(updatedHours);
    }

    const updateSocial = async (social: ISocial) => {
      const updatedSocial = await updateOne('social', social.id, social);
      setSocials(updatedSocial);
    }

    const addImage = async (image: IImage) => {
      const newImage = await insertAndReturn('slide', image);
      setImages([...(images || []), newImage]);
    }

    const deleteImage = async (image: IImage) => {
      const deletedImage = await deleteOne('slide', image.id || 0);
      if(deletedImage){
        setImages(images?.filter(i => i.id !== image.id));
      }
    }

    const fetchImages = async () => {
      const images = await query('slide', 'business_id', business?.id || 0);
      setImages(images);
    }

    const fetchLocations = async () => {
      const locations = await query('location', 'business_id', business?.id || 0);
      setLocations(locations);
    }
  

    useEffect(() => {
      const fetchBusiness = async () => {
        if (user?.unsafeMetadata?.business_id) {
          const businessId = user.unsafeMetadata.business_id.toString();
          const business = await queryOne('business', 'id', businessId);
          setBusiness(business);
          const socials = await queryOne('social', 'business_id', businessId);
          setSocials(socials);
          const businessHours = await queryOne('business_hour', 'business_id', businessId);
          setBusinessHours(businessHours);
          const servicesData = await query('service', 'business_id', business?.id || 0);
          setServices(servicesData);
          const imagesData = await query('slide', 'business_id', business?.id || 0);
          setImages(imagesData);
          const locationsData = await query('location', 'business_id', business?.id || 0);
          setLocations(locationsData);
          const metricsData = await query('metric', 'business_id', business?.id || 0);
          setMetrics(metricsData);
        }else{
          //no business let's create a new one
          const newBusiness = await insertAndReturn('business', {
            email: user?.emailAddresses[0].emailAddress,
            clerk_id: user?.id,
            contact: user?.fullName,
            apiyam_url: "http://192.168.100.3:3000/"+user?.id
          });

          if(newBusiness){
            //create socials
            const socials = await insertAndReturn('social', {
              business_id: newBusiness.id
            });
            const businessHours = await insertAndReturn('business_hour', {
              business_id: newBusiness.id,
              hours: defaultHours
            });
            setSocials(socials);
            setBusiness(newBusiness);
            setBusinessHours(businessHours);
            //update user with business_id
            await user?.update({
              unsafeMetadata: {
                business_id: newBusiness.id
              }
            });
          }
        }
      };
      if(user){
        fetchBusiness();
      }
    }, [user]);
  
    return { business, updateBusiness, socials, updateSocial, businessHours, updateBusinessHours, defaultHours, services, images, addImage, deleteImage, fetchImages, locations, fetchLocations, metrics };
  };