import React from 'react';

const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const Login = React.lazy(() => import('./pages/Login'));

const Users = React.lazy(() => import('./pages/users/Users'));
const User = React.lazy(() => import('./pages/users/User'));

const Bookings = React.lazy(() => import('./pages/bookings/Bookings'));
const Booking = React.lazy(() => import('./pages/bookings/Booking'));

const Rooms = React.lazy(() => import('./pages/rooms/Rooms'));
const Room = React.lazy(() => import('./pages/rooms/Room'));

const Servers = React.lazy(() => import('./pages/servers/Servers'));

const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, exact: true },

  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

  { path: '/bookings', exact: true, name: 'Bookings', component: Bookings },
  { path: '/bookings/:id', exact: true, name: 'Booking Details', component: Booking },

  { path: '/rooms', exact: true, name: 'Rooms', component: Rooms },
  { path: '/rooms/:id', exact: true, name: 'Rooms Details', component: Room },

  { path: '/servers', exact: true, name: 'Servers', component: Servers },
];

export default routes;
