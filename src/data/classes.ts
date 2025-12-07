// A sample database of students, organized by class ID.
export const STUDENTS_DATA = {
  "class-10a": [
    { id: "s10a-01", name: "Rohan Sharma", gender: "Male" },
    { id: "s10a-02", name: "Priya Patel", gender: "Female" },
    { id: "s10a-03", name: "Amit Singh", gender: "Male" },
    { id: "s10a-04", name: "Sneha Gupta", gender: "Female" },
    { id: "s10a-05", name: "Vikas Kumar", gender: "Male" },
  ],
  "class-9b": [
    { id: "s9b-01", name: "Anjali Verma", gender: "Female" },
    { id: "s9b-02", name: "Deepak Choudhary", gender: "Male" },
    { id: "s9b-03", name: "Kavita Reddy", gender: "Female" },
  ],
  "class-8c": [
    { id: "s8c-01", name: "Manish Joshi", gender: "Male" },
    { id: "s8c-02", name: "Pooja Mehta", gender: "Female" },
  ],
  // ... add more student lists for other classes as needed
};

// Your main list of classes.
// Note: Each class now has a unique `id` and a `students` array.
export const CLASSES = [
  // --- Existing Classes with Students ---
  {
    id: "class-10a",
    name: "Class 10 - Section A",
    teacher: "Mr. Sharma",
    level: "Secondary",
    capacity: 60,
    students: STUDENTS_DATA["class-10a"] || [],
  },
  {
    id: "class-9b",
    name: "Class 9 - Section B",
    teacher: "Mrs. Desai",
    level: "Secondary",
    capacity: 60,
    students: STUDENTS_DATA["class-9b"] || [],
  },
  {
    id: "class-8c",
    name: "Class 8 - Section C",
    teacher: "Ms. Rao",
    level: "Middle",
    capacity: 60,
    students: STUDENTS_DATA["class-8c"] || [],
  },

  // --- New Classes (merged) ---
  { id: '12-A', level: 'Higher Secondary', name: '12-A', teacher: 'Dhruv Shah', capacity: 60, students: [] },
  { id: '12-B', level: 'Higher Secondary', name: '12-B', teacher: 'Dhruv Shah', capacity: 60, students: [] },
  { id: '11-A', level: 'Higher Secondary', name: '11-A', teacher: 'Dhruv Shah', capacity: 60, students: [] },
  { id: '11-B', level: 'Higher Secondary', name: '11-B', teacher: 'Dhruv Shah', capacity: 60, students: [] },
  { id: '11-C', level: 'Higher Secondary', name: '11-C', teacher: 'Dhruv Shah', capacity: 60, students: [] },
  { id: '9-A',  level: 'Secondary', name: '9-A', teacher: 'Dhruv Shah', capacity: 60, students: [] },
  { id: '9-C',  level: 'Secondary', name: '9-C', teacher: 'Sizuka',     capacity: 60, students: [] },
  { id: '10-B', level: 'Secondary', name: '10-B', teacher: 'Nobita',    capacity: 60, students: [] },
  { id: '8-A',  level: 'Middle', name: '8-A', teacher: 'Dhruv Shah', capacity: 60, students: [] },
  { id: '8-B',  level: 'Middle', name: '8-B', teacher: 'Gian',       capacity: 60, students: [] },
  { id: '7-A',  level: 'Middle', name: '7-A', teacher: 'Doraemon',   capacity: 60, students: [] },
  { id: '7-B',  level: 'Middle', name: '7-B', teacher: 'Nobita',     capacity: 60, students: [] },
  { id: '6-A',  level: 'Middle', name: '6-A', teacher: 'Sizuka',     capacity: 60, students: [] },
  { id: '5-A',  level: 'Primary', name: '5-A', teacher: 'Dhruv Shah', capacity: 60, students: [] },
  { id: '5-B',  level: 'Primary', name: '5-B', teacher: 'Gian',       capacity: 60, students: [] },
  { id: '4-A',  level: 'Primary', name: '4-A', teacher: 'Doraemon',   capacity: 60, students: [] },
  { id: '4-B',  level: 'Primary', name: '4-B', teacher: 'Nobita',     capacity: 60, students: [] },
  { id: '3-A',  level: 'Primary', name: '3-A', teacher: 'Sizuka',     capacity: 60, students: [] },
  { id: '2-A',  level: 'Primary', name: '2-A', teacher: 'Sizuka',     capacity: 60, students: [] },
  { id: '1-A',  level: 'Primary', name: '1-A', teacher: 'Sizuka',     capacity: 60, students: [] },
];

// This is just a type definition for TypeScript, you can ignore it if you're not using it.
export type ClassItem = (typeof CLASSES)[0];

