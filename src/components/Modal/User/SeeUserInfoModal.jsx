import PropTypes from 'prop-types'
import { Fragment } from 'react'
import {
    Dialog,
    Transition,
    TransitionChild,
    DialogTitle,
    DialogPanel,
} from '@headlessui/react'
import { BiUser } from 'react-icons/bi'
import { MdEmail } from 'react-icons/md'

const SeeUserInfoModal = ({ setIsOpen, isOpen, user }) => {
    // console.log(user);
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                onClose={() => setIsOpen(false)}
            >
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </TransitionChild>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center w-full'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <DialogPanel className='transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <DialogTitle
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    User Details Info
                                </DialogTitle>
                                <div className='mt-4'>
                                    <div className='flex items-center justify-center gap-4'>
                                        <img className='w-10 h-10 rounded-full' src={user?.image_url} alt="" />
                                        <div>
                                            <p className='flex items-center gap-4'><BiUser />{user?.name}</p>
                                            <p className='flex items-center gap-4'><MdEmail />{user?.email}</p>
                                        </div>
                                    </div>
                                    <p>Role:{user?.role}</p>
                                    <p>Status:{user?.status}</p>
                                    <p>Blood Group:{user?.blood_group}</p>
                                    <p>District:{user?.district}</p>
                                    <p>Upazila:{user?.upazila}</p>
                                    <p>Timestamp:{user?.timestamp}</p>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

SeeUserInfoModal.propTypes = {
    user: PropTypes.object,
    modalHandler: PropTypes.func,
    setIsOpen: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default SeeUserInfoModal