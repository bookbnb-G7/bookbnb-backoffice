/* eslint-disable no-unused-vars */
import ErrorMessage from '../../containers/Error';
import React, { useState, useEffect } from 'react';
import { DarkRedBnb, White } from '../../theme/Colors';
import { useHistory, useLocation } from 'react-router-dom';
import { getRooms, blockRoom, unblockRoom } from '../../services/RoomService';
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CPagination, CBadge, CButton, CCollapse } from '@coreui/react';

const Rooms = ({ showBlockButton = true }) => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);

  const [details, setDetails] = useState([]);
  const [rooms, setRooms] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [error, setError] = useState(null);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/rooms?page=${newPage}`);
  };

  const redirectToRoom = (room) => {
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
    'blocked',
    {
      key: 'showDetails',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false,
    },
  ];

  const blockedBadget = (booking) => {
    const color = booking.blocked ? 'warning' : 'success';
    const text = booking.blocked ? 'blocked' : 'active';

    return (
      <td>
        <CBadge color={color}>{text}</CBadge>
      </td>
    );
  };

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const showDetails = (_, index) => {
    return (
      <td className="py-2">
        <CButton color="primary" variant="outline" shape="square" size="sm" onClick={() => toggleDetails(index)}>
          {details.includes(index) ? 'Hide' : 'Show'}
        </CButton>
      </td>
    );
  };

  const detailsCard = (room, index) => {
    const blockButtonText = room.blocked ? 'Unblock' : 'Block';
    const functionToApply = room.blocked ? unblockRoom : blockRoom;

    return (
      <CCollapse show={details.includes(index)}>
        <CCardBody>
          <CButton size="sm" color="info" onClick={() => redirectToRoom(room)}>
            Room Info
          </CButton>
          <CButton size="sm" color="danger" className="ml-1" onClick={() => functionToApply(room.id)}>
            {blockButtonText}
          </CButton>
        </CCardBody>
      </CCollapse>
    );
  };

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
              itemsPerPage={25}
              activePage={page}
              scopedSlots={{
                blocked: (room) => blockedBadget(room),
                showDetails: (room, index) => showDetails(room, index),
                details: (room, index) => detailsCard(room, index),
              }}
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
