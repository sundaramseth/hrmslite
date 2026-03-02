import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Attendance() {
  const token = localStorage.getItem("access");
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    employee: "",
    date: "",
    status: "Present",
  });

 const fetchEmployees = () => {
    axios
      .get("https://hrmslite-ubcb.onrender.com/api/employees/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEmployees(res.data));
  };

    const fetchAttendance = () => {
    axios
      .get("https://hrmslite-ubcb.onrender.com/api/attendance/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRecords(res.data));
  };

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);





  const handleSubmit = () => {
    axios
      .post("https://hrmslite-ubcb.onrender.com/api/attendance/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        fetchAttendance();
        setFormData({ employee: "", date: "", status: "Present" });
      });
  };

  return (
    <>
      <Navbar />
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Attendance</h1>

        {/* Form */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl mb-4">Mark Attendance</h2>

          <select
            value={formData.employee}
            onChange={(e) =>
              setFormData({ ...formData, employee: e.target.value })
            }
            className="w-full border p-2 mb-3"
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.first_name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            className="w-full border p-2 mb-3"
          />

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="w-full border p-2 mb-3"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>

        {/* Table */}
        <table className="w-full bg-white shadow rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Employee</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec.id} className="border-b">
                <td className="p-3 items-center justify-center">{rec.employee_name}</td>
                <td className="p-3 items-center justify-center">{rec.date}</td>
                <td
                  className={`p-3 ${
                    rec.status === "Present"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {rec.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Attendance;