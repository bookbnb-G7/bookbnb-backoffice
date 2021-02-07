/* eslint-disable react-hooks/exhaustive-deps */
import CIcon from '@coreui/icons-react';
import { yyyymmddToDate } from '../../utils';
import { RoomDataTable } from '../rooms/Room';
import { UserDataTable } from '../users/User';
import GoogleMapCard from '../../containers/Map';
import ErrorMessage from '../../containers/Error';
import React, { useState, useEffect } from 'react';
import CalendarCard from '../../containers/Calendar';
import { getUser } from '../../services/UserService';
import { getRoom } from '../../services/RoomService';
import { DarkRedBnb, White } from '../../theme/Colors';
import { getBooking } from '../../services/BookingsService';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

const BookingDataTable = ({ booking }) => {
  const NotFoundSpan = () => {
    return (
      <span>
        <CIcon className="text-muted" name="cui-icon-ban" /> Not found
      </span>
    );
  };

  const userDetails = booking ? Object.entries(booking) : [['id', NotFoundSpan()]];

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

  const title = `Booking Info - ID ${booking?.id ?? 'loading...'}`;

  const keysToExclude = ['transactionHash', 'updatedAt', 'id'];

  return (
    <CCard style={cardStyle}>
      <CCardHeader style={cardHeaderStyle}>{title}</CCardHeader>
      <CCardBody>
        <table className="table table-striped table-hover">
          <tbody>
            {userDetails.map(([key, value], index) => {
              if (keysToExclude.includes(key)) return;
              return (
                <tr key={index.toString()}>
                  <td>
                    <strong>{`${key}:`}</strong>
                  </td>
                  <td>{value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CCardBody>
    </CCard>
  );
};

const Booking = ({ match }) => {
  const [booking, setBooking] = useState(null);
  const [booker, setBooker] = useState(null);
  const [owner, setOwner] = useState(null);
  const [error, setError] = useState(null);
  const [room, setRoom] = useState(null);

  const bookingId = match.params.id;

  const fetchBooking = async () => {
    try {
      const bookingData = await getBooking(bookingId);
      const roomData = await getRoom(bookingData.roomId);
      const ownerData = await getUser(bookingData.bookerId);
      const bookerData = await getUser(bookingData.roomOwnerId);
      setRoom(roomData);
      setOwner(ownerData);
      setBooker(bookerData);
      setBooking(bookingData);
    } catch (err) {
      setError(err.message);
    }
  };

  const getPosition = (room) => {
    const latitude = parseInt(room?.latitude ?? 0);
    const longitude = parseInt(room?.longitude ?? 0);
    return { latitude, longitude };
  };

  const getStartDate = (booking) => {
    if (!booking) return;
    return yyyymmddToDate(booking.dateFrom);
  };

  const getEndDate = (booking) => {
    if (!booking) return;
    return yyyymmddToDate(booking.dateTo);
  };

  useEffect(() => fetchBooking(), []);

  return !error ? (
    <div>
      <CRow>
        <CCol lg={4}>
          <BookingDataTable booking={booking} />
        </CCol>
        <CCol lg={4}>
          <GoogleMapCard position={getPosition(room)} title={room?.location} />
        </CCol>
        <CCol lg={4}>
          <CalendarCard startDate={getStartDate(booking)} endDate={getEndDate(booking)} />
        </CCol>
      </CRow>
      <CRow>
        <CCol lg={8}>
          <CRow>
            <CCol lg={12}>
              <UserDataTable user={owner} title={'Room Owner'} />
            </CCol>
          </CRow>
          <CRow>
            <CCol lg={12}>
              <UserDataTable user={booker} title={'Booker'} />
            </CCol>
          </CRow>
        </CCol>
        <CCol lg={4}>
          <RoomDataTable room={room} />
        </CCol>
      </CRow>
    </div>
  ) : (
    <ErrorMessage message={error} />
  );
};

export default Booking;
