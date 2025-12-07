import React, { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { Select } from "../commonFunctions/CommonSelectFxn"; // update according to your path

const AddPayment = ({ isOpen, setIsOpen }) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      studentId: "",
      totalFees: "",
      paidAlready: "",
      paymentMode: "",
      amount: "",
    },
  });

  // Dummy student data (replace with API)
  const studentOptions = [
    { label: "Dhruv Shah", value: "1", totalFees: 12000, paid: 4000 },
    { label: "Harsh Patel", value: "2", totalFees: 15000, paid: 8000 },
    { label: "Krisha Mehta", value: "3", totalFees: 10000, paid: 2000 },
    { label: "Neel Trivedi", value: "4", totalFees: 18000, paid: 6000 },
    { label: "Riya Desai", value: "5", totalFees: 13000, paid: 3000 },
  ];

  const paymentModeOptions = [
    { label: "Cash", value: "Cash" },
    { label: "UPI", value: "UPI" },
    { label: "Online", value: "Online" },
    { label: "Card", value: "Card" },
    { label: "Cheque", value: "Cheque" },
  ];

  const selectedStudentId = watch("studentId");

  const selectedStudent = studentOptions.find(
    (s) => s.value === selectedStudentId
  );

  // Auto fill fees + paid
  React.useEffect(() => {
    if (selectedStudent) {
      setValue("totalFees", selectedStudent.totalFees);
      setValue("paidAlready", selectedStudent.paid);
    }
  }, [selectedStudent, setValue]);

  const handleClose = useCallback(() => {
    reset();
    setIsOpen(false);
  }, [reset, setIsOpen]);

  const onSubmit = (data) => {
    console.log("Payment Data: ", data);
    handleClose();
  };

  const InputField = React.memo(
    ({
      // eslint-disable-next-line no-unused-vars
      Icon,
      type = "text",
      placeholder,
      name,
      rules = {},
      disabled = false,
      prefix,
      CustomComponent,
      setDate,
      date,
      className,
      control,
      errors,
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
                  {/* {!CustomComponent && (
                    <Icon
                      className={`text-lg flex-shrink-0 ${
                        disabled
                          ? "text-gray-300"
                          : errors[name]
                          ? "text-red-400"
                          : "text-gray-400"
                      }`}
                    />
                  )} */}
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
                  className={className}
                  placeholder={placeholder}
                  // className={`w-full outline-none text-sm bg-transparent ${
                  //   disabled ? "text-gray-400" : ""
                  // }`}
                />
              )}
            </>
          )}
        />
        {errors[name] && (
          <p className="text-red-500 text-xs mt-1 ml-1">{errors[name].message}</p>
        )}
      </div>
    )
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto p-6 transition-all duration-300">

        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Add Payment
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <MdClose className="text-gray-600 text-xl" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">

          {/* Student Dropdown */}
          <Select
            name="studentId"
            placeholder="Select Student"
            control={control}
            options={studentOptions}
            icon={IoPersonSharp}
            rules={{ required: "Student is required" }}
            errors={errors}
          />

          {/* Total Fees (readonly) */}
          <InputField
            icon={FaRupeeSign}
            name="totalFees"
            placeholder="Total Fees"
            type="number"
            disabled
            control={control}
            errors={errors}
          />

          {/* Paid Already (readonly) */}
          <InputField
            icon={FaRupeeSign}
            name="paidAlready"
            placeholder="Already Paid"
            type="number"
            disabled
            control={control}
            errors={errors}
          />

          {/* Payment Mode */}
          <Select
            name="paymentMode"
            placeholder="Payment Mode"
            control={control}
            options={paymentModeOptions}
            icon={FaRupeeSign}
            rules={{ required: "Payment mode is required" }}
            errors={errors}
          />

          {/* Amount input */}
          <InputField
            icon={FaRupeeSign}
            name="amount"
            placeholder="Enter Amount"
            type="number"
            rules={{
              required: "Amount is required",
              min: { value: 1, message: "Amount must be greater than 0" },
            }}
            control={control}
            errors={errors}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Add Payment"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddPayment;
