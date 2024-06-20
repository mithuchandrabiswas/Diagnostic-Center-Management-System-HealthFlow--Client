// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { Bar, Doughnut } from 'react-chartjs-2';
// import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
// import useAxiosPublic from '../../../hooks/useAxiosPublic';

// const axiosPublic = () => {
//     const axiosPublic = useAxiosPublic();

//     const { data: statData = {}, isLoading } = useQuery({
//         queryKey: ['statData'],
//         queryFn: async () => {
//             const { data } = await axiosPublic.get('/appointments');
//             return data;
//         },
//     });

//     if (isLoading) return <LoadingSpinner />;

//     // Assuming statData contains the necessary information
//     const mostBookedData = statData.mostBookedServices || [];
//     const pendingServices = statData.pendingServices || 0;
//     const completedServices = statData.completedServices || 0;

//     return (
//         <div>
//             <h1>Statistics</h1>
//             <h2>Most Booked Service</h2>
//             <MostBookedChart data={mostBookedData} />
//             <h2>Service Delivery Ratio</h2>
//             <DeliveryRatioChart pending={pendingServices} completed={completedServices} />
//         </div>
//     );
// };

// const MostBookedChart = ({ data }) => {
//     const chartData = {
//         labels: data.map(item => item.serviceName),
//         datasets: [{
//             label: 'Bookings',
//             data: data.map(item => item.bookings),
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.6)',
//                 'rgba(54, 162, 235, 0.6)',
//                 'rgba(255, 206, 86, 0.6)'
//             ]
//         }]
//     };

//     return <Bar data={chartData} />;
// };

// const DeliveryRatioChart = ({ pending, completed }) => {
//     const chartData = {
//         labels: ['Pending', 'Completed'],
//         datasets: [{
//             data: [pending, completed],
//             backgroundColor: [
//                 'rgba(255, 206, 86, 0.6)',
//                 'rgba(54, 162, 235, 0.6)'
//             ]
//         }]
//     };

//     return <Doughnut data={chartData} />;
// };

// export default axiosPublic;
