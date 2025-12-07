// MaskedDatePicker.jsx
import React, { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

const formatDate = (date) => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const convertStringIntoDateObject = (value) => {
  if (value) {
    const date = value?.includes("/") ? value?.split("/") : value?.split("-");
    return new Date(`${date[2]}-${date[1]}-${date[0]}`);
  }
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
  const [inputValue, setInputValue] = useState(date ? formatDate(date) : "");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [dateValue, setDateValue] = useState(date);
  const datepickerRef = useRef(null);
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (typeof date === "string") {
      setDateValue(convertStringIntoDateObject(date));
    }
  }, [dateValue, date]);

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
    setDate(name, selected);
    setDateValue(selected);
    setInputValue(formatDate(selected));
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      let value = e.target.value;
      console.log(value, String(value).substring(0,2),String(value).substring(
          3
        ), value.length == 3 ,
        Number(String(value).substring(0, 2)) < 31 &&
        String(value).substring(3));
      if (value.length == 1 && value && value < 31) {
        let input = `${String(value).padStart(2, "0")}/${String(
          today.getMonth() + 1
        ).padStart(2, "0")}/${String(today.getFullYear())}`;
        setInputValue(input);
        setDateValue(convertStringIntoDateObject(input));
      } else if (value.length == 2 && value && value < 31) {
        let input = `${value}/${String(today.getMonth() + 1).padStart(
          2,
          "0"
        )}/${String(today.getFullYear())}`;
        setInputValue(input);
        setDateValue(convertStringIntoDateObject(input));
      } else if (
        value.length == 4 &&
        String(value).substring(0, 2) < 31 &&
        String(value).substring(3) &&
        String(value).substring(0, 2)
      ) {
        let input = `${value.substring(0, 2)}/${String(value).substring(3).padStart(
          2,
          "0"
        )}/${String(today.getFullYear())}`;
        setInputValue(input);
        setDateValue(convertStringIntoDateObject(input));
      } else if ( value.length == 5 && String(value).substring(0,2) < 31 && String(value).substring(0,2) && String(value).substring(3) < 31 && String(value).substring(3) ) {
        let input = `${value.substring(0, 2)}/${String(value).substring(3).padStart(
          2,
          "0"
        )}/${String(today.getFullYear())}`;
        setInputValue(input);
        setDateValue(convertStringIntoDateObject(input));
      } else if ( value.length == 8 && String(value).substring(0,2) < 31 && String(value).substring(3,5) < 31 && String(value).substring(6,8)) {
        let input = `${value.substring(0,2)}/${String(value).substring(3,5).padStart(2,"0")}/${String(value).substring(6,8)}${String(today.getFullYear()).substring(0,2)}`
        setInputValue(input);
        setDateValue(convertStringIntoDateObject(input));
      }
    }
  };

  return (
    <div
      className={`flex items-center gap-3 border border-gray-300 bg-white rounded-md px-4 mb-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 py-1.5 justify-between w-[20vw]`}
    >
      <DatePicker
        selected={dateValue}
        onChange={handleDateSelect}
        dateFormat="dd/MM/yyyy"
        ref={datepickerRef}
        className="w-full sm:w-32 outline-none text-sm py-1 bg-transparent placeholder-gray-400"
        customInput={
          <div className="border-none outline-none">
            <input
              id="datepicker"
              type="text"
              className={`border-none outline-none ${className}`}
              name={name}
              placeholder={`${placeholder}`}
              value={inputValue}
              disabled={disabled}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              inputMode="numeric"
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
