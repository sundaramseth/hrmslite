import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Employee() {
  const token = localStorage.getItem("access");
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    first_name: "",
    email: "",
  });

  const fetchEmployees = () => {
    axios
      .get("http://127.0.0.1:8000/api/employees/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEmployees(res.data));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = () => {
    if (!formData.first_name || !formData.email) {
      alert("All fields required");
      return;
    }

    if (editing) {
      axios
        .patch(
          `http://127.0.0.1:8000/api/employees/${formData.id}/`,
            {
            first_name: formData.first_name,
            email: formData.email,
            department: formData.department,
          },
          { headers: { Authorization: `Bearer ${token}` }}
        )
        .then(() => {
          fetchEmployees();
          closeModal();
        })
        .catch((err) => console.log(err.response.data));
    } else {
      axios
        .post(
          "http://127.0.0.1:8000/api/employees/",
          {
            employee_id: formData.employee_id,
            first_name: formData.first_name,
            email: formData.email,
            department: formData.department,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          fetchEmployees();
          closeModal();
        })
        .catch((err) => console.log(err.response.data));
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/employees/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchEmployees());
  };

  const openEdit = (emp) => {
    setEditing(true);
    setFormData(emp);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditing(false);
    setFormData({ id: null, first_name: "", email: "" });
    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Employees</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Employee
          </button>
        </div>

        <table className="w-full bg-white shadow rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Full Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b">
                <td className="p-3">{emp.first_name}</td>
                <td className="p-3">{emp.email}</td>
                <td className="p-3 flex gap-3 justify-center align-middle">
                  <button
                    onClick={() => openEdit(emp)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-96">
              <h2 className="text-xl mb-4">
                {editing ? "Edit Employee" : "Add Employee"}
              </h2>

               <input
                type="text"
                placeholder="Employee Id"
                value={formData.employee_id}
                onChange={(e) =>
                  setFormData({ ...formData, employee_id: e.target.value })
                }
                className="w-full border p-2 mb-3"
              />

              <input
                type="text"
                placeholder="Full Name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                className="w-full border p-2 mb-3"
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border p-2 mb-3"
              />

              <input
                type="text"
                placeholder="Department"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="w-full border p-2 mb-3"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="bg-gray-400 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Employee;