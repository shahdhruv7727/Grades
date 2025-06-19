import { useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import Select from "react-select";
import MaskedDatePicker from "../commonFunctions/MaskedDatePicker";
import { BiBorderRadius } from "react-icons/bi";

const AddStudent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addStudentFormData, setAddStudentFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    parentEmail: "",
    standard: "",
  });
  const [date, setDate] = useState(null);

  const handleOnChange = (e) => {
    setAddStudentFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const inputWrapper =
    "flex items-center gap-3 border border-gray-300 bg-white rounded-md px-4 py-3 mb-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 w-full";

  const mainWrapper = "flex gap-2";

  const dropdownStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "white",
      BiBorderBottom: "1px solid black",
      borderColor: state.isFocused ? "#3B82F6" : "#D1D5DB",
      boxShadow: state.isFocused
        ? "0 1px 3px 0 gray"
        : "0 1px 3px 0 rgb(0,0,0,0.1)",
      padding: "2px",
      height: "46px",
      BiBorderRadius: '12px'
    }),
    menu: (base) => ({
      ...base,
      zIndex: 50,
    }),
  };

  const standardClassOption = [
    { label: "7th", value: 7 },
    { label: "8th", value: 8 },
    { label: "9th", value: 9 },
    { label: "10th", value: 10 },
  ];

  return (
    <>
      {
        <button
          onClick={() => setIsOpen(true)}
          className="relative mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Student
        </button>
      }

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-3xl">
            <form onSubmit={(e) => e.preventDefault()}>
              <h2 className="text-xl font-bold mb-4 text-left">Add Student</h2>
              <div className={mainWrapper}>
                <div className={inputWrapper}>
                  <IoPersonSharp className="text-gray-500 text-lg" />
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={addStudentFormData.firstName}
                    onChange={handleOnChange}
                    required
                    className="w-full outline-none text-sm bg-transparent"
                  />
                </div>
                <div className={inputWrapper}>
                  <IoPersonSharp className="text-gray-500 text-lg" />
                  <input
                    type="text"
                    placeholder="Middle Name"
                    name="middleName"
                    value={addStudentFormData.middleName}
                    onChange={handleOnChange}
                    required
                    className="w-full outline-none text-sm bg-transparent"
                  />
                </div>
                <div className={inputWrapper}>
                  <IoPersonSharp className="text-gray-500 text-lg" />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={addStudentFormData.lastName}
                    onChange={handleOnChange}
                    required
                    className="w-full outline-none text-sm bg-transparent"
                  />
                </div>
              </div>
              <div className={inputWrapper}>
                <MdEmail className="text-gray-500 text-lg" />
                <input
                  type="email"
                  placeholder="Parent / Student Email"
                  required
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>
              <div className="mb-4">
                <Select
                  styles={dropdownStyles}
                  options={standardClassOption}
                  placeholder={"Class / Standard"}
                  // value={addStudentFormData.standard}
                />
              </div>
              <div className={mainWrapper}>
                <MaskedDatePicker date={date} setDate={setDate} />
                <div className={inputWrapper}>
                  <input
                    type="text"
                    readOnly
                    placeholder="Tenure"
                    className={"w-full outline-none text-sm bg-transparent"}
                  />
                </div>
              </div>
              <div className={mainWrapper}>
                <Select
                  className="w-8/12"
                  styles={dropdownStyles}
                  options={standardClassOption}
                  placeholder="Board"
                  // value={addStudentFormData.standard}
                />
                <div className={inputWrapper}>
                  <input
                    type="text"
                    placeholder="School"
                    className="w-full outline-none text-sm bg-transparent"
                  />
                </div>
              </div>
              <div className={mainWrapper}>
                <div className={inputWrapper}>
                  <input
                    type="text"
                    placeholder="Fees"
                    readOnly
                    className="w-full outline-none text-sm bg-transparent"
                  />
                </div>
                <div className={inputWrapper}>
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full outline-none text-sm bg-transparent"
                  />
                </div>
              </div>
              <div className={mainWrapper}>
                <div className={inputWrapper}>
                  <input
                    type="text"
                    placeholder="City"
                    className="w-2/12 outline-none text-sm bg-transparent"
                  />
                </div>
                <Select
                  className="w-full"
                  styles={dropdownStyles}
                  options={standardClassOption}
                  placeholder="State"
                />
              </div>
              <div className={inputWrapper}>
                <p className="border-r pr-2">+91</p>
                <input type="number" placeholder='Mobile Number' className="w-full outline-none text-sm bg-transparent" />
              </div>

              <div className="flex justify-end gap-1.5 h-6/12">
                <button
                  type="submit"
                  className="w-4/12 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-4/12 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStudent;
