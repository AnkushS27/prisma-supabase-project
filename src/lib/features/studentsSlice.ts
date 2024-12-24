import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Student {
  name: string;
  email: string;
  cohortName: string;
  courses: string[];
  joined?: string;
  last_login?: string;
  status?: string;
}

interface StudentsState {
  students: Student[];
  selectedCohort: string | null;
  selectedCourse: string | null;
}

const initialState: StudentsState = {
  students: [],
  selectedCohort: null,
  selectedCourse: null,
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents(state, action: PayloadAction<Student[]>) {
      state.students = action.payload;
    },
    addStudent(state, action: PayloadAction<Student>) {
      state.students.push(action.payload);
    },
    removeStudent: (state, action: PayloadAction<string>) => {
      state.students = state.students.filter(
        (student) => student.email !== action.payload
      );
    },
    setSelectedCohort(state, action: PayloadAction<string | null>) {
      state.selectedCohort = action.payload;
    },
    setSelectedCourse(state, action: PayloadAction<string | null>) {
      state.selectedCourse = action.payload;
    },
  },
});

export const {
  setStudents,
  addStudent,
  removeStudent,
  setSelectedCohort,
  setSelectedCourse,
} = studentsSlice.actions;

export default studentsSlice.reducer;
