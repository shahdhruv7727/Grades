/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  IoPersonSharp,
  IoSchoolSharp,
  IoLocationSharp,
  IoCallSharp,
  IoCalendarSharp,
} from "react-icons/io5";
import { MdEmail, MdClass, MdAccountBalance, MdClose } from "react-icons/md";
import { FaGraduationCap, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
import { Select } from "../commonFunctions/CommonSelectFxn";
import MaskedDatePicker from "../commonFunctions/MaskedDatePicker";
import { API } from "../../API/API";
import useMutateHook from "../../utils/useMutateHook";
import axios from "axios";

// InputField component MUST be outside AddStudent to prevent re-creation on every render
const InputField = React.memo(function InputField({
  icon: Icon,
  type = "text",
  placeholder,
  name,
  rules = {},
  disabled = false,
  prefix,
  CustomComponent,
  setDate,
  date,
  control,  // ✅ Passed as prop
  errors,   // ✅ Passed as prop
}) {
  return (
    <div className="space-y-1">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          if (CustomComponent) {
            return (
              <CustomComponent
                {...field}
                value={field.value ?? ""}
                setDate={setDate}
                date={date}
                disabled={disabled}
              />
            );
          }

          return (
            <div
              className={`flex items-center gap-3 border-2 ${
                errors[name] ? "border-red-300" : "border-gray-200"
              } bg-white rounded-xl px-4 py-3 shadow-sm
              focus-within:border-blue-500 focus-within:ring-4
              focus-within:ring-blue-500/10 transition-all duration-300
              hover:border-gray-300 ${disabled ? "bg-gray-50" : ""}`}
            >
              {Icon && (
                <Icon
                  className={`text-lg flex-shrink-0 ${
                    disabled
                      ? "text-gray-300"
                      : errors[name]
                      ? "text-red-400"
                      : "text-gray-400"
                  }`}
                />
              )}

              {prefix && (
                <span className="text-gray-500 border-r border-gray-200 pr-3">
                  {prefix}
                </span>
              )}

              <input
                {...field}
                value={field.value ?? ""}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full outline-none text-sm bg-transparent ${
                  disabled ? "text-gray-400" : ""
                }`}
              />
            </div>
          );
        }}
      />

      {errors[name] && (
        <p className="text-red-500 text-xs mt-1 ml-1">
          {errors[name].message}
        </p>
      )}
    </div>
  );
});

const AddStudent = ({ isOpen, setIsOpen, studentData = null, onUpdate }) => {
  const isEditMode = !!studentData;
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    trigger,
    setValue,
    watch,
  } = useForm({
    defaultValues: studentData ? {
      firstname: studentData.name?.split(' ')[0] || "",
      middlename: studentData.name?.split(' ')[1] || "",
      lastname: studentData.name?.split(' ').slice(2).join(' ') || "",
      parentEmail: studentData.email || "",
      standard: studentData.class || "",
      board: studentData.board || "",
      school: studentData.school || "",
      fees: studentData.fees || 5000,
      address: studentData.address || "",
      city: studentData.city || "",
      state: studentData.state || "",
      phoneNumber: studentData.phone || "",
      dateOfBirth: studentData.dateOfBirth || "",
      admissionDate: studentData.admissionDate || new Date().toISOString().split("T")[0],
      mobilePhone1: studentData.phone || "",
    } : {
      firstname: "",
      middlename: "",
      lastname: "",
      parentEmail: "",
      standard: "",
      board: "",
      school: "",
      fees: 5000,
      address: "",
      city: "",
      state: "",
      phoneNumber: "",
      dateOfBirth: "",
      admissionDate: new Date().toISOString().split("T")[0],
      mobilePhone1: "9832144431",
    },
    mode: "onBlur",
  });

  const dateOfBirth = watch("dateOfBirth");
  const admissionDate = watch("admissionDate");

  const standardClassOptions = [
    { label: "7th Standard", value: 7 },
    { label: "8th Standard", value: 8 },
    { label: "9th Standard", value: 9 },
    { label: "10th Standard", value: 10 },
  ];

  const boardOptions = [
    { label: "CBSE", value: "cbse" },
    { label: "ICSE", value: "icse" },
    { label: "State Board", value: "state" },
    { label: "IB", value: "ib" },
  ];

  const stateOptions = [
    { label: "Gujarat", value: "gujarat" },
    { label: "Maharashtra", value: "maharashtra" },
    { label: "Delhi", value: "delhi" },
    { label: "Karnataka", value: "karnataka" },
  ];

  const stepValidationFields = {
    1: ["firstname", "lastname", "parentEmail", "dateOfBirth", "admissionDate"],
    2: ["standard", "board", "school"],
    3: ["address", "city", "state", "phoneNumber"],
  };

  const nextStep = useCallback(async () => {
    const fieldsToValidate = stepValidationFields[currentStep];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) setCurrentStep((prev) => Math.min(prev + 1, 3));
  }, [currentStep, trigger]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const onSubmit = useCallback(
    async (data) => {
      setSubmitting(true);
      setSubmitError("");
      try {
        const payload = {
          firstname: data.firstname,
          middlename: data.middlename || "",
          lastname: data.lastname,
          parentEmail: data.parentEmail,
          standard: data.standard,
          board: data.board,
          school: data.school,
          fees: data.fees,
          address: data.address,
          city: data.city,
          state: data.state,
          mobilePhone1: data.phoneNumber,
          mobilePhone2: data.mobilePhone2 || "",
          admissionDate: data.admissionDate,
          tenure: data.tenure || "",
        };

        if (isEditMode) {
          // Update existing student
          await axios.patch(API.updateStudent(studentData.id), payload);
          if (onUpdate) {
            onUpdate({
              ...studentData,
              name: `${data.firstname} ${data.middlename || ''} ${data.lastname}`.trim(),
              class: data.standard,
              board: data.board,
              school: data.school,
              email: data.parentEmail,
              phone: data.phoneNumber,
              address: data.address,
              city: data.city,
              state: data.state,
              fees: data.fees,
            });
          }
        } else {
          // Add new student
          await axios.post(API.AddStudent, payload);
        }
        
        setIsOpen(false);
        setCurrentStep(1);
        reset();
      } catch (error) {
        console.error(isEditMode ? "Failed to update student:" : "Failed to add student:", error);
        setSubmitError(error.response?.data?.msg || error.message || (isEditMode ? "Failed to update student" : "Failed to add student"));
      } finally {
        setSubmitting(false);
      }
    },
    [setIsOpen, reset, isEditMode, studentData, onUpdate]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setCurrentStep(1);
    reset();
  }, [setIsOpen, reset]);

  const steps = [1, 2, 3];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-blue-100">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 pt-8 pb-4 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                <FaGraduationCap className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#2F7FFF] tracking-tight">{isEditMode ? 'Edit Student' : 'Add New Student'}</h2>
                <p className="text-gray-400 text-xs mt-1 font-medium">Step {currentStep} of 3</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-blue-50 rounded-full transition-colors duration-200"
              aria-label="Close"
            >
              <MdClose className="text-blue-400 text-2xl" />
            </button>
          </div>
          {/* Progress Bar */}
          <div className="mt-6 px-2">
            <div className="flex items-center">
              {steps.map((step) => (
                <React.Fragment key={step}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step <= currentStep
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`flex-1 h-2 mx-2 rounded-full transition-all duration-300 ${
                        step < currentStep
                          ? "bg-gradient-to-r from-blue-600 to-blue-700"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6">
          {/* Step Content */}
          <div className="mb-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                    <FaGraduationCap className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                    <p className="text-gray-400 text-xs mt-1">Let's start with basic details</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField
                    icon={IoPersonSharp}
                    placeholder="First Name"
                    name="firstname"
                    className="w-50"
                    rules={{
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters",
                      },
                    }}
                    control={control}
                    errors={errors}
                  />
                  <InputField
                    icon={IoPersonSharp}
                    placeholder="Middle Name"
                    name="middlename"
                    control={control}
                    errors={errors}
                  />
                </div>
                <InputField
                  icon={IoPersonSharp}
                  placeholder="Last Name"
                  name="lastname"
                  rules={{
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Last name must be at least 2 characters",
                    },
                  }}
                  control={control}
                  errors={errors}
                />
                <InputField
                  icon={MdEmail}
                  type="email"
                  placeholder="Parent / Student Email"
                  name="parentEmail"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  control={control}
                  errors={errors}
                />
                <div className="flex gap-2 justify-center">
                  <div className="flex flex-col">

                  <label htmlFor="Date of Birth " className=" text-gray-500">Date of Birth</label>
                  <InputField
                    icon={IoCalendarSharp}
                    type="date"
                    placeholder="Date of Birth"
                    name="dateOfBirth"
                    setDate={setValue}
                    date={dateOfBirth}
                    className={'w-60'}
                    rules={{ required: "Date of birth is required" }}
                    // CustomComponent={MaskedDatePicker}
                    control={control}
                    errors={errors}
                  />
                    </div>
                  <br />
                  <div className="flex flex-col ">
                  <label htmlFor="Addmission Date" className=" text-gray-500">Addmission Date</label>
                  <InputField
                    icon={IoCalendarSharp}
                    type="date"
                    placeholder="Admission Date"
                    name="admissionDate"
                    setDate={setValue}
                    date={admissionDate}
                    rules={{ required: "Admission Date is required" }}
                    // CustomComponent={MaskedDatePicker}
                    control={control}
                    errors={errors}
                  />
                  </div>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                    <IoSchoolSharp className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Academic Details</h3>
                    <p className="text-gray-400 text-xs mt-1">Educational information</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Select
                    errors={errors}
                    control={control}
                    icon={MdClass}
                    options={standardClassOptions}
                    placeholder="Select Class/Standard"
                    name="standard"
                    rules={{ required: "Please select a standard" }}
                  />
                  <Select
                    errors={errors}
                    control={control}
                    icon={MdAccountBalance}
                    options={boardOptions}
                    placeholder="Select Board"
                    name="board"
                    rules={{ required: "Please select a board" }}
                  />
                </div>
                <InputField
                  icon={IoSchoolSharp}
                  placeholder="School Name"
                  name="school"
                  rules={{
                    required: "School name is required",
                    minLength: {
                      value: 3,
                      message: "School name must be at least 3 characters",
                    },
                  }}
                  control={control}
                  errors={errors}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField
                    icon={FaRupeeSign}
                    placeholder="Monthly Fees"
                    name="fees"
                    disabled
                    control={control}
                    errors={errors}
                  />
                  <InputField
                    icon={IoCalendarSharp}
                    placeholder="Tenure (Auto-calculated)"
                    name="tenure"
                    disabled
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                    <IoLocationSharp className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
                    <p className="text-gray-400 text-xs mt-1">Where can we reach you?</p>
                  </div>
                </div>
                <InputField
                  icon={FaMapMarkerAlt}
                  placeholder="Full Address"
                  name="address"
                  rules={{
                    required: "Address is required",
                    minLength: {
                      value: 10,
                      message: "Address must be at least 10 characters",
                    },
                  }}
                  control={control}
                  errors={errors}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField
                    icon={IoLocationSharp}
                    placeholder="City"
                    name="city"
                    rules={{
                      required: "City is required",
                      minLength: {
                        value: 2,
                        message: "City must be at least 2 characters",
                      },
                    }}
                    control={control}
                    errors={errors}
                  />
                  <Select
                    errors={errors}
                    control={control}
                    icon={FaMapMarkerAlt}
                    options={stateOptions}
                    placeholder="Select State"
                    name="state"
                    rules={{ required: "Please select a state" }}
                  />
                </div>
                <InputField
                  icon={IoCallSharp}
                  type="tel"
                  placeholder="Mobile Number"
                  name="phoneNumber"
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: "Invalid phone number",
                    },
                  }}
                  prefix="+91"
                  control={control}
                  errors={errors}
                />
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 mt-8 border-t border-gray-100">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex justify-center items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                currentStep === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-0"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
              }`}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-blue-50 hover:text-[#2F7FFF] hover:shadow transition-all duration-200"
              >
                Cancel
              </button>
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || submitting}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {(isSubmitting || submitting) ? (isEditMode ? "Updating..." : "Adding...") : (isEditMode ? "Update Student" : "Add Student")}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
// };

export default AddStudent;