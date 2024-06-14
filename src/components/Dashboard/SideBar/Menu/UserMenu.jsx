import { MdHomeWork } from "react-icons/md";
import MenuItem from "./MenuItem";
import { FcSettings } from "react-icons/fc";

const UserMenu = () => {
    return (
        <>
            
            {/* My Profile */}
            <MenuItem
                label='My Profile'
                address='/dashboard/my-profile'
                icon={FcSettings}
            />

            {/* My Upcoming Appointments */}

            <MenuItem
                label={'My Upcoming Appointments'}
                address={'my-upcoming-appointments'}
                icon={MdHomeWork}
            />
            {/* My Test Results */}
            <MenuItem
                label={'Test Results'}
                address={'test-results'}
                icon={MdHomeWork}
            />
        </>
    );
};

export default UserMenu;