import React, { useState, useRef, useEffect } from 'react';
import { BsChevronDown } from 'react-icons/bs';

type DropdownProps = {
  options: { value: string; label: string }[];
  placeholder?: string;
  multiple?: boolean;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  className?: string;
};

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = 'Select an option',
  multiple = false,
  value,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setSelectedValues(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    let newValues = [...selectedValues];
    if (multiple) {
      if (newValues.includes(optionValue)) {
        newValues = newValues.filter((v) => v !== optionValue);
      } else {
        newValues.push(optionValue);
      }
    } else {
      newValues = [optionValue];
      setIsOpen(false);
    }

    setSelectedValues(newValues);
    onChange?.(multiple ? newValues : newValues[0]);
  };

  const displayValue =
    selectedValues.length > 0
      ? selectedValues
          .map((v) => options.find((o) => o.value === v)?.label)
          .join(', ')
      : placeholder;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={`shadow-md w-full px-6 py-3 border-2 border-gray-400 rounded-xl focus:outline-none focus:border-gray-600 text-left flex justify-between items-center ${
          isOpen ? 'border-gray-600' : ''
        }`}
      >
        <span className='truncate'>{displayValue}</span>
        <BsChevronDown
          className={`transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          } `}
          color='#868A92'
        />
      </button>

      {isOpen && (
        <div className='absolute z-10 w-full mt-2 bg-white border-2 border-gray-400 rounded-xl shadow-md overflow-hidden'>
          <div className='max-h-60 overflow-y-auto'>
            {options.map((option) => (
              <button
                key={option.value}
                type='button'
                onClick={() => toggleOption(option.value)}
                className={`w-full px-6 py-3 text-left hover:bg-gray-100 focus:outline-none ${
                  selectedValues.includes(option.value)
                    ? 'bg-gray-100 font-semibold'
                    : ''
                }`}
              >
                {multiple && (
                  <input
                    type='checkbox'
                    checked={selectedValues.includes(option.value)}
                    readOnly
                    className='mr-3 accent-gray-600'
                  />
                )}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
