import { BookingStatus } from '../../constants';
import ErrorMessage from '../../containers/Error';
import React, { useState, useEffect } from 'react';
import { DarkRedBnb, White } from '../../theme/Colors';
import { useHistory, useLocation } from 'react-router-dom';
import { getBookings } from '../../services/BookingsService';
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CPagination, CBadge } from '@coreui/react';

const BookingsTable = ({ bookings, maxRows }) => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);

  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/bookings?page=${newPage}`);
  };

  const redirectToBooking = (booking) => {
    history.push(`/bookings/${booking.id}`);
  };

  const getBadgeColor = (bookingStatus) => {
    switch (bookingStatus) {
      case BookingStatus.PENDING:
        return 'warning';
      case BookingStatus.ACCEPTED:
        return 'success';
      case BookingStatus.REJECTED:
        return 'danger';
    }
  };

  const getBadgeText = (bookingStatus) => {
    switch (bookingStatus) {
      case BookingStatus.PENDING:
        return 'Pending';
      case BookingStatus.ACCEPTED:
        return 'Accepted';
      case BookingStatus.REJECTED:
        return 'Rejected';
    }
  };

  const badgetColumn = (booking) => {
    const color = getBadgeColor(booking.bookingStatus);
    const text = getBadgeText(booking.bookingStatus);

    return (
      <td>
        <CBadge color={color}>{text}</CBadge>
      </td>
    );
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

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
    'dateFrom',
    'dateTo',
    'createdAt',
    'transactionHash',
    'bookingStatus',
  ];

  return (
    <CRow>
      <CCol xl={12}>
        <CCard style={cardStyle}>
          <CCardHeader style={cardHeaderStyle}>Bookings</CCardHeader>
          <CCardBody>
            <CDataTable
              items={bookings}
              fields={tableFields}
              hover
              cleaner
              outlined
              sorter
              striped
              tableFilter
              clickableRows
              itemsPerPage={maxRows ?? 25}
              activePage={page}
              onRowClick={redirectToBooking}
              scopedSlots={{ bookingStatus: (booking) => badgetColumn(booking) }}
            />
            <CPagination activePage={page} onActivePageChange={pageChange} pages={5} doubleArrows={false} align="center" />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

const Bookings = () => {
  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      const bookings = await getBookings();
      setBookings(bookings);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => fetchBookings());

  return !error ? <BookingsTable bookings={bookings} /> : <ErrorMessage error={error} />;
};

export default Bookings;

export { BookingsTable };
