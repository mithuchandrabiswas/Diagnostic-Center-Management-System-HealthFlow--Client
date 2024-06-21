import { useQuery } from '@tanstack/react-query';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet-async';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Statistics = () => {
    const axiosPublic = useAxiosPublic();

    const { data: appointments, error, isLoading } = useQuery({
        queryKey: ['featured-tests'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/appointments');
            return data;
        }
    });

    if (isLoading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center mt-5">Error: {error.message}</div>;

    // Process data for mostly booked service
    const serviceCount = {};
    const reportStatusCount = { pending: 0, delivery: 0 };

    appointments.forEach(appointment => {
        const serviceName = appointment.test_name;
        const reportStatus = appointment.report_status;

        if (serviceCount[serviceName]) {
            serviceCount[serviceName]++;
        } else {
            serviceCount[serviceName] = 1;
        }

        if (reportStatusCount[reportStatus] !== undefined) {
            reportStatusCount[reportStatus]++;
        }
    });

    const mostlyBookedServicesData = {
        labels: Object.keys(serviceCount),
        datasets: [{
            label: 'Number of Bookings',
            data: Object.values(serviceCount),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const serviceDeliveryRatioData = {
        labels: ['Pending', 'Completed'],
        datasets: [{
            label: 'Service Delivery Ratio',
            data: [reportStatusCount.pending, reportStatusCount.delivery],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1
        }]
    };

    return (
        <div>
            <div className='flex flex-col md:flex-row justify-center items-center p-4'>
                <Helmet>
                    <title>HealthFlow | Statistics</title>
                </Helmet>
                <div className='md:w-1/2'>
                    <h2>Mostly Booked Services</h2>
                    <Bar data={mostlyBookedServicesData} />
                </div>
                <div className='md:w-1/2'>
                    <h2>Service Delivery Ratio</h2>
                    <Doughnut data={serviceDeliveryRatioData} />
                </div>
            </div>
        </div>
    );
};

export default Statistics;
