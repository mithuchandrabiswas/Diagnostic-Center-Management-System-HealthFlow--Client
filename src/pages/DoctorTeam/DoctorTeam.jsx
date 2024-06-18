import { BsLinkedin, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const doctors = [
  {
    name: "Dr. John Doe",
    specialization: "Cardiologist",
    email: "johndoe@example.com",
    phone: "+1-234-567-8901",
    availability: {
      days: ["Monday", "Wednesday", "Friday"],
      hours: "9:00 AM - 5:00 PM"
    },
    profileImage: "https://i.ibb.co/hK6t03V/01-1536x1536.jpg",
    social: {
      facebook: "https://facebook.com/johndoe",
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe"
    }
  },
  {
    name: "Dr. Jane Smith",
    specialization: "Neurologist",
    email: "janesmith@example.com",
    phone: "+1-234-567-8902",
    availability: {
      days: ["Tuesday", "Thursday"],
      hours: "10:00 AM - 4:00 PM"
    },
    profileImage: "https://i.ibb.co/f1rQ8hN/05-1536x1536.jpg",
    social: {
      facebook: "https://facebook.com/janesmith",
      twitter: "https://twitter.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith"
    }
  },
  {
    name: "Dr. Emily Brown",
    specialization: "Pediatrician",
    email: "emilybrown@example.com",
    phone: "+1-234-567-8903",
    availability: {
      days: ["Monday", "Tuesday", "Thursday"],
      hours: "8:00 AM - 3:00 PM"
    },
    profileImage: "https://i.ibb.co/4gdvfMk/02-1536x1536.jpg",
    social: {
      facebook: "https://facebook.com/emilybrown",
      twitter: "https://twitter.com/emilybrown",
      linkedin: "https://linkedin.com/in/emilybrown"
    }
  },
  {
    name: "Dr. Michael Lee",
    specialization: "Orthopedic Surgeon",
    email: "michaellee@example.com",
    phone: "+1-234-567-8904",
    availability: {
      days: ["Wednesday", "Friday"],
      hours: "11:00 AM - 6:00 PM"
    },
    profileImage: "https://i.ibb.co/7NY8CnR/03-1536x1536.jpg",
    social: {
      facebook: "https://facebook.com/michaellee",
      twitter: "https://twitter.com/michaellee",
      linkedin: "https://linkedin.com/in/michaellee"
    }
  },
  {
    name: "Dr. Sarah Wilson",
    specialization: "Dermatologist",
    email: "sarahwilson@example.com",
    phone: "+1-234-567-8905",
    availability: {
      days: ["Monday", "Thursday", "Friday"],
      hours: "9:30 AM - 4:30 PM"
    },
    profileImage: "https://i.ibb.co/wgRB5CK/04-1536x1536.jpg",
    social: {
      facebook: "https://facebook.com/sarahwilson",
      twitter: "https://twitter.com/sarahwilson",
      linkedin: "https://linkedin.com/in/sarahwilson"
    }
  },
  {
    name: "Dr. David Kim",
    specialization: "Gastroenterologist",
    email: "davidkim@example.com",
    phone: "+1-234-567-8906",
    availability: {
      days: ["Tuesday", "Wednesday"],
      hours: "10:00 AM - 5:00 PM"
    },
    profileImage: "https://i.ibb.co/XsyGR2q/07-1536x1536.jpg",
    social: {
      facebook: "https://facebook.com/davidkim",
      twitter: "https://twitter.com/davidkim",
      linkedin: "https://linkedin.com/in/davidkim"
    }
  },
  {
    name: "Dr. Laura Martinez",
    specialization: "Endocrinologist",
    email: "lauramartinez@example.com",
    phone: "+1-234-567-8907",
    availability: {
      days: ["Monday", "Wednesday", "Friday"],
      hours: "8:30 AM - 2:30 PM"
    },
    profileImage: "https://i.ibb.co/6NRq0Lq/08-1536x1536.jpg",
    social: {
      facebook: "https://facebook.com/lauramartinez",
      twitter: "https://twitter.com/lauramartinez",
      linkedin: "https://linkedin.com/in/lauramartinez"
    }
  },
  {
    name: "Dr. Robert Johnson",
    specialization: "Pulmonologist",
    email: "robertjohnson@example.com",
    phone: "+1-234-567-8908",
    availability: {
      days: ["Tuesday", "Thursday"],
      hours: "9:00 AM - 5:00 PM"
    },
    profileImage: "https://i.ibb.co/qd32bRh/06-1536x1536.jpg",
    social: {
      facebook: "https://facebook.com/robertjohnson",
      twitter: "https://twitter.com/robertjohnson",
      linkedin: "https://linkedin.com/in/robertjohnson"
    }
  },
  {
    name: "Dr. Lisa Turner",
    specialization: "Ophthalmologist",
    email: "lisaturner@example.com",
    phone: "+1-234-567-8909",
    availability: {
      days: ["Wednesday", "Friday"],
      hours: "10:00 AM - 6:00 PM"
    },
    profileImage: "https://i.ibb.co/wgRB5CK/04-1536x1536.jpg",
    social: {
      facebook: "https://facebook.com/lisaturner",
      twitter: "https://twitter.com/lisaturner",
      linkedin: "https://linkedin.com/in/lisaturner"
    }
  }
];

const DoctorCard = ({ doctor }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
      <img className="w-full" src={doctor.profileImage} alt={`Profile of ${doctor.name}`} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{doctor.name}</div>
        <p className="text-gray-700 text-base">{doctor.specialization}</p>
        <p className="text-gray-700 text-base">Email: {doctor.email}</p>
        <p className="text-gray-700 text-base">Phone: {doctor.phone}</p>
        <p className="text-gray-700 text-base">Duty Day: {doctor.availability.days.join(', ')}</p>
        <p className="text-gray-700 text-base">Duty Hours: {doctor.availability.hours}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <a href={doctor.social.facebook} className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"><FaFacebook/></a>
        <a href={doctor.social.twitter} className="inline-block bg-blue-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"><BsTwitter/></a>
        <a href={doctor.social.linkedin} className="inline-block bg-blue-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"><BsLinkedin/></a>
      </div>
    </div>
  );
};

const DoctorCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {doctors.map((doctor, index) => (
        <DoctorCard key={index} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorCards;
