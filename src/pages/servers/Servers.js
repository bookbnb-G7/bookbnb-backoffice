/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';

import { status as authServerStatus } from '../../services/AuthService';
import { status as userServerStatus } from '../../services/UserService';
import { status as postServerStatus } from '../../services/RoomService';
import { status as paymentStatus } from '../../services/BookingsService';
import { status as appServerStatus } from '../../services/AppServerService';

import { ServerBlockedStatus, ServerStatus } from '../../constants';

import { blockServer, unblockServer, blockedStatus } from '../../services/AuthService';

import { CIcon } from '@coreui/icons-react';
import { CCol, CRow, CSpinner, CButton } from '@coreui/react';

const Servers = () => {
  const [statusBackoffice, setStatusBackOffice] = useState(null);

  const [statusAuthServer, setStatusAuthServer] = useState(null);
  const [statusPostServer, setStatusPostServer] = useState(null);
  const [statusUserServer, setStatusUserServer] = useState(null);
  const [statusAppServer, setStatusAppServer] = useState(null);
  const [statusPayment, setStatusPayment] = useState(null);

  const [blockedStatusAuthServer, setBlockedStatusAuthServer] = useState(null);
  const [blockedStatusPostServer, setBlockedStatusPostServer] = useState(null);
  const [blockedStatusUserServer, setBlockedStatusUserServer] = useState(null);
  const [blockedStatusPayment, setBlockedStatusPayment] = useState(null);

  // fucking hardcoded but is still 1 am and I dont know
  // how to make ir work. I literally hate UI's!
  const [refresh, setRefresh] = useState(1);

  const serverStatus = (status) => {
    if (status == 200) {
      return ServerStatus.ONLINE;
    } else {
      return ServerStatus.OFFLINE;
    }
  };

  const fetchStatus = async () => {
    let _status;
    let _blockedStatus;

    _status = await authServerStatus();
    _blockedStatus = await blockedStatus('bookbnb-authserver');
    setStatusAuthServer(serverStatus(_status));
    setBlockedStatusAuthServer(_blockedStatus);

    _status = await userServerStatus();
    _blockedStatus = await blockedStatus('bookbnb-userserver');
    setStatusUserServer(serverStatus(_status));
    setBlockedStatusUserServer(_blockedStatus);

    _status = await postServerStatus();
    _blockedStatus = await blockedStatus('bookbnb-postserver');
    setStatusPostServer(serverStatus(_status));
    setBlockedStatusPostServer(_blockedStatus);

    _status = await appServerStatus();
    setStatusAppServer(serverStatus(_status));

    setStatusBackOffice(ServerStatus.ONLINE);

    _status = await paymentStatus();
    _blockedStatus = await blockedStatus('bookbnb-payment');
    setStatusPayment(serverStatus(_status));
    setBlockedStatusPayment(_blockedStatus);
  };

  useEffect(() => fetchStatus());

  const getStatusIcon = (status) => {
    if (!status) {
      return <CSpinner color="success" size="md" />;
    }

    if (status == ServerStatus.ONLINE) {
      return <CIcon style={{ color: '#00B74A' }} size={'2xl'} name={'cilCheckCircle'} />;
    } else {
      return <CIcon style={{ color: '#F93154' }} name={'cilXCircle'} />;
    }
  };

  const BlockButton = ({ blockedStatus, serverName }) => {
    const [color, setColor] = useState('secondary');
    const [text, setText] = useState('loading');

    const blockOrUnblock = () => {
      if (!blockedStatus) return;

      if (blockedStatus === ServerBlockedStatus.BLOCKED) {
        unblockServer(serverName).then(fetchStatus());
      } else {
        blockServer(serverName).then(fetchStatus());
      }
    };

    useEffect(() => {
      setColor(blockedStatus === ServerBlockedStatus.UNBLOCKED ? 'danger' : 'success');
      setText(blockedStatus === ServerBlockedStatus.UNBLOCKED ? 'block' : 'unblock');
    }, []);

    return (
      <CButton size="sm" color={color} className="ml-1" onClick={() => blockOrUnblock()}>
        {text}
      </CButton>
    );
  };

  return (
    <CRow alignHorizontal={'center'}>
      <CCol lg={8}>
        <table className="table table-hover table-bordered table-striped">
          <tbody>
            <tr>
              <td>
                <h3>Userserver {getStatusIcon(statusUserServer)}</h3>
                <BlockButton serverName={'bookbnb-userserver'} blockedStatus={blockedStatusUserServer} />
              </td>
              <td>
                <h3>Payments {getStatusIcon(statusPayment)}</h3>
                <BlockButton serverName={'bookbnb-payment'} blockedStatus={blockedStatusPayment} />
              </td>
            </tr>
            <tr>
              <td>
                <h3>Postserver {getStatusIcon(statusPostServer)}</h3>
                <BlockButton serverName={'bookbnb-postserver'} blockedStatus={blockedStatusPostServer} />
              </td>
              <td>
                <h3>Authserver {getStatusIcon(statusAuthServer)}</h3>
                <BlockButton serverName={'bookbnb-authserver'} blockedStatus={blockedStatusAuthServer} />
              </td>
            </tr>
            <tr>
              <td>
                <h3>Appsever {getStatusIcon(statusAppServer)}</h3>
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
