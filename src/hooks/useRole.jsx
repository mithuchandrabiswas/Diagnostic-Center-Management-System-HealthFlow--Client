import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useRole = () => {
    const { user, loading } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data: role = [], isLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email, // here is loading false and !!user?.email is a true. when enabled condition fullfil than it's come to queryFn other's not. Enabled always accept olny truthy or falsy value only
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/user/${user?.email}`)
            // console.log(data.role);
            return data.role
        }
    })

    return [role, isLoading]

};

export default useRole;