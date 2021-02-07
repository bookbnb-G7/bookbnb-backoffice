import ErrorMessage from '../../containers/Error';
import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/UserService';
import { DarkRedBnb, White } from '../../theme/Colors';
import { useHistory, useLocation } from 'react-router-dom';
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CPagination } from '@coreui/react';

const Users = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);

  const [page, setPage] = useState(currentPage);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

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

  useEffect(() => fetchUsers(), []);

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
  ];

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
              tableFilter
              clickableRows
              itemsPerPage={25}
              activePage={page}
              onRowClick={redirectToUser}
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
