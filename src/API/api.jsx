const BACKEND_ROUTE = 'http://localhost:8002/api/';

export const API = {
    Register : BACKEND_ROUTE + 'users/register',
    Login : BACKEND_ROUTE + 'users/login',
    Dashboard : BACKEND_ROUTE + 'users/dashboard',
    Students : BACKEND_ROUTE + 'users/students',
    AddStudent : BACKEND_ROUTE + 'users/studentregistration',
    ExportStudent : BACKEND_ROUTE + 'users/studentsexport',
    ImportStudent  : BACKEND_ROUTE + 'users/import-students',
    StudentById: (id) => BACKEND_ROUTE + `users/getStudentById/${id}`,
}