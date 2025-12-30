const useGetSetting = () => {
    return {
        storeCustomizationSetting: {
            dashboard: {
                dashboard_title: "Dashboard",
                my_order: "My Orders",
                update_profile: "Update Profile",
                change_password: "Change Password",
                total_order: "Total Orders",
                pending_order: "Pending Orders",
                processing_order: "Processing Orders",
                complete_order: "Completed Orders",
            },
            navbar: {
                logout: "Log Out"
            }
        }
    };
};

export default useGetSetting;
