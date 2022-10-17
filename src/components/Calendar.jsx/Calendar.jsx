import React from 'react';
import s from './Calendar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentDate, highlightCell } from '../store/sliceCalendar';
import { addCurentKey } from '../store/sliceNotes';
import { monthNames } from '../store/supportData';
import { useEffect, useState } from 'react';
import cn from 'classnames';

const Calendar = () => {
  const dispath = useDispatch();
  let currentDate = useSelector(state => state.calendar);
  let objNotesData = useSelector(state => state.notes.notesData);
  let [successfulInitialization, setsuccessfulInitialization] = useState(false);

  if (!currentDate.date.data) {
    dispath(getCurrentDate());
    setsuccessfulInitialization(true);
  };

  useEffect(() => {
    let key = currentDate.date.year + '-' + currentDate.date.month + '-' + currentDate.date.data;
    dispath(addCurentKey(key));
  }, [successfulInitialization]);

  const setCurrentKey = (id) => {

    let key = currentDate.date.year + '-' + currentDate.date.month + '-' + id;
    dispath(highlightCell(id));
    dispath(addCurentKey(key));
  };

  let table = [],
    k = (1 - currentDate.dayNumber),
    daysCount = currentDate.countDays,
    tr;

  for (let i = 0; i < 6; i++) {
    tr = [];
    for (let j = 0; j < 7; j++) {
      let objKey = currentDate.date.year + '-' + currentDate.date.month + '-' + k;
      let result = objKey in objNotesData;
      k < 1 || k > daysCount ? tr.push(<td key={k}></td>)
        : (currentDate.highlightedCell == k
          ? tr.push(<td key={k} id={k} className={cn(s.highlightCell, {[s.containsRecords] : result }) } onClick={(e) => setCurrentKey(e.target.id)} >{k}</td>)
          : tr.push(<td key={k} id={k} className={cn( {[s.containsRecords] : result }) } onClick={(e) => setCurrentKey(e.target.id)} >{k}</td>));
      k++;
    }
    table.push(<tr>{tr}</tr>);
  };
  const prev = '<<', next = '>>';
  return (
    <div className={s.calendar}>
      <table >
        <caption className={s.caption} >
          <button onClick={() => dispath(getCurrentDate(currentDate.date.year, currentDate.date.month - 1))}>{prev}</button>
          {monthNames[currentDate.date.month]} {currentDate.date.year}
          <button onClick={() => dispath(getCurrentDate(currentDate.date.year, currentDate.date.month + 1))}>{next}</button>
        </caption>
        <thead>
          <tr> <th>пн</th> <th>вт</th> <th>ср</th> <th>чт</th> <th>пт</th> <th>сб</th> <th>вс</th></tr>
        </thead>
        <tbody>
          {table}
        </tbody>
      </ table>
    </div>
  )
}

export default Calendar;

/* return <span className={ cn({
  [styles.selectedPage]: currentPage === p
}, styles.pageNumber) } */
