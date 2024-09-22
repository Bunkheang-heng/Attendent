'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../../../../firebase';
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';

const AttendancePeriodPage = () => {
  const [duration, setDuration] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [endTime, setEndTime] = useState<Date | null>(null);

  useEffect(() => {
    const checkAttendancePeriod = async () => {
      const attendanceDocRef = doc(db, 'attendance', 'current');
      const attendanceDoc = await getDoc(attendanceDocRef);
      if (attendanceDoc.exists()) {
        const data = attendanceDoc.data();
        setIsOpen(true);
        setEndTime(data.endTime.toDate());
      }
    };

    checkAttendancePeriod();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isOpen && endTime) {
      timer = setInterval(() => {
        if (new Date() >= endTime) {
          closeAttendancePeriod();
        }
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOpen, endTime]);

  const openAttendancePeriod = async () => {
    const end = new Date(Date.now() + duration * 60 * 60 * 1000);
    await setDoc(doc(db, 'attendance', 'current'), {
      startTime: serverTimestamp(),
      endTime: end,
    });
    setIsOpen(true);
    setEndTime(end);
  };

  const closeAttendancePeriod = async () => {
    await deleteDoc(doc(db, 'attendance', 'current'));
    setIsOpen(false);
    setEndTime(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Attendance Period Management</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          {!isOpen ? (
            <div>
              <label htmlFor="duration" className="block text-sm text-black font-medium">
                Duration (hours):
              </label>
              <input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value)))}
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={openAttendancePeriod}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Open Attendance Period
              </button>
            </div>
          ) : (
            <div>
              <p className="text-lg font-medium text-gray-900">Attendance period is open</p>
              <p className="mt-1 text-sm text-gray-500">
                Closes at: {endTime?.toLocaleString()}
              </p>
              <button
                onClick={closeAttendancePeriod}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Close Attendance Period
              </button>
            </div>
          )}
        </div>
        <div className="mt-6">
          <Link href="/admin/attendance-report" className="text-indigo-600 hover:text-indigo-800">
            View Attendance Report
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AttendancePeriodPage;
