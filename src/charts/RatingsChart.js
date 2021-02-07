import { Ratings } from '../constants';
import { hexToRgba } from '@coreui/utils';
import React, { useEffect, useState } from 'react';
import { arraySum, arrayGroupBy, arrayRange } from '../utils';
import { CChartLine, CChartPie } from '@coreui/react-chartjs';
import { Yellow, LightGreen, Blue, RedBnb, Orange, BrightYellow, DarkGreen } from '../theme/Colors';

const lineCharOptions = {
  showScale: true,
  pointDot: true,
  showLines: true,
  maintainAspectRatio: false,
  legend: {
    display: true,
  },

  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          min: 0,
          max: 5,
        },
      },
    ],
  },
};

const RatingsLineChart = ({ ratings, limitDate, ratingType }) => {
  const [ratingsValues, setRatings] = useState([]);
  const [meanRatings, setMean] = useState([]);
  const [labels, setLabels] = useState([]);

  const [meanColor, setMeanColor] = useState(Blue);
  const [color, setColor] = useState(Yellow);

  const _computeGuestRatings = () => {
    if (ratings.length == 0) return [];

    let sortedRatings = ratings
      .filter((x) => new Date(x.createdAt) > limitDate)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map((x) => x.rating);

    return sortedRatings;
  };

  const computeRatings = () => {
    let sortedRatings = _computeGuestRatings();

    let meanArray = [];
    const mean = arraySum(sortedRatings) / sortedRatings.length;
    for (let _ = 0; _ < sortedRatings.length; _++) meanArray.push(mean);

    setMean(meanArray);
    setRatings(sortedRatings);
    setLabels(arrayRange(sortedRatings.length));
  };

  const selectColors = () => {
    switch (ratingType) {
      case Ratings.HOST:
        setColor(Yellow);
        break;
      case Ratings.GUEST:
        setColor(LightGreen);
        break;
      default:
        setColor(DarkGreen);
        break;
    }
    setMeanColor(Blue);
  };

  useEffect(() => {
    computeRatings();
    selectColors();
  }, [ratings]);

  const datasetRatings = [
    {
      label: 'Guest Ratings',
      backgroundColor: hexToRgba(color, 10),
      borderColor: color,
      borderWidth: 1.5,
      hoverBackgroundColor: 'rgba(0,99,132,0.2)',
      hoverBorderColor: 'rgba(0,99,132,0.2)',
      data: ratingsValues,
    },
    {
      label: 'Mean',
      backgroundColor: 'transparent',
      borderColor: meanColor,
      borderDash: [8, 5],
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      borderWidth: 1.5,
      data: meanRatings,
    },
  ];

  // render
  return <CChartLine style={{ height: '80%' }} datasets={datasetRatings} labels={labels} options={lineCharOptions} />;
};

const RatingsPieChart = ({ ratings }) => {
  const [ratingsCount, setRatingsCount] = useState([]);
  const [labels, setLabels] = useState([]);

  const computeRatings = () => {
    if (ratings.length == 0) return [];
    let ratingsGrouped = arrayGroupBy(ratings.map((x) => x.rating));

    const ratingsCount = new Array(5);
    const labels = ['1', '2', '3', '4', '5'];

    labels.forEach((x) => {
      let count = ratingsGrouped[x];
      ratingsCount[x - 1] = count ? count : 0;
    });

    setLabels(labels);
    setRatingsCount(ratingsCount);
  };

  useEffect(() => computeRatings(), [ratings]);

  const datasetGuestRatings = [
    {
      label: 'Ratings',
      backgroundColor: [RedBnb, Orange, BrightYellow, LightGreen, DarkGreen],
      borderWidth: 1.5,
      hoverBackgroundColor: 'rgba(0,99,132,0.2)',
      hoverBorderColor: 'rgba(0,99,132,0.2)',
      data: ratingsCount,
    },
  ];

  // render
  return <CChartPie style={{ height: '100%' }} datasets={datasetGuestRatings} labels={labels} options={{ maintainAspectRatio: false }} />;
};

export { RatingsLineChart, RatingsPieChart };
