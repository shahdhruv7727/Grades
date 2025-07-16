// MaskedDatePicker.jsx
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

const formatDate = (date) => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const parseDate = (str) => {
  const [dd, mm, yyyy] = str.split("/").map(Number);
  if (
    !isNaN(dd) &&
    !isNaN(mm) &&
    !isNaN(yyyy) &&
    dd > 0 &&
    mm > 0 &&
    mm <= 12 &&
    yyyy >= 1000
  ) {
    const d = new Date(yyyy, mm - 1, dd);
    return d.getDate() === dd && d.getMonth() === mm - 1 ? d : null;
  }
  return null;
};

const MaskedDatePicker = ({ date, setDate }) => {
  const [inputValue, setInputValue] = useState(date ? formatDate(date) : "");
  const [openCalendar, setOpenCalendar] = useState(false);
  const datepickerRef = useRef(null);

  const handleInputChange = (e) => {
    const val = e.target.value;
    let formatted = val
      .replace(/[^\d]/g, "")
      .slice(0, 8)
      .replace(/(\d{2})(\d{0,2})(\d{0,4})/, (match, p1, p2, p3) =>
        [p1, p2, p3].filter(Boolean).join("/")
      );

    setInputValue(formatted);

    const parsed = parseDate(formatted);
    if (parsed) setDate(parsed);
  };

  const handleDateSelect = (selected) => {
    setDate(selected);
    setInputValue(formatDate(selected));
  };

  return (
    <div
      className={`flex items-center gap-3 border border-gray-300 bg-white rounded-md px-4 mb-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 py-1.5 justify-between`}
    >
      <DatePicker
        selected={date}
        onChange={handleDateSelect}
        dateFormat="dd/MM/yyyy"
        ref={datepickerRef}
        className="w-full sm:w-32 outline-none text-sm py-1 bg-transparent placeholder-gray-400"
        customInput={
          <div className="border-none outline-none">
            <input
              id="datepicker"
              type="text"
              placeholder="__/___/____"
              value={inputValue}
              onChange={handleInputChange}
              inputMode="numeric"
              className="border-none outline-none"
              required
              // readOnly // Optional: prevent manual typing
            />
          </div>
        }
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        shouldCloseOnSelect={true}
        open={openCalendar}
        onClickOutside={() => setOpenCalendar(false)}
      />
      <button
        type="button"
        className="ml-1 text-gray-600 hover:text-blue-600"
        onClick={() => setOpenCalendar((prev) => !prev)}
      >
        <FaCalendarAlt className="text-lg" />
      </button>
    </div>
  );
};

export default MaskedDatePicker;
