import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UpdateSchedule from './components/UpdateSchedule';
import ViewBookings from './components/ViewBookings';
import CheckSchedules from './components/CheckSchedules';
import BookSeat from './components/BookSeat';
import TicketConfirmation from './components/TicketConfirmation';
import AdminLogin from './components/AdminLogin';
import ViewTickets from './components/ViewTickets';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/view-tickets" element={<ViewTickets/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/update-schedule" element={<UpdateSchedule />} />
        <Route path="/view-bookings" element={<ViewBookings />} />
        <Route path="/check-schedules" element={<CheckSchedules />} />
        <Route path="/book-seat" element={<BookSeat />} />
        <Route path="/ticket-confirmation" element={<TicketConfirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
