import React from 'react';

const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const Login = React.lazy(() => import('./pages/Login'));

const Users = React.lazy(() => import('./pages/users/Users'));
const User = React.lazy(() => import('./pages/users/User'));

const Bookings = React.lazy(() => import('./pages/bookings/Bookings'));
const Booking = React.lazy(() => import('./pages/bookings/Booking'));

const Rooms = React.lazy(() => import('./pages/rooms/Rooms'));
const Room = React.lazy(() => import('./pages/rooms/Room'));

const Servers = React.lazy(() => import('./pages/servers/Servers'));

const Toaster = React.lazy(() => import('./views/notifications/Toaster'));
const Tables = React.lazy(() => import('./views/base/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/Cards'));
const Carousels = React.lazy(() => import('./views/base/Carousels'));
const Collapses = React.lazy(() => import('./views/base/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/Navbars'));
const Navs = React.lazy(() => import('./views/base/Navs'));
const Paginations = React.lazy(() => import('./views/base/Paginations'));
const Popovers = React.lazy(() => import('./views/base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/Switches'));

const Tabs = React.lazy(() => import('./views/base/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));

const CoreUIIcons = React.lazy(() => import('./views/charts/icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/charts/icons/Flags'));
const Brands = React.lazy(() => import('./views/charts/icons/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/Badges'));
const Modals = React.lazy(() => import('./views/notifications/Modals'));
const Colors = React.lazy(() => import('./theme/Colors'));
const Typography = React.lazy(() => import('./theme/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));

const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, exact: true },

  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

  { path: '/bookings', exact: true, name: 'Bookings', component: Bookings },
  { path: '/bookings/:id', exact: true, name: 'Booking Details', component: Booking },

  { path: '/rooms', exact: true, name: 'Rooms', component: Rooms },
  { path: '/rooms/:id', exact: true, name: 'Rooms Details', component: Room },

  { path: '/servers', exact: true, name: 'Servers', component: Servers },

  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
];

export default routes;
