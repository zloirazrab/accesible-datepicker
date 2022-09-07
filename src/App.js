import React, { useState } from 'react';
import { format } from 'date-fns';
import Datepicker from "./datepicker";
import Calender from "./calender";
import './App.css';

const App = () => {
  const [showDatepicker, setShowDatepicker] = useState(true);
  const [showCalender, setShowCalender] = useState(false);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const toggleCalender = (e) => {
    setShowDatepicker(false);
    setShowCalender(true);
  }
  const handleSelectDate = (date) => {
    setDate(date);
    setShowDatepicker(true);
    setShowCalender(false);
  }
  const closeCalender = () => {
    setShowDatepicker(true);
    setShowCalender(false);
  }

  return (
    <div className={"App"} role={"application"}>
      {showDatepicker && (
          <Datepicker date={date} handleSelect={toggleCalender} />
      )}
      {showCalender && (
          <Calender date={date} handleSelectDate={handleSelectDate} closeCalender={closeCalender} />
      )}
    </div>
  );
}

export default App;
