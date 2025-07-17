import React from 'react';
import ReactSelect from 'react-select';
import { Controller } from 'react-hook-form';
import { dropdownStyles } from '../CommonCSS/CommonStyles';

export const Select = ({
  name,
  control,
  errors,
  options,
  placeholder,
  isDisabled = false,
  icon: Icon,
  rules = {},
}) => {
  

  const hasError = !!errors[name];

  return (
    <div className="space-y-1">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const selectedOption =
            options.find((opt) => opt.value === field.value) || null;

          return (
            <div
              className={`flex items-center gap-3 border-2 ${
                hasError ? 'border-red-300' : 'border-gray-200'
              } bg-white rounded-xl  shadow-sm px-2 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300 hover:border-gray-300 ${
                isDisabled ? 'bg-gray-50' : ''
              }`}
            >
              {Icon && (
                <Icon
                  className={`text-lg flex-shrink-0 ${
                    isDisabled
                      ? 'text-gray-300'
                      : hasError
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }`}
                />
              )}

              <ReactSelect
                {...field}
                options={options}
                value={selectedOption}
                onChange={(selected) =>
                  field.onChange(selected ? selected.value : '')
                }
                placeholder={placeholder}
                isDisabled={isDisabled}
                styles={dropdownStyles}
                classNamePrefix="react-select"
                className="w-full text-sm"
              />
            </div>
          );
        }}
      />

      {hasError && (
        <p className="text-red-500 text-xs mt-1 ml-1">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};
