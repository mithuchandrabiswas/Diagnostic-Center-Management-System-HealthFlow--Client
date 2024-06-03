import { BsFillHouseAddFill } from "react-icons/bs";
import MenuItem from "./MenuItem";


const AdminMenu = () => {
    return (
        <>
            {/* Statistics */}
            <MenuItem
                                label={'Statistics'}
                                address={'/dashboard/statistics'}
                                icon={BsFillHouseAddFill}
                            />

                            {/* Add Test */}
                            <MenuItem
                                label={'Add Test'}
                                address={'add-test'}
                                icon={BsFillHouseAddFill}
                            />

                            {/* Add Banner */}
                            <MenuItem
                                label={'Add Banner'}
                                address={'add-banner'}
                                icon={BsFillHouseAddFill}
                            />

                            {/* Manage Users */}
                            <MenuItem
                                label={'Manage Users'}
                                address={'manage-users'}
                                icon={BsFillHouseAddFill}
                            />

                            {/* Manage Appointments */}
                            <MenuItem
                                label={'Manage Appointments'}
                                address={'manage-appointments'}
                                icon={BsFillHouseAddFill}
                            />

                            {/* Manage Tests */}
                            <MenuItem
                                label={'Manage Tests'}
                                address={'manage-tests'}
                                icon={BsFillHouseAddFill}
                            />
        </>
    );
};

export default AdminMenu;