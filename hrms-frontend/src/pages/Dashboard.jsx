import axios from "axios";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

function Dashboard() {

  const [data,setData] = useState({
  });

  useEffect(() => {

    const fetchDashboardData = async () => axios.get("https://hrmslite-ubcb.onrender.com/api/dashboard/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
    .then((res) => {
      setData(res.data);
      console.log(res.data);  
    })
    .catch((err) => {
      console.log(err);
    });

    fetchDashboardData();

  },[]);


  return (
    <>
      <Navbar />
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow rounded">
            <h2 className="text-xl font-semibold">Total Employees</h2>
            <p className="text-3xl mt-4 text-blue-600">{data.total_employees}</p>
          </div>
         
         <div className="bg-white p-6 shadow rounded">
            <h2 className="text-xl font-semibold">Total Attendance Records</h2>
            <p className="text-3xl mt-4 text-purple-600">{data.total_attendance_records}</p>
          </div>

          <div className="bg-white p-6 shadow rounded">
            <h2 className="text-xl font-semibold">Present Today</h2>
            <p className="text-3xl mt-4 text-green-600">{data.present_employees}</p>
          </div>

          <div className="bg-white p-6 shadow rounded">
            <h2 className="text-xl font-semibold">Absent Today</h2>
            <p className="text-3xl mt-4 text-red-600">{data.absent_employees}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;