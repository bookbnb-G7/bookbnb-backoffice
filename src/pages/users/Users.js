/* eslint-disable no-unused-vars */
import ErrorMessage from '../../containers/Error';
import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/UserService';
import { DarkRedBnb, White } from '../../theme/Colors';
import { useHistory, useLocation } from 'react-router-dom';
import { getUserAuthInfo, blockUser, unblockUser } from '../../services/AuthService';
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CPagination, CButton, CBadge, CCollapse } from '@coreui/react';

const Users = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);

  const [details, setDetails] = useState([]);
  const [page, setPage] = useState(currentPage);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  // fucking hardcoded but is still 1 am and I dont know
  // how to make ir work. I literally hate UI's!
  const [refresh, setRefresh] = useState(1);

  const BlockedBadget = ({ user }) => {
    const [color, setColor] = useState('warning');
    const [text, setText] = useState('loading');

    const fetchUsersAuthInfo = async () => {
      try {
        const userAuthInfo = await getUserAuthInfo(user.id);
        const _color = userAuthInfo.blocked ? 'danger' : 'success';
        const _text = userAuthInfo.blocked ? 'blocked' : 'active';

        setColor(_color);
        setText(_text);
      } catch (err) {
        setColor('black');
        setText('error');
      }
    };

    useEffect(() => fetchUsersAuthInfo(), []);

    return (
      <td>
        <CBadge color={color}>{text}</CBadge>
      </td>
    );
  };

  const BlockButton = ({ user }) => {
    const [color, setColor] = useState('secondary');
    const [text, setText] = useState('loading');

    const blockOrUnblock = () => {
      if (text == 'block') blockUser(user.id);
      if (text == 'unblock') unblockUser(user.id);
      setRefresh(refresh + 1);
    };

    const fetchUsersAuthInfo = async () => {
      try {
        const userAuthInfo = await getUserAuthInfo(user.id);
        const _color = userAuthInfo.blocked ? 'success' : 'danger';
        const _text = userAuthInfo.blocked ? 'unblock' : 'block';

        setColor(_color);
        setText(_text);
      } catch (err) {
        setColor('secondary');
        setText('error');
      }
    };

    useEffect(() => fetchUsersAuthInfo(), []);

    return text == 'loading' || text == 'error' ? (
      <CButton size="sm" color={color} className="ml-1" disabled>
        {text}
      </CButton>
    ) : (
      <CButton size="sm" color={color} className="ml-1" onClick={() => blockOrUnblock()}>
        {text}
      </CButton>
    );
  };

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };

  const redirectToUser = (user) => {
    history.push(`/users/${user.id}`);
  };

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData.users);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  useEffect(() => fetchUsers(), [refresh]);

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
    'firstname',
    'lastname',
    'email',
    'country',
    'birthdate',
    'blocked',
    {
      key: 'showDetails',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false,
    },
  ];

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
        <CButton
          color="primary"
          variant="outline"
          shape="square"
          size="sm"
          onClick={() => {
            toggleDetails(index);
          }}
        >
          {details.includes(index) ? 'Hide' : 'Show'}
        </CButton>
      </td>
    );
  };

  const detailsCard = (user, index) => {
    return (
      <CCollapse show={details.includes(index)}>
        <CCardBody>
          <CButton size="sm" color="info" onClick={() => redirectToUser(user)}>
            User Info
          </CButton>
          <BlockButton user={user} />
        </CCardBody>
      </CCollapse>
    );
  };

  return !error ? (
    <CRow>
      <CCol xl={12}>
        <CCard style={cardStyle}>
          <CCardHeader style={cardHeaderStyle}>Users</CCardHeader>
          <CCardBody>
            <CDataTable
              items={users}
              fields={tableFields}
              hover
              cleaner
              outlined
              sorter
              striped
              onFilteredItemsChange={() => setRefresh(refresh + 1)}
              onSorterValueChange={() => setRefresh(refresh + 1)}
              tableFilter
              clickableRows
              itemsPerPage={25}
              activePage={page}
              scopedSlots={{
                // eslint-disable-next-line react/display-name
                blocked: (user) => <BlockedBadget user={user} />,
                showDetails: (item, index) => showDetails(item, index),
                details: (item, index) => detailsCard(item, index),
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

export default Users;
