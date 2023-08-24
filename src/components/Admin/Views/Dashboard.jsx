import { Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Card } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { FaUsers, FaCcMastercard, FaStar, FaFolder } from "react-icons/fa";
import axios from "axios";

const Dashboard = () => {
  const { work } = useSelector((state) => state.work);
  const { users, userCredentials } = useSelector((state) => state.users);
  const totalUsers = users.length;
  const totalServices = work.length;

  const [payments, setPayments] = useState([]);


    const getPayments = async () => {
      try {
        const { data } = await axios(
          "https://skillhub-back-production.up.railway.app/payment/"
        );
        setPayments(data);
      } catch (error) {
        console.error("Error al obtener los pagos:", error);
      }
    };
    getPayments();

  const totalPayments = payments.length;
  const totalRatings = 120;

  return (
    <div>
        <Typography variant="h2" className="text-center">
          Admin Dashboard
        </Typography>
    
      <div className="fgap-10">
      {/* USERS */}
      <a
      href={`/user-panel/${userCredentials.uid}/dashboard/list-users`}>
        <Card className="bg-red-700">
          <div className="p-4 text-center">
            <Typography variant="h5" color="white">
              Usuarios
            </Typography>
            <Typography variant="h3" className="mt-2 text-white">
              {totalUsers}
            </Typography>
            <div className="mt-4">
              <FaUsers className="text-white text-4xl" />
            </div>
          </div>
        </Card>
        </a>

        {/* SERVICES */}
        <a
        href={`/user-panel/${userCredentials.uid}/dashboard/list-services`}>
        <Card className="bg-green-700">
          <div className="p-4 text-center">
            <Typography variant="h5" color="white">
              Servicios
            </Typography>
            <Typography variant="h3" className="mt-2 text-white">
              {totalServices}
            </Typography>
            <div className="mt-4">
              <FaFolder className="text-white text-4xl" />
            </div>
          </div>
        </Card>
        </a>

        {/* PAYMENTS */}
        <a
        href={`/user-panel/${userCredentials.uid}/dashboard/payments`}>
        <Card className="bg-blue-500">
          <div className="p-4 text-center">
            <Typography variant="h5" color="white">
              Pagos
            </Typography>
            <Typography variant="h3" className="mt-2 text-white">
              {totalPayments}
            </Typography>
            <div className="mt-4">
              <FaCcMastercard className="text-white text-4xl" />
            </div>
          </div>
        </Card>
        </a>

        {/* REVIEWS */}
        <a
      href={`/user-panel/${userCredentials.uid}/dashboard/reviews`}>
        <Card className="bg-yellow-700">
          <div className="p-4 text-center">
            <Typography variant="h5" color="white">
              Calificaciones
            </Typography>
            <Typography variant="h3" className="mt-2 text-white">
              {totalRatings}
            </Typography>
            <div className="mt-4">
              <FaStar className="text-white text-4xl" />
            </div>
          </div>
        </Card>
        </a>

      </div>
    </div>
  );
};

export default Dashboard;
