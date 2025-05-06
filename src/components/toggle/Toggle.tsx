import { useState } from 'react';

interface ToggleProps {
  isOn?: boolean;
  onToggle?: (isActive: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: {
    active: string;
    inactive: string;
    thumb: string;
  };
  labels?: {
    active: string;
    inactive: string;
  };
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

const Toggle = ({
  isOn: externalIsOn,
  onToggle,
  size = 'md',
  colorScheme = {
    active: 'bg-blue-500',
    inactive: 'bg-gray-300',
    thumb: 'bg-white',
  },
  labels,
  disabled = false,
  className = '',
  ariaLabel = 'Toggle switch',
}: ToggleProps) => {
  const [internalIsOn, setInternalIsOn] = useState(false);
  const isControlled = externalIsOn !== undefined;
  const isActive = isControlled ? externalIsOn : internalIsOn;

  const sizeClasses = {
    sm: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translation: 'translate-x-5',
    },
    md: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translation: 'translate-x-7',
    },
    lg: {
      track: 'w-16 h-8',
      thumb: 'w-7 h-7',
      translation: 'translate-x-8',
    },
  };

  const handleToggle = () => {
    if (!disabled) {
      if (!isControlled) {
        setInternalIsOn(!isActive);
      }
      onToggle?.(!isActive);
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        role='switch'
        aria-checked={isActive}
        aria-label={ariaLabel}
        onClick={handleToggle}
        disabled={disabled}
        className={`relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none ${
          sizeClasses[size].track
        } ${isActive ? colorScheme.active : colorScheme.inactive} ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <span
          className={`rounded-full shadow-sm transform transition-transform duration-200 ${
            sizeClasses[size].thumb
          } ${colorScheme.thumb} ${
            isActive ? sizeClasses[size].translation : 'translate-x-1'
          }`}
        />
      </button>

      {labels && (
        <span
          className={`text-sm ${disabled ? 'text-gray-400' : 'text-gray-700'}`}
        >
          {isActive ? labels.active : labels.inactive}
        </span>
      )}
    </div>
  );
};

export default Toggle;
