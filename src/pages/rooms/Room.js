/* eslint-disable react-hooks/exhaustive-deps */
import CIcon from '@coreui/icons-react';
import GoogleMapCard from '../../containers/Map';
import ErrorMessage from '../../containers/Error';
import React, { useState, useEffect } from 'react';
import { addDays, humanizeDate } from '../../utils';
import { BookingsTable } from '../bookings/Bookings';
import { DarkRedBnb, White } from '../../theme/Colors';
import { useHistory, useLocation } from 'react-router-dom';
import { getBookings } from '../../services/BookingsService';
import { RatingsPieChart, RatingsLineChart } from '../../charts/RatingsChart';
import { getRoom, getRoomRatings, getRoomReviews } from '../../services/RoomService';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CDataTable, CPagination } from '@coreui/react';

const RoomDataTable = ({ room }) => {
  const NotFoundSpan = () => {
    return (
      <span>
        <CIcon className="text-muted" name="cui-icon-ban" /> Not found
      </span>
    );
  };

  const roomDetails = room ? Object.entries(room) : [['id', NotFoundSpan()]];

  const cardHeaderStyle = {
    background: DarkRedBnb,
    color: White,
    fontSize: '150%',
  };

  const cardStyle = {
    height: '95%',
    background: White,
    borderWidth: '2px',
    borderColor: DarkRedBnb,
  };

  const title = `Room Info - ID ${room?.id ?? 'loading...'}`;
  const keysToExclude = ['latitude', 'longitude', 'owner_uuid', 'id', 'location'];

  return (
    <CCard style={cardStyle}>
      <CCardHeader style={cardHeaderStyle}>{title}</CCardHeader>
      <CCardBody>
        <table className="table table-striped table-hover">
          <tbody>
            {roomDetails.map(([key, value], index) => {
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

const ReviewsTable = ({ reviews }) => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);

  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };

  const redirectToUser = (user) => {
    history.push(`/users/${user.id}`);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  const cardHeaderStyle = {
    background: DarkRedBnb,
    color: White,
    fontSize: '120%',
  };

  const cardStyle = {
    height: '96%',
    background: White,
    borderWidth: '2px',
    borderColor: DarkRedBnb,
  };

  const tableFields = [{ key: 'id', sorter: true, filter: false, _classes: 'font-weight-bold' }, 'reviewer', 'reviewer_id', 'review', 'createdAt'];

  const title = 'Reviews';

  return (
    <CCard style={cardStyle}>
      <CCardHeader style={cardHeaderStyle}>{title}</CCardHeader>
      <CCardBody>
        <CDataTable
          items={reviews}
          fields={tableFields}
          hover
          cleaner
          outlined
          sorter
          striped
          tableFilter
          clickableRows
          itemsPerPage={4}
          activePage={page}
          onRowClick={redirectToUser}
        />
        <CPagination activePage={page} onActivePageChange={pageChange} pages={5} doubleArrows={false} align="center" />
      </CCardBody>
    </CCard>
  );
};

const RatingsLineChartCard = ({ ratings }) => {
  const today = new Date();
  const monthAgo = addDays(today, -30);

  const cardHeaderStyle = {
    background: DarkRedBnb,
    color: White,
    fontSize: '120%',
  };

  const cardStyle = {
    height: '325px',
    background: White,
    borderWidth: '2px',
    borderColor: DarkRedBnb,
  };

  const title = `Last 30 days ratings (${humanizeDate(monthAgo, false)}  -  ${humanizeDate(today, false)})`;

  return (
    <CCard style={cardStyle}>
      <CCardHeader style={cardHeaderStyle}>{title}</CCardHeader>
      <CCardBody>
        <RatingsLineChart ratings={ratings} limitDate={monthAgo} />
      </CCardBody>
    </CCard>
  );
};

const RatingsPieChartCard = ({ ratings: ratingsData }) => {
  const [ratings, setRatings] = useState([]);

  const cardHeaderStyle = {
    background: DarkRedBnb,
    color: White,
    fontSize: '120%',
  };

  useEffect(() => {
    if (ratingsData != null && ratingsData.length != ratings.length) {
      setRatings(ratingsData);
    }
  }, [ratingsData, setRatings]);

  const cardStyle = {
    height: '93%',
    background: White,
    borderWidth: '2px',
    borderColor: DarkRedBnb,
  };

  const title = 'Ratings';

  return (
    <CCard style={cardStyle}>
      <CCardHeader style={cardHeaderStyle}>{title}</CCardHeader>
      <CCardBody>
        <RatingsPieChart ratings={ratings} />
      </CCardBody>
    </CCard>
  );
};

const Room = ({ match }) => {
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);

  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);

  const roomId = match.params.id;

  const fetchRoom = async () => {
    try {
      const roomData = await getRoom(roomId);
      const ratingsData = await getRoomRatings(roomId);
      const reviewsData = await getRoomReviews(roomId);
      const bookings = await getBookings({ roomId: roomId });

      setRoom(roomData);
      setBookings(bookings);
      setRatings(ratingsData.ratings);
      setReviews(reviewsData.reviews);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => fetchRoom(), []);

  const getPosition = (room) => {
    const latitude = parseInt(room?.latitude ?? 0);
    const longitude = parseInt(room?.longitude ?? 0);
    return { latitude, longitude };
  };

  return !error ? (
    <div>
      <CRow form>
        <CCol lg={3}>
          <RoomDataTable room={room} />
        </CCol>
        <CCol lg={9}>
          <BookingsTable bookings={bookings} maxRows={5} />
        </CCol>
      </CRow>

      <CRow>
        <CCol lg={3}>
          <RatingsPieChartCard ratings={ratings} />
        </CCol>
        <CCol lg={9}>
          <RatingsLineChartCard ratings={ratings} />
        </CCol>
      </CRow>

      <CRow>
        <CCol lg={8}>
          <ReviewsTable reviews={reviews} />
        </CCol>
        <CCol lg={4}>
          <GoogleMapCard position={getPosition(room)} title={room?.location} />
        </CCol>
      </CRow>
    </div>
  ) : (
    <ErrorMessage message={error} />
  );
};

export default Room;

export { RoomDataTable };
