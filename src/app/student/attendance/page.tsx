'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../../../../firebase';
import { doc, getDoc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';  // Assuming you have an AuthContext

const StudentAttendancePage = () => {
  const [isAttendancePeriodOpen, setIsAttendancePeriodOpen] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const { user } = useAuth(); // Get the current user from your auth context

  useEffect(() => {
    const checkAttendancePeriod = async () => {
      const attendanceDocRef = doc(db, 'attendance', 'current');
      const attendanceDoc = await getDoc(attendanceDocRef);
      setIsAttendancePeriodOpen(attendanceDoc.exists());
    };

    checkAttendancePeriod();
  }, []);

  const signUpForAttendance = async () => {
    if (!user) return;

    const attendanceRef = collection(db, 'attendance', 'current', 'students');
    await setDoc(doc(attendanceRef, user.uid), {
      name: user.displayName,
      email: user.email,
      timestamp: serverTimestamp(),
    });
    setHasSignedUp(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Student Attendance</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          {isAttendancePeriodOpen ? (
            hasSignedUp ? (
              <p className="text-lg font-medium text-green-600">You have successfully signed up for attendance.</p>
            ) : (
              <button
                onClick={signUpForAttendance}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up for Attendance
              </button>
            )
          ) : (
            <p className="text-lg font-medium text-red-600">Attendance period is currently closed.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default StudentAttendancePage;