import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [editingRecord, setEditingRecord] = useState(null);
  const [error, setError] = useState(null); // Add an error state

  // Fetch records from the backend
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/records');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
      setError('Failed to fetch records.');
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form to create or update record
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors before submitting
    if (editingRecord) {
      // Update record
      try {
        await axios.put(`http://localhost:3000/api/records/${editingRecord._id}`, formData);
        setRecords((prevRecords) => prevRecords.map((record) =>
          record._id === editingRecord._id ? { ...editingRecord, ...formData } : record
        ));
        setEditingRecord(null); // Clear editing state
        setFormData({ name: '', email: '', phone: '', message: '' });
      } catch (error) {
        console.error('Error updating record:', error);
        setError('Failed to update the record.');
      }
    } else {
      // Create new record
      try {
        const response = await axios.post('http://localhost:3000/api/records', formData);
        setRecords((prevRecords) => [...prevRecords, response.data]);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } catch (error) {
        console.error('Error creating record:', error);
        setError('Failed to create the record.');
      }
    }
  };

  // Handle editing a record
  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({
      name: record.name,
      email: record.email,
      phone: record.phone,
      message: record.message,
    });
  };

  // Handle deleting a record
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/records/${id}`);
      setRecords((prevRecords) => prevRecords.filter((record) => record._id !== id));
    } catch (error) {
      console.error('Error deleting record:', error);
      setError('Failed to delete the record.');
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <div className="max-w-lg p-6 mx-auto bg-white rounded-md shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center">
          {editingRecord ? 'Edit Record' : 'Add New Record'}
        </h1>

        {error && <div className="mb-4 text-center text-red-500">{error}</div>} {/* Display error messages */}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {editingRecord ? 'Update Record' : 'Create Record'}
          </button>
        </form>
      </div>

      <div className="max-w-lg mx-auto mt-8">
        <h2 className="mb-4 text-xl font-bold text-center">Record List</h2>
        <div className="space-y-4">
          {records.map((record) => (
            <div key={record._id} className="flex items-center justify-between p-4 bg-white rounded-md shadow-md">
              <div>
                <h3 className="font-semibold">{record.name}</h3>
                <p>{record.email}</p>
                <p>{record.phone}</p>
                <p>{record.message}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(record)}
                  className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(record._id)}
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
