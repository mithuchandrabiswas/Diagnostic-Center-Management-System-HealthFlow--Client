import PropTypes from 'prop-types'
import { Fragment, useState, useEffect } from 'react'
import {
  Dialog,
  Transition,
  DialogTitle,
} from '@headlessui/react'
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import useAuth from '../../../hooks/useAuth'
import { imageUpload } from '../../../Utils/imageUrl'

const UpdateUserProfile = ({ setIsOpen, isOpen, userInfo }) => {
  const axiosPublic = useAxiosPublic()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const { setLoading } = useAuth()
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedDistrictName, setSelectedDistrictName] = useState('')
  const [filteredUpazilas, setFilteredUpazilas] = useState([])

  // Fetch districts and upazilas
  const { data: allDistrict = [], isLoading } = useQuery({
    queryKey: ['districts'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/districts')
      return data
    }
  })

  const { data: allUpazila = [] } = useQuery({
    queryKey: ['upazilas'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/upazilas')
      return data
    }
  })

  // Pre-fill form with user data
  useEffect(() => {
    if (userInfo) {
      setValue("name", userInfo.name)
      setValue("email", userInfo.email)
      setValue("blood_group", userInfo.blood_group)
      setValue("district", userInfo.district_id)
      setSelectedDistrict(userInfo.district_id)
      setSelectedDistrictName(userInfo.district)
      setFilteredUpazilas(allUpazila.filter(upazila => upazila.district_id === userInfo.district_id))
      setValue("upazila", userInfo.upazila)
    }
  }, [userInfo, setValue, allUpazila])

  // Handle district change
  const handleDistrictChange = (event) => {
    const districtId = event.target.value
    const districtName = event.target.options[event.target.selectedIndex].text
    setSelectedDistrict(districtId)
    setSelectedDistrictName(districtName)
    setFilteredUpazilas(allUpazila.filter(upazila => upazila.district_id === districtId))
  }

  // Handle form submission
  const handleUpdateSubmit = async (data) => {
    const { name, email, image, blood_group, upazila } = data

    try {
      setLoading(true)
      let image_url = userInfo.image_url
      if (image && image[0]) {
        image_url = await imageUpload(image[0])
      }

      const userData = {
        name,
        email,
        image_url,
        blood_group,
        district: selectedDistrictName,
        upazila,
      }
      await axiosPublic.put(`/user/update/${userInfo.email}`, userData)

      toast.success('User profile updated successfully')
      setIsOpen(false) // Close the modal on successful update
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle as='h3' className='text-lg font-medium text-center leading-6 text-gray-900'>
                  Update User Role
                </DialogTitle>
                <div className='mt-4 w-full'>
                  <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(handleUpdateSubmit)} className="card-body">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Name</span>
                        </label>
                        <input
                          type="text"
                          defaultValue={userInfo?.name}
                          {...register("name", { required: true })}
                          placeholder="Name"
                          className="input input-bordered input-sm"
                        />
                        {errors.name && <span className="text-red-600">Name is required</span>}
                      </div>
                      <div className="form-control">
                        <label htmlFor='image' className='label'>
                          <span className="label-text">Select Image</span>
                        </label>
                        <input
                          type='file'
                          id='image'
                          accept='image/*'
                          {...register("image")}
                          className="input input-sm"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Email</span>
                        </label>
                        <input
                          type="email"
                          defaultValue={userInfo?.email}
                          {...register("email", { required: true })}
                          placeholder="Email"
                          disabled
                          className="input input-bordered input-sm"
                        />
                        {errors.email && <span className="text-red-600">Email is required</span>}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Blood Group</span>
                        </label>
                        <select {...register("blood_group", { required: true })} className="select select-bordered select-sm" defaultValue={userInfo?.blood_group}>
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                        {errors.blood_group && <span className="text-red-600">Blood group is required</span>}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">District</span>
                        </label>
                        <select
                          {...register("district", { required: true })}
                          className="select select-bordered select-sm"
                          onChange={handleDistrictChange}
                          defaultValue={userInfo?.district}
                        >
                          <option value="">Select District</option>
                          {allDistrict.map((district) => (
                            <option key={district.id} value={district.id}>{district.name}</option>
                          ))}
                        </select>
                        {errors.district && <span className="text-red-600">District is required</span>}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Upazila</span>
                        </label>
                        <select {...register("upazila", { required: true })} className="select select-bordered select-sm" defaultValue={userInfo?.upazila}>
                          <option value="">Select Upazila</option>
                          {filteredUpazilas.map((upazila) => (
                            <option key={upazila.id} value={upazila.name}>{upazila.name}</option>
                          ))}
                        </select>
                        {errors.upazila && <span className="text-red-600">Upazila is required</span>}
                      </div>
                      <div className="form-control mt-6">
                        <input className="btn btn-sm" type="submit" value="Update Profile" />
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

UpdateUserProfile.propTypes = {
  userInfo: PropTypes.object.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default UpdateUserProfile
