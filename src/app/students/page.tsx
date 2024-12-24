'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  setStudents,
  addStudent,
  setSelectedCohort,
  setSelectedCourse,
} from '@/lib/features/studentsSlice';

const COHORTS = ['AY 2024-25', 'AY 2025-26', 'AY 2026-27'];
const COURSES = [
  'CBSE 9 Science',
  'CBSE 9 Math',
  'CBSE 10 Science',
  'CBSE 10 Math',
  'CBSE 9 Social Science',
  'CBSE 10 Social Science',
];

const StudentsTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { students, selectedCohort, selectedCourse } = useAppSelector(
    (state) => state.students
  );

  const [isAddingStudent, setIsAddingStudent] = useState(false);

  // Fetch students data when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/getStudents');
        dispatch(setStudents(response.data)); // Update Redux state with fetched students
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [dispatch]);

  const handleAddStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const selectedCourses = COURSES.filter((course) =>
      formData.getAll('courses').includes(course)
    );

    const newStudent = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      cohortName: formData.get('cohort') as string,
      courses: selectedCourses,
      joined: new Date().toISOString(),
      last_login: new Date().toISOString(),
    };

    try {
      await axios.post('/api/addStudents', newStudent);
      dispatch(addStudent(newStudent)); // Update Redux state with the new student
      setIsAddingStudent(false); // Close the form on success
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesCohort = selectedCohort
      ? student.cohortName === selectedCohort
      : true;
    const matchesCourse = selectedCourse
      ? student.courses.includes(selectedCourse)
      : true;

    return matchesCohort && matchesCourse;
  });

  return (
    <div className='p-4 text-xs'>
      {isAddingStudent ? (
        <form onSubmit={handleAddStudent} className='space-y-4'>
          <div>
            <label htmlFor='name' className='block font-semibold'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              required
              className='w-full rounded-md border p-2'
            />
          </div>

          <div>
            <label htmlFor='email' className='block font-semibold'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              required
              className='w-full rounded-md border p-2'
            />
          </div>

          <div>
            <label htmlFor='cohort' className='block font-semibold'>
              Cohort
            </label>
            <select
              id='cohort'
              name='cohort'
              required
              className='w-full rounded-md border p-2'
            >
              {COHORTS.map((cohort) => (
                <option key={cohort} value={cohort}>
                  {cohort}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor='courses' className='block font-semibold'>
              Courses
            </label>
            <div className='space-y-2'>
              {COURSES.map((course) => (
                <div key={course} className='flex items-center'>
                  <input
                    type='checkbox'
                    id={course}
                    name='courses'
                    value={course}
                    className='mr-2'
                  />
                  <label htmlFor={course}>{course}</label>
                </div>
              ))}
            </div>
          </div>

          <div className='flex justify-between'>
            <button
              type='button'
              onClick={() => setIsAddingStudent(false)}
              className='rounded-md bg-gray-300 px-4 py-2 font-bold text-gray-700'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='rounded-md bg-blue-500 px-4 py-2 font-bold text-white'
            >
              Add Student
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className='mb-4 flex justify-between'>
            <div>
              <select
                className='cursor-pointer rounded-md border bg-[#E9EDF1] p-2 font-semibold text-[#3F526E]'
                onChange={(e) => dispatch(setSelectedCohort(e.target.value))}
              >
                <option value=''>All Cohorts</option>
                {COHORTS.map((cohort) => (
                  <option key={cohort} value={cohort}>
                    {cohort}
                  </option>
                ))}
              </select>
              <select
                className='ml-2 cursor-pointer rounded-md border bg-[#E9EDF1] p-2 font-semibold text-[#3F526E]'
                onChange={(e) => dispatch(setSelectedCourse(e.target.value))}
              >
                <option value=''>All Courses</option>
                {COURSES.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setIsAddingStudent(true)}
              className='rounded-md bg-[#E9EDF1] px-4 py-2 font-bold text-[#3F526E]'
            >
              + Add new Student
            </button>
          </div>

          <table className='w-full text-left'>
            <thead>
              <tr className='border-b font-[700]'>
                <th className='p-2'>Student Name</th>
                <th className='p-2'>Cohort</th>
                <th className='p-2'>Courses</th>
                <th className='p-2'>Date Joined</th>
                <th className='p-2'>Last Login</th>
                <th className='p-2'>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={index} className='border-b font-[400]'>
                  <td className='p-2'>{student.name}</td>
                  <td className='p-2'>{student.cohortName}</td>
                  <td className='flex flex-wrap gap-2 p-2 font-[500]'>
                    {student.courses.map((course, idx) => (
                      <span
                        key={idx}
                        className='rounded-md bg-[#F6F8FA] px-2 py-1'
                      >
                        {course}
                      </span>
                    ))}
                  </td>
                  <td className='p-2'>
                    {student.joined &&
                      new Intl.DateTimeFormat('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      }).format(new Date(student.joined))}
                  </td>
                  <td className='p-2'>
                    {student.last_login &&
                      new Intl.DateTimeFormat('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      }).format(new Date(student.last_login))}
                  </td>
                  <td className='p-2'>
                    <span
                      className={
                        student.status === 'active'
                          ? 'inline-block h-4 w-4 rounded-full bg-green-500'
                          : 'inline-block h-4 w-4 rounded-full bg-red-500'
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default StudentsTable;
