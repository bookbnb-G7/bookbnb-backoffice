import React, { useEffect, useState } from 'react';
import { enGB } from 'date-fns/locale';
import 'react-nice-dates/build/style.css';
import { DarkRedBnb, White } from '../theme/Colors';
import { CCardHeader, CCard, CCardBody } from '@coreui/react';
import { DateRangePickerCalendar } from 'react-nice-dates';

const CalendarCard = ({ title, startDate: startDateParam, endDate: endDateParam }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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

  useEffect(() => {
    setStartDate(startDateParam);
    setEndDate(endDateParam);
  }, [startDateParam, endDateParam]);

  const defaultTitle = 'Calendar';

  return (
    <CCard style={cardStyle}>
      <CCardHeader style={cardHeaderStyle}>{title ? title : defaultTitle}</CCardHeader>
      <CCardBody>
        <DateRangePickerCalendar startDate={startDate} endDate={endDate} locale={enGB} />
      </CCardBody>
    </CCard>
  );
};

export default CalendarCard;
