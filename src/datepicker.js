import React from 'react';
import './App.css';

const Datepicker = ({ date, handleSelect }) => {
  return (
      <div
        className={"datepicker"}
        tabIndex={0}
        onClick={handleSelect}
        role={"button"}
        aria-label={"Datepicker"}
        >
          <div>
            Select a date
          </div>
          <div aria-label={"Select date"}>
            {date}
          </div>

      </div>
  );
}

export default Datepicker;
