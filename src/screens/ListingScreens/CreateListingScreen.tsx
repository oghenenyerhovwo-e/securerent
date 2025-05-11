'use client';

// modules
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// components
import {
    LoadingBox,
    Input,
    Textarea,
    Dropdown,
    Checkbox,
    FileUpload,
    FileMultipleUpload,
    CheckboxGroup,
    ThemeToggle,
    Carousel,
} from '@/components';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

// objects, functions and assets
import { useCreateListingMutation } from '@/redux/';
import {
  validateInputField,
  listingRequiredFields,
  NigerianStates,
  amenitiesData,
  authIllustrations,
  listingCategories,
} from "@/utils"

// css
import styles from '@/styles/formscreen.module.css';

const initialFormState ={
    title: '' as string,
    type: '' as string,
    description: '' as string,
    price: '' as string,
    isPriceNegotiable: false as boolean,
    country: 'Nigeria',
    state: '' as string,
    lga: '' as string,
    street: '' as string,
    address: '' as string,
    numberOfRooms: '' as string,
    numberOfBathrooms: '' as string,
    numberOfGarage: '' as string,
    isBathroomInDoors: true as boolean,
    isKitchenIndoors: true as boolean,
    featuredImg: "" as string,
    video: "" as string,
    virtualTour: '' as string,
    amenities: [] as string[],
    galleryImgs: [] as string[],
  }

const initialErrorState = {
    ...initialFormState,
    isPriceNegotiable: "",
    country: '',
    isBathroomInDoors: "",
    isKitchenIndoors: "",
    featuredImg: "",
    video: "",
    amenities: "",
    galleryImgs: "",
}

const CreateListingScreen = () => {
  const router = useRouter();

  const [createListing, { isLoading: isCreateListingLoading }] = useCreateListingMutation();

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);

  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => {
      if (type === "checkbox") {
        const isChecked = (e.target as HTMLInputElement).checked;
        return { ...prev, [name]: isChecked };
      }
      return { ...prev, [name]: value };
    });
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const customHandleChange = (name: string, value: string | string[]) => {
    setFormData(prev =>  ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const customMultipleFileHandleChange = (name: string, value: string[]) => {
    setFormData(prev =>  ({ ...prev, [name]: [...prev.galleryImgs, ...value] }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const customMultipleRemoveFileHandleChange = ( name: string, url: string, ) => {
    setFormData(prev =>  ({ ...prev, [name]: prev.galleryImgs.filter(filterUrl => filterUrl !== url) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      const {hasError, newErrors} = validateInputField(listingRequiredFields, formData)

      if (hasError) {
        setErrors(newErrors)
        return toast.error("Please fill all fields correctly")
      }

      try {
        const res = await createListing(formData).unwrap();
        toast.success(`Listing created successfully`);
        toast.success(`Redirecting to listing page...`);
        setTimeout(() => {
          router.push(`/listing/${res?.listingId}`);
        }, 5000);
      } catch (error: any) {
        toast.error(error?.data?.error || error?.message);
      } 
  };

  return (
    <>
      <div className={styles.container}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.leftContainer}>
            <h5 className={styles.header}>SecureRent</h5>
            <h3 className={styles.title}>Create a New Listing</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
              <Input 
                label="Title" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                error={errors.title} 
              />

              <Dropdown 
                label="Property Type" 
                name="type" 
                value={formData.type} 
                onChange={handleChange} 
                options={listingCategories} 
                error={errors.type} 
              />

              <Textarea 
                label="Description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                error={errors.description} 
              />

              <Input 
                label="Price (per month)" 
                name="price" 
                type="number" 
                value={formData.price} 
                onChange={handleChange} 
                error={errors.price} 
              />
            
              <Checkbox 
                label="Is Price Negotiable?" 
                name="isPriceNegotiable" 
                checked={formData.isPriceNegotiable} 
                onChange={handleChange} 
              />

                <Dropdown 
                  label="State" 
                  name="state" 
                  value={formData.state} 
                  onChange={handleChange} 
                  options={NigerianStates} 
                  error={errors.state} 
                />

              <Dropdown 
                  label="Local Government Area" 
                  name="lga" 
                  value={formData.lga} 
                  onChange={handleChange} 
                  options={NigerianStates.filter(item => item.value === formData.state)[0]?.options || [{label: "", state: ""}]} 
                  error={errors.lga} 
                />

              <Input 
                label="Street" 
                name="street" 
                value={formData.street} 
                onChange={handleChange} 
                error={errors.street} 
              />
            
              <Input 
                label="Address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                error={errors.address} 
              />

              <Dropdown 
                  label="Number of Rooms" 
                  name="numberOfRooms" 
                  value={formData.numberOfRooms} 
                  onChange={handleChange} 
                  options={[
                    {label: "1", value: 1}, 
                    {label: "2", value: 2}, 
                    {label: "3", value: 3}, 
                    {label: "4", value: 4}, 
                    {label: "5", value: 5}, 
                    {label: "6", value: 6}, 
                    {label: "7", value: 7}, 
                    {label: "8", value: 8}, 
                    {label: "9", value: 9}, 
                    {label: "10", value: 10}, 
                  ]} 
                  error={errors.numberOfRooms} 
              />

              <Dropdown 
                  label="Number of Bathrooms" 
                  name="numberOfBathrooms" 
                  value={formData.numberOfBathrooms} 
                  onChange={handleChange} 
                  options={[
                    {label: "1", value: 1}, 
                    {label: "2", value: 2}, 
                    {label: "3", value: 3}, 
                    {label: "4", value: 4}, 
                    {label: "5", value: 5}, 
                    {label: "6", value: 6}, 
                    {label: "7", value: 7}, 
                    {label: "8", value: 8}, 
                    {label: "9", value: 9}, 
                    {label: "10", value: 10}, 
                  ]} 
                  error={errors.numberOfBathrooms} 
              />

              <Dropdown 
                  label="Number of Garages" 
                  name="numberOfGarage" 
                  value={formData.numberOfGarage} 
                  onChange={handleChange} 
                  options={[
                    {label: "1", value: 1}, 
                    {label: "2", value: 2}, 
                    {label: "3", value: 3}, 
                    {label: "4", value: 4}, 
                    {label: "5", value: 5}, 
                    {label: "6", value: 6}, 
                    {label: "7", value: 7}, 
                    {label: "8", value: 8}, 
                    {label: "9", value: 9}, 
                    {label: "10", value: 10}, 
                  ]} 
                  error={errors.numberOfGarage} 
              />

              <FileUpload
                label="Upload Cover Photo"
                name="featuredImg"
                value={formData.featuredImg}
                onChange={customHandleChange}
                accept="image/jpeg, image/png, image/webp, image/gif"
                maxSize={1024 * 1024 * 2} // 2MB
                minSize={1024 * 10} // 10KB
                error={errors.featuredImg}
              />

              <FileUpload
                label="Video URL"
                name="video"
                value={formData.video}
                onChange={customHandleChange}
                accept="video/mp4, video/webm, video/ogg"
                maxSize={1024 * 1024 * 2} // 2MB
                minSize={1024 * 10} // 10KB
                error={errors.video}
              />

              <FileMultipleUpload
                label="Upload More Pictures"
                name="galleryImgs"
                value={formData.galleryImgs}
                onChange={customMultipleFileHandleChange}
                removeFile={customMultipleRemoveFileHandleChange}
                accept="image/jpeg, image/png, image/webp, image/gif"
                maxSize={1024 * 1024 * 2} // 2MB
                minSize={1024 * 10} // 10KB
                error={errors.galleryImgs}
              />

              <Input 
                label="Virtual Tour URL" 
                name="virtualTour" 
                value={formData.virtualTour} 
                onChange={handleChange} 
                error={errors.virtualTour} 
              />

              <CheckboxGroup
                label="Select amenities"
                name="amenities"
                value={formData.amenities}
                options={amenitiesData}
                onChange={customHandleChange}
              />

              <Checkbox 
                label="Is Bathroom Indoors?" 
                name="isBathroomInDoors" 
                checked={formData.isBathroomInDoors} 
                onChange={handleChange} 
              />

              <Checkbox 
                label="Is Kitchen Indoors?" 
                name="isKitchenIndoors" 
                checked={formData.isKitchenIndoors} 
                onChange={handleChange} 
              />


              <button type="submit" className="btn btn-primary" disabled={isCreateListingLoading}>
                {isCreateListingLoading ? 'Creating...' : 'Create Listing'}
              </button>
              <div>
                {isCreateListingLoading && <LoadingBox />}
              </div>
            </form>
            
          </div>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >        
          <div className={styles.rightContent}>
            <Carousel items={authIllustrations} />
          </div>
        </motion.div>
        <div className={styles.toggleContainer}>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}

export default CreateListingScreen
