/* eslint-disable react-hooks/exhaustive-deps */
import Profile from '../../assets/profile.webp';
import ErrorMessage from '../../containers/Error';
import { Ratings, Reviews } from '../../constants';
import React, { useState, useEffect } from 'react';
import { addDays, humanizeDate } from '../../utils';
import { BookingsTable } from '../bookings/Bookings';
import { DarkRedBnb, White } from '../../theme/Colors';
import { useHistory, useLocation } from 'react-router-dom';
import { getBookings } from '../../services/BookingsService';
import { RatingsPieChart, RatingsLineChart } from '../../charts/RatingsChart';
import { getUser, getRecievedReviews, getReceviedRatings } from '../../services/UserService';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CDataTable, CPagination } from '@coreui/react';

const UserProfilePhoto = ({ user }) => {
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

  const title = `Profile`;
  const url = user != null && user.photo != 'null' ? user.photo : Profile;

  return (
    <CCard style={cardStyle}>
      <CCardHeader style={cardHeaderStyle}>{title}</CCardHeader>
      <CCardBody align={'center'}>
        <img src={url} alt="Profile" style={{ height: '110px' }} />
      </CCardBody>
    </CCard>
  );
};

const UserDataTable = ({ user, title }) => {
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

  const tableFields = [{ key: 'id' }, 'firstname', 'lastname', 'email', 'country', 'birthdate', 'phonenumber', 'createdAt', 'updatedAt'];
  const defaultTitle = `User: ${user?.firstname} ${user?.lastname}`;

  return (
    <CCard style={cardStyle}>
      <CCardHeader style={cardHeaderStyle}>{title ? title : defaultTitle}</CCardHeader>
      <CCardBody>
        <CDataTable items={[user ?? []]} fields={tableFields} hover />
      </CCardBody>
    </CCard>
  );
};

const ReviewsTable = ({ reviews, reviewType }) => {
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
    background: White,
    borderWidth: '2px',
    borderColor: DarkRedBnb,
  };

  const tableFields = [{ key: 'id', sorter: true, filter: false, _classes: 'font-weight-bold' }, 'reviewer', 'reviewer_id', 'review', 'createdAt'];

  return (
    <CCard style={cardStyle}>
      <CCardHeader style={cardHeaderStyle}>{reviewType}</CCardHeader>
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
          itemsPerPage={10}
          activePage={page}
          onRowClick={redirectToUser}
        />
        <CPagination activePage={page} onActivePageChange={pageChange} pages={5} doubleArrows={false} align="center" />
      </CCardBody>
    </CCard>
  );
};

const RatingsLineChartCard = ({ ratings, ratingType }) => {
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

  const title = `Last 30 days ${ratingType} (${humanizeDate(monthAgo, false)}  -  ${humanizeDate(today, false)})`;

  return (
    <CCard style={cardStyle}>
      <CCardHeader style={cardHeaderStyle}>{title}</CCardHeader>
      <CCardBody>
        <RatingsLineChart ratings={ratings} ratingType={ratingType} limitDate={monthAgo} />
      </CCardBody>
    </CCard>
  );
};

const RatingsPieChartCard = ({ ratings: ratingsData, ratingType }) => {
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
    height: '325px',
    background: White,
    borderWidth: '2px',
    borderColor: DarkRedBnb,
  };

  const title = ratingType;

  return (
    <CCard style={cardStyle}>
      <CCardHeader style={cardHeaderStyle}>{title}</CCardHeader>
      <CCardBody>
        <RatingsPieChart ratings={ratings} />
      </CCardBody>
    </CCard>
  );
};

const User = ({ match }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [guestReviews, setGuestReviews] = useState([]);
  const [guestRatings, setGuestRatings] = useState([]);
  const [hostReviews, setHostReviews] = useState([]);
  const [hostRatings, setHostRatings] = useState([]);

  const [bookingsMade, setBookingsMade] = useState([]);
  const [bookingsReceived, setBookingsReceived] = useState([]);

  const userId = match.params.id;

  const fetchUser = async () => {
    try {
      const userData = await getUser(userId);

      const hostRatingsData = await getReceviedRatings(userId, Ratings.HOST);
      const hostReviewsData = await getRecievedReviews(userId, Reviews.HOST);

      const guestRatingsData = await getReceviedRatings(userId, Ratings.GUEST);
      const guestReviewsData = await getRecievedReviews(userId, Reviews.GUEST);

      const bookingsMade = await getBookings({ bookerId: userId });
      const bookingsReceived = await getBookings({ roomOwnerId: userId });

      setUser(userData);

      setHostRatings(hostRatingsData.ratings);
      setHostReviews(hostReviewsData.reviews);

      setGuestRatings(guestRatingsData.ratings);
      setGuestReviews(guestReviewsData.reviews);

      setBookingsMade(bookingsMade);
      setBookingsReceived(bookingsReceived);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => fetchUser(), []);

  return !error ? (
    <div>
      <CRow>
        <CCol lg={9}>
          <UserDataTable user={user} />
        </CCol>
        <CCol lg={3}>
          <UserProfilePhoto user={user} />
        </CCol>
      </CRow>

      <CRow>
        <CCol lg={3}>
          <CRow>
            <CCol lg={12}>
              <RatingsPieChartCard ratings={hostRatings} ratingType={Ratings.HOST} />
            </CCol>
          </CRow>
          <CRow>
            <CCol lg={12}>
              <RatingsPieChartCard ratings={guestRatings} ratingType={Ratings.GUEST} />
            </CCol>
          </CRow>
        </CCol>
        <CCol lg={9}>
          <CRow>
            <CCol lg={12}>
              <RatingsLineChartCard ratings={hostRatings} ratingType={Ratings.HOST} />
            </CCol>
          </CRow>
          <CRow>
            <CCol lg={12}>
              <RatingsLineChartCard ratings={guestRatings} ratingType={Ratings.GUEST} />
            </CCol>
          </CRow>
        </CCol>
      </CRow>

      <CRow>
        <CCol lg={6}>
          <ReviewsTable reviews={hostReviews} reviewType={Reviews.HOST} />
        </CCol>
        <CCol lg={6}>
          <ReviewsTable reviews={guestReviews} reviewType={Reviews.GUEST} />
        </CCol>
      </CRow>

      <CRow>
        <CCol lg={6}>
          <BookingsTable bookings={bookingsMade} maxRows={5} />
        </CCol>
        <CCol lg={6}>
          <BookingsTable bookings={bookingsReceived} maxRows={5} />
        </CCol>
      </CRow>
    </div>
  ) : (
    <ErrorMessage message={error} />
  );
};

export default User;

export { User, UserDataTable };
