/* eslint-disable no-unused-vars */
import CIcon from '@coreui/icons-react';
import CounterWidgets from './CounterWidgets';
import { getRooms } from '../../services/RoomService';
import React, { lazy, useEffect, useState } from 'react';
import { getUsers } from '../../services/UserService';
import { getBookings } from '../../services/BookingsService';
import { CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCol, CProgress, CRow, CCallout } from '@coreui/react';
import MainChartExample from '../../views/charts/MainChartExample.js';
import Iframe from 'react-iframe';

const WidgetsBrand = lazy(() => import('../../views/widgets/WidgetsBrand.js'));

const RandomCard = () => {
  return (
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="5">
            <h4 id="traffic" className="card-title mb-0">
              Usuarios nuevos en la ultima semana
            </h4>
          </CCol>
        </CRow>
        <Iframe
          url="https://chart-embed.service.newrelic.com/herald/93805848-933e-4ae8-9dde-863b377e2a28?height=400px&timepicker=true"
          width="100%"
          height="440px"
          display="initial"
          position="relative"
          frameBorder={0}
          scrolling="no"
        />
      </CCardBody>
      <CCardFooter>
        <CRow className="text-center">
          <CCol md sm="12" className="mb-sm-2 mb-0">
            <div className="text-muted">Visits</div>
            <strong>29.703 Users (40%)</strong>
            <CProgress className="progress-xs mt-2" precision={1} color="success" value={40} />
          </CCol>
          <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
            <div className="text-muted">Unique</div>
            <strong>24.093 Users (20%)</strong>
            <CProgress className="progress-xs mt-2" precision={1} color="info" value={40} />
          </CCol>
          <CCol md sm="12" className="mb-sm-2 mb-0">
            <div className="text-muted">Pageviews</div>
            <strong>78.706 Views (60%)</strong>
            <CProgress className="progress-xs mt-2" precision={1} color="warning" value={40} />
          </CCol>
          <CCol md sm="12" className="mb-sm-2 mb-0">
            <div className="text-muted">New Users</div>
            <strong>22.123 Users (80%)</strong>
            <CProgress className="progress-xs mt-2" precision={1} color="danger" value={40} />
          </CCol>
          <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
            <div className="text-muted">Bounce Rate</div>
            <strong>Average Rate (40.15%)</strong>
            <CProgress className="progress-xs mt-2" precision={1} value={40} />
          </CCol>
        </CRow>
      </CCardFooter>
    </CCard>
  );
};

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const roomsData = await getRooms();
      const usersData = await getUsers();
      const bookingsData = await getBookings();

      setRooms(roomsData.rooms);
      setUsers(usersData.users);
      setBookings(bookingsData);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => fetchData(), []);

  return (
    <div>
      <CounterWidgets totalUsers={users.length} totalRooms={rooms.length} totalBookings={bookings.length} />
      <RandomCard />
      <WidgetsBrand withCharts />
    </div>
  );
};

export default Dashboard;
