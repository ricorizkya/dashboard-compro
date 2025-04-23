type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-4 rounded-xl text-white w-full shadow-md
        ${disabled ? 'cursor-not-allowed' : ''}`}
      style={{
        background: disabled ? '#cccccc' : '#003366',
      }}
    >
      {label}
    </button>
  );
};
