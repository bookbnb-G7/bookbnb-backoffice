import React from 'react';
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon content={freeSet.cilBarChart} customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Admin'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Bookings',
    to: '/bookings',
    icon: <CIcon content={freeSet.cilCash} customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Rooms',
    to: '/rooms',
    icon: <CIcon content={freeSet.cilHouse} customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Users',
    to: '/users',
    icon: <CIcon content={freeSet.cilPeople} customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Pages',
    route: '/pages',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Register',
        to: '/register',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 404',
        to: '/404',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
];

export default _nav;
