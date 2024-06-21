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
                label={'All Users'}
                address={'manage-users'}
                icon={BsFillHouseAddFill}
            />

            {/* Manage Appointments */}
            <MenuItem
                label={'Reservation'}
                address={'manage-appointments'}
                icon={BsFillHouseAddFill}
            />

            {/* Manage Tests */}
            <MenuItem
                label={'All Tests'}
                address={'manage-tests'}
                icon={BsFillHouseAddFill}
            />

            {/* Manage Banner */}
            <MenuItem
                label={'All Banners'}
                address={'manage-banner'}
                icon={BsFillHouseAddFill}
            />
        </>
    );
};

export default AdminMenu;