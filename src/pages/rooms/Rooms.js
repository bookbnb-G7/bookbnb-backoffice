import ErrorMessage from '../../containers/Error';
import React, { useState, useEffect } from 'react';
import { DarkRedBnb, White } from '../../theme/Colors';
import { getRooms } from '../../services/RoomService';
import { useHistory, useLocation } from 'react-router-dom';
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CPagination } from '@coreui/react';

const Rooms = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);

  const [rooms, setRooms] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [error, setError] = useState(null);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/rooms?page=${newPage}`);
  };

  const redirectToBooking = (room) => {
    history.push(`/rooms/${room.id}`);
  };

  const fetchBookings = async () => {
    try {
      const roomsData = await getRooms();
      setRooms(roomsData.rooms);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  useEffect(() => fetchBookings(), []);

  const cardHeaderStyle = {
    background: DarkRedBnb,
    color: White,
    fontSize: '150%',
  };

  const cardStyle = {
    background: White,
    borderWidth: '2px',
    borderColor: DarkRedBnb,
  };

  const tableFields = [
    { key: 'id', sorter: true, filter: false, _classes: 'font-weight-bold' },
    'title',
    'type',
    'owner',
    'owner_uuid',
    'price_per_day',
    'capacity',
    'created_at',
    'updated_at',
  ];

  return !error ? (
    <CRow>
      <CCol xl={12}>
        <CCard style={cardStyle}>
          <CCardHeader style={cardHeaderStyle}>Rooms</CCardHeader>
          <CCardBody>
            <CDataTable
              items={rooms}
              fields={tableFields}
              hover
              cleaner
              outlined
              sorter
              striped
              tableFilter
              clickableRows
              itemsPerPage={25}
              activePage={page}
              onRowClick={redirectToBooking}
            />
            <CPagination activePage={page} onActivePageChange={pageChange} pages={5} doubleArrows={false} align="center" />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  ) : (
    <ErrorMessage message={error} />
  );
};

export default Rooms;
