import React, { useState, useEffect } from 'react';

import { status as authServerStatus } from '../../services/AuthService';
import { status as userServerStatus } from '../../services/UserService';
import { status as postServerStatus } from '../../services/RoomService';
import { status as paymentStatus } from '../../services/BookingsService';
import { status as appServerStatus } from '../../services/AppServerService';

import { ServerStatus } from '../../constants';

import { CIcon } from '@coreui/icons-react';
import { CCol, CRow, CSpinner } from '@coreui/react';

const Servers = () => {
  const [statusBackoffice, setStatusBackOffice] = useState(null);
  const [statusAuthServer, setStatusAuthServer] = useState(null);
  const [statusPostServer, setStatusPostServer] = useState(null);
  const [statusUserServer, setStatusUserServer] = useState(null);
  const [statusAppServer, setStatusAppServer] = useState(null);
  const [statusPayment, setStatusPayment] = useState(null);

  const serverStatus = (status) => {
    if (status == 200) {
      return ServerStatus.ONLINE;
    } else {
      return ServerStatus.OFFLINE;
    }
  };

  const fetchStatus = async () => {
    let _status;
    _status = await authServerStatus();
    setStatusAuthServer(serverStatus(_status));

    _status = await userServerStatus();
    setStatusUserServer(serverStatus(_status));

    _status = await postServerStatus();
    setStatusPostServer(serverStatus(_status));

    _status = await appServerStatus();
    setStatusAppServer(serverStatus(_status));

    _status = await paymentStatus();
    setStatusPayment(serverStatus(_status));

    setStatusBackOffice(ServerStatus.ONLINE);
  };

  useEffect(() => fetchStatus());

  const getStatusIcon = (status) => {
    if (!status) {
      return <CSpinner color="success" size="md" />;
    }

    if (status == ServerStatus.ONLINE) {
      return <CIcon style={{ color: '#00B74A' }} size={'2xl'} name={'cilCheckCircle'} />;
    } else {
      return <CIcon styke={{ color: '#F93154' }} name={'cilXCircle'} />;
    }
  };

  return (
    <CRow alignHorizontal={'center'}>
      <CCol lg={8}>
        <table className="table table-hover table-bordered table-striped">
          <tbody>
            <tr>
              <td>
                <h3>Appsever {getStatusIcon(statusAppServer)}</h3>
              </td>
              <td>
                <h3>Payments {getStatusIcon(statusPayment)}</h3>
              </td>
            </tr>
            <tr>
              <td>
                <h3>Postserver {getStatusIcon(statusPostServer)}</h3>
              </td>
              <td>
                <h3>Authserver {getStatusIcon(statusAuthServer)}</h3>
              </td>
            </tr>
            <tr>
              <td>
                <h3>Userserver {getStatusIcon(statusUserServer)}</h3>
              </td>
              <td>
                <h3>Backoffice {getStatusIcon(statusBackoffice)}</h3>
              </td>
            </tr>
          </tbody>
        </table>
      </CCol>
    </CRow>
  );
};

export default Servers;
