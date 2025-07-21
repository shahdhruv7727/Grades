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
const AddStudent = ({ isOpen, setIsOpen }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    trigger,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      parentEmail: "",
      standard: "",
      board: "",
      school: "",
      fees: "",
      address: "",
      city: "",
      state: "",
      phoneNumber: "",
      dateOfBirth: "",
    },
    mode: "onBlur",
  });

  const watchValues = watch();

  // Static data moved outside component to prevent re-creation
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

  // Validation rules for each step
  const stepValidationFields = {
    1: ["firstName", "lastName", "parentEmail", "dateOfBirth"],
    2: ["standard", "board", "school"],
    3: ["address", "city", "state", "phoneNumber"],
  };

  const nextStep = useCallback(async () => {
    const fieldsToValidate = stepValidationFields[currentStep];
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const onSubmit = useCallback(
    (data) => {
      console.log("Form submitted:", data);
      setIsOpen(false);
      setCurrentStep(1);
      reset();
    },
    [setIsOpen, reset]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setCurrentStep(1);
    reset();
  }, [setIsOpen, reset]);

  // Optimized input component
  const InputField = React.memo(
    ({
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

    }) => (
      <div className="space-y-1">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <>
              {!CustomComponent ? (
                <div
                  className={`flex items-center gap-3 border-2 ${
                    errors[name] ? "border-red-300" : "border-gray-200"
                  } bg-white rounded-xl px-4 py-3 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300 hover:border-gray-300 ${
                    disabled ? "bg-gray-50" : ""
                  }`}
                >
                  {!CustomComponent && (
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
                  {!CustomComponent && (
                    <input
                      {...field}
                      type={type}
                      placeholder={placeholder}
                      disabled={disabled}
                      className={`w-full outline-none text-sm bg-transparent ${
                        disabled ? "text-gray-400" : ""
                      }`}
                    />
                  )}
                </div>
              ) : (
                <CustomComponent
                  {...field}
                  setDate={setDate}
                  date={date}
                  disabled={disabled}
                  name={name}
                  // className={`w-full outline-none text-sm bg-transparent ${
                  //   disabled ? "text-gray-400" : ""
                  // }`}
                />
              )}
            </>
          )}
        />
        {errors[name] && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {errors[name].message}
          </p>
        )}
      </div>
    )
  );

  // Optimized select component
  // const Select = React.memo(({
  //   options,
  //   placeholder,
  //   name,
  //   rules = {},
  //   icon: Icon,
  //   disabled = false
  // }) => (
  //   <div className="space-y-1">
  //     <Controller
  //       name={name}
  //       control={control}
  //       rules={rules}
  //       render={({ field }) => (
  //         <div className={`flex items-center gap-3 border-2 ${
  //           errors[name] ? 'border-red-300' : 'border-gray-200'
  //         } bg-white rounded-xl px-4 py-3 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300 hover:border-gray-300 ${
  //           disabled ? 'bg-gray-50' : ''
  //         }`}>
  //           <Icon className={`text-lg flex-shrink-0 ${
  //             disabled ? 'text-gray-300' : errors[name] ? 'text-red-400' : 'text-gray-400'
  //           }`} />
  //           <Select
  //           control={control}
  //           name={name}
  //             options={options}
  //             placeholder={placeholder}
  //             value={field.value}
  //             onChange={field.onChange}
  //             isDisabled={disabled}
  //           />
  //         </div>
  //       )}
  //     />
  //     {errors[name] && (
  //       <p className="text-red-500 text-xs mt-1 ml-1">{errors[name].message}</p>
  //     )}
  //   </div>
  // ));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaGraduationCap className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Personal Information
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Let's start with basic details
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                icon={IoPersonSharp}
                placeholder="First Name"
                name="firstName"
                rules={{
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                }}
              />
              <InputField
                icon={IoPersonSharp}
                placeholder="Middle Name"
                name="middleName"
              />
            </div>

            <InputField
              icon={IoPersonSharp}
              placeholder="Last Name"
              name="lastName"
              rules={{
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
              }}
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
            />

            <InputField
              icon={IoCalendarSharp}
              type="date"
              placeholder="Date of Birth"
              name="dateOfBirth"
              setDate={setValue}
              date={watchValues?.dateOfBirth}
              rules={{ required: "Date of birth is required" }}
              CustomComponent={MaskedDatePicker}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <IoSchoolSharp className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Academic Details
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Educational information
              </p>
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
            />

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                icon={FaRupeeSign}
                placeholder="Monthly Fees"
                name="fees"
                disabled
              />
              <InputField
                icon={IoCalendarSharp}
                placeholder="Tenure (Auto-calculated)"
                name="tenure"
                disabled
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <IoLocationSharp className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Contact Information
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Where can we reach you?
              </p>
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
            />
          </div>
        );

      default:
        return null;
    }
  };

  const steps = [1, 2, 3];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 justify-between items-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Add New Student
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Step {currentStep} of 3
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <MdClose className="text-gray-500 text-xl" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center">
              {steps.map((step) => (
                <React.Fragment key={step}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      step <= currentStep
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`flex-1 h-2 mx-2 rounded-full transition-all duration-300 ${
                        step < currentStep
                          ? "bg-gradient-to-r from-blue-500 to-purple-600"
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
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {renderStep()}

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
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 hover:shadow-md transition-all duration-200"
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
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Adding..." : "Add Student"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
