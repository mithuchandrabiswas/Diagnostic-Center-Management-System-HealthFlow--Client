import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";


const useRole = () => {
    const { user, loading } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const { data: role = [], isLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email, // here is loading false and !!user?.email is a true. when enabled condition fullfil than it's come to queryFn other's not. Enabled always accept olny truthy or falsy value only
        queryFn: async () => {
            const { data } = await axiosPrivate.get(`/user/${user?.email}`)
            // console.log(data.role);
            return data.role
        }
    })

    return [role, isLoading]

};

export default useRole;