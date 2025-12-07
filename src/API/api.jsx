const BACKEND_ROUTE = 'http://localhost:5000/api/';

export const API = {
    Register : BACKEND_ROUTE + 'users/register',
    Login : BACKEND_ROUTE + 'users/login',
    Dashboard : BACKEND_ROUTE + 'users/dashboard',
    Students : BACKEND_ROUTE + 'users/students',
    Fees : BACKEND_ROUTE + 'fees/getMonthlyFeesSummary'
}