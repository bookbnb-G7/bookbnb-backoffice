import React from 'react';
import '@coreui/icons';
import '@coreui/icons-react';
import { RedBnb, DarkRedBnb } from '../theme/Colors';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react';

import CIcon from '@coreui/icons-react';

// sidebar nav config
import navigation from './_nav';

const Sidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  const styleSidebar = { background: RedBnb };
  const styleSidebarBran = { background: DarkRedBnb };

  return (
    <CSidebar style={styleSidebar} show={show} onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}>
      <CSidebarBrand style={styleSidebarBran} className="d-md-down-none" to="/">
        <CIcon className="c-sidebar-brand-full" name="logo-negative" height={35} />
        <CIcon className="c-sidebar-brand-minimized" name="sygnet" height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(Sidebar);
