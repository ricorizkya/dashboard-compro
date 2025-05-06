interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const RadioGroup = ({
  options,
  selectedValue,
  onChange,
  className = '',
  disabled = false,
}: RadioGroupProps) => {
  const handleSelect = (value: string) => {
    if (!disabled) {
      onChange(value);
    }
  };

  return (
    <div className={`flex gap-4 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type='button'
          onClick={() => handleSelect(option.value)}
          className={`
            flex items-center gap-2 px-4 py-2 border-2 rounded-lg
            transition-colors duration-200
            ${
              selectedValue === option.value
                ? 'border-blue-800 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          disabled={disabled}
          aria-checked={selectedValue === option.value}
          role='radio'
        >
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
              ${
                selectedValue === option.value
                  ? 'border-blue-800 bg-blue-800'
                  : 'border-gray-400'
              }`}
          >
            {selectedValue === option.value && (
              <div className='w-2 h-2 bg-white rounded-full' />
            )}
          </div>
          <span
            className={
              selectedValue === option.value ? 'text-blue-800' : 'text-gray-700'
            }
          >
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default RadioGroup;
