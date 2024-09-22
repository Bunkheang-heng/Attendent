'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as XLSX from 'xlsx';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
}

const AdminPage = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  useEffect(() => {
    fetchAttendanceRecords(selectedDate);
  }, [selectedDate]);

  const fetchAttendanceRecords = async (date: Date | null) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock data
    const mockData: AttendanceRecord[] = [
      { id: '1', studentId: '001', studentName: 'John Doe', date: date?.toISOString().split('T')[0] || '' },
      { id: '2', studentId: '002', studentName: 'Jane Smith', date: date?.toISOString().split('T')[0] || '' },
      { id: '3', studentId: '003', studentName: 'Alice Johnson', date: date?.toISOString().split('T')[0] || '' },
    ];
    setAttendanceRecords(mockData);
    setIsLoading(false);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(attendanceRecords);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, `Attendance_${selectedDate?.toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Attendance Records</h1>
        
        <div className="mb-6 flex items-end">
          <div className="mr-4">
            <label htmlFor="datePicker" className="block text-sm font-medium text-gray-700 mb-2">
              Select Date:
            </label>
            <DatePicker
              id="datePicker"
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 text-black rounded-md"
            />
          </div>
          <button
            onClick={downloadExcel}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            disabled={isLoading || attendanceRecords.length === 0}
          >
            Download Excel
          </button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white shadow overflow-hidden sm:rounded-lg"
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.studentId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.studentName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminPage;
