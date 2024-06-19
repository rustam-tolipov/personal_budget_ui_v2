import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';

import AppLayout from './ui/AppLayout';
import Loader from './ui/Loader';

import Dashboard from './pages/Dashboard';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Incomes from './pages/Incomes';
import Expenses from './pages/Expenses';
import Calendar from './pages/Calendar';
import Savings from './pages/Savings';
import Currency from './pages/Currency';

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to='dashboard' />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='incomes' element={<Incomes />} />
            <Route path='expenses' element={<Expenses />} />
            <Route path='calendar' element={<Calendar />} />
            <Route path='savings' element={<Savings />} />
            <Route path='currency' element={<Currency />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='sign-up' element={<Signup />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
