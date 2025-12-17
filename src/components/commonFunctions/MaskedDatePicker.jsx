// MaskedDatePicker.jsx
import React, { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

/* ================= FIX #1 =================
   Make formatDate SAFE
   Prevent calling getDate() on non-Date
=========================================== */
const formatDate = (date) => {
  if (!(date instanceof Date)) return "";

  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const convertStringIntoDateObject = (value) => {
  if (!value) return null;

  const date = value.includes("/") ? value.split("/") : value.split("-");
  if (date.length !== 3) return null;

  return new Date(`${date[2]}-${date[1]}-${date[0]}`);
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

const MaskedDatePicker = ({
  date,
  setDate,
  name,
  disabled,
  className = "border-none outline-none",
  placeholder
}) => {

  /* ================= FIX #2 =================
     Do NOT call formatDate in useState
     (date can be string on first render)
  =========================================== */
  const [inputValue, setInputValue] = useState("");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [dateValue, setDateValue] = useState(null);

  const datepickerRef = useRef(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /* ================= FIX #3 =================
     Sync date safely in useEffect
     Correct dependency array
  =========================================== */
  useEffect(() => {
    if (!date) {
      setInputValue("");
      setDateValue(null);
      return;
    }

    const parsed =
      typeof date === "string"
        ? convertStringIntoDateObject(date)
        : date;

    if (parsed instanceof Date && !isNaN(parsed)) {
      setDateValue(parsed);
      setInputValue(formatDate(parsed));
    }
  }, [date]);

  const handleInputChange = (e) => {
    const val = e.target.value;

    let formatted = val
      .replace(/[^\d]/g, "")
      .slice(0, 8)
      .replace(/(\d{2})(\d{0,2})(\d{0,4})/, (_, p1, p2, p3) =>
        [p1, p2, p3].filter(Boolean).join("/")
      );

    setInputValue(formatted);

    const parsed = parseDate(formatted);
    if (parsed) setDate(parsed);
  };

  const handleDateSelect = (selected) => {
    if (!(selected instanceof Date)) return;

    setDate(name, selected);
    setDateValue(selected);
    setInputValue(formatDate(selected));
  };

  const handleInputKeyDown = (e) => {
    if (e.key !== "Enter") return;

    const value = e.target.value;
    let finalDate = null;

    if (value.length <= 2 && Number(value) > 0 && Number(value) <= 31) {
      finalDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        Number(value)
      );
    }

    if (finalDate) {
      setDateValue(finalDate);
      setInputValue(formatDate(finalDate));
    }
  };

  return (
    <div className="flex items-center gap-3 border border-gray-300 bg-white rounded-md px-4 mb-4 shadow-sm py-1.5 w-[20vw]">
      <DatePicker
        selected={dateValue}
        onChange={handleDateSelect}
        dateFormat="dd/MM/yyyy"
        ref={datepickerRef}
        open={openCalendar}
        onClickOutside={() => setOpenCalendar(false)}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        customInput={
          <input
            id="datepicker"
            type="text"
            className={`border-none outline-none ${className}`}
            name={name}
            placeholder={placeholder}
            value={inputValue}
            disabled={disabled}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            inputMode="numeric"
            required
          />
        }
      />
      <button
        type="button"
        className="ml-1 text-gray-600 hover:text-blue-600"
        onClick={() => setOpenCalendar((p) => !p)}
      >
        <FaCalendarAlt className="text-lg" />
      </button>
    </div>
  );
};

export default MaskedDatePicker;
