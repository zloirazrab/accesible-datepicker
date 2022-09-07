import React, {useState} from 'react';
import {
  format,
  startOfMonth,
  subMonths,
  addMonths,
  subYears,
  addYears,
  getDaysInMonth,
  getDay,
  endOfMonth,
  setDate,
  getDate,
  isEqual,
  subWeeks,
  addWeeks,
  subDays,
  addDays
} from 'date-fns';
import {chunk} from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons'
import './App.css';

const Calendar = ({date, handleSelectDate, closeCalender}) => {
  const [selectedDate, setSelectedDate] = useState(new Date(date));

  const setPreviousMonth = () => {
    const previousMonth = subMonths(selectedDate, 1);
    setSelectedDate(startOfMonth(previousMonth));
  }
  const setNextMonth = () => {
    const nextMonth = addMonths(selectedDate, 1);
    setSelectedDate(startOfMonth(nextMonth));
  }
  const setPreviousYear = () => {
    const previousYear = subYears(selectedDate, 1);
    setSelectedDate(startOfMonth(previousYear));
  }
  const setNextYear = () => {
    const nextYear = addYears(selectedDate, 1);
    setSelectedDate(startOfMonth(nextYear));
  }
  const generateMonth = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const startWeekday = getDay(startOfMonth(selectedDate));
    const endWeekday = getDay(endOfMonth(selectedDate));
    const gridDays = chunk([
      ...Array.from({length: startWeekday - 1}).fill(null),
      ...Array.from({length: daysInMonth}, (_, index) => setDate(selectedDate, index+1)),
      ...Array.from({length: (7 - endWeekday)}).fill(null)
    ], 7);
    return gridDays;
  }

  const handleDateSelection = (date) => {
    const dateString = format(date, "yyyy-MM-dd");
    handleSelectDate(dateString);
  }

  return (
      <div className={"calendar"}>
        <div className={"title"}>
          <div className={"icons"}>
            <div
                className={"iconContainer"}
                tabIndex={0}
                onClick={setPreviousYear}
                role={"button"}
                aria-label={"Previous year"}
            >
              <FontAwesomeIcon icon={faAngleDoubleLeft}/>
            </div>
            <div
                className={"iconContainer"}
                tabIndex={0}
                onClick={setPreviousMonth}
                role={"button"}
                aria-label={"Previous month"}
            >
              <FontAwesomeIcon icon={faAngleLeft}/>
            </div>
          </div>
          <div className={"month"} role={"heading"}>
            <b>
              {format(selectedDate, "MMMM yyyy")}
            </b>
          </div>
          <div className={"icons"}>
            <div
                className={"iconContainer"}
                tabIndex={0}
                onClick={setNextMonth}
                role={"button"}
                aria-label={"Next year"}
            >
              <FontAwesomeIcon icon={faAngleRight}/>
            </div>
            <div
                className={"iconContainer"}
                tabIndex={0}
                onClick={setNextYear}
                role={"button"}
                aria-label={"Next year"}
            >
              <FontAwesomeIcon icon={faAngleDoubleRight}/>
            </div>
          </div>
        </div>
        <table
            id={"grid"}
            tabIndex={0}
            role={"grid"}
            aria-label={"Month"}
        >
          <thead>
          <tr role={"row"}>
            <th className={"header"} role={"columnheader"} aria-label={"Monday"}><abbr title={"Monday"}>Mon</abbr></th>
            <th className={"header"} role={"columnheader"} aria-label={"Tuesday"}><abbr title={"Tuesday"}>Tue</abbr>
            </th>
            <th className={"header"} role={"columnheader"} aria-label={"Wednesday"}><abbr title={"Wednesday"}>Wed</abbr>
            </th>
            <th className={"header"} role={"columnheader"} aria-label={"Thursday"}><abbr title={"Thursday"}>Th</abbr>
            </th>
            <th className={"header"} role={"columnheader"} aria-label={"Friday"}><abbr title={"Friday"}>Fri</abbr></th>
            <th className={"header"} role={"columnheader"} aria-label={"Saturday"}><abbr title={"Saturday"}>Sat</abbr>
            </th>
            <th className={"header"} role={"columnheader"} aria-label={"Sunday"}><abbr title={"Sunday"}>Sun</abbr></th>
          </tr>
          </thead>
          <tbody>
          {generateMonth().map((week, index) => (
            <tr className={"week"} key={`week-${index}`} role={"row"}>
              {week.map((day, index) => (
                  day ?
                      <td
                          className={`cell${isEqual(selectedDate, day) ? ' active' : ''}`}
                          key={`day-cell-${index}`}
                          onClick={() => handleDateSelection(day)}
                          role={"gridcell"}
                          aria-selected={isEqual(selectedDate, day)}
                      >
                        {getDate(day)}
                      </td>
                      :
                      <td className={"empty"} key={`day-cell-${index}`}>&nbsp;</td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}

export default Calendar;
