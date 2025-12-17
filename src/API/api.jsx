const BACKEND_ROUTE = 'http://localhost:5000/api/';

export const API = {
    Register : BACKEND_ROUTE + 'users/register',
    Login : BACKEND_ROUTE + 'users/login',
    Dashboard : BACKEND_ROUTE + 'users/dashboard',
    Students : BACKEND_ROUTE + 'students',
    AddStudent : BACKEND_ROUTE + 'students/register',
    updateStudent : (id) => BACKEND_ROUTE + `students/${id}`,
    deleteStudent : (id) => BACKEND_ROUTE + `students/${id}`,
    StudentById: (id) => BACKEND_ROUTE + `students/${id}`,
    ExportStudent : BACKEND_ROUTE + 'users/studentsexport',
    ImportStudent  : BACKEND_ROUTE + 'users/import-students',
    Fees : BACKEND_ROUTE + 'fees/getMonthlyFeesSummary',
    Teachers : BACKEND_ROUTE + 'teachers',

    
}