type ButtonProps = {
  label: string;
  onClick: (e: React.FormEvent) => Promise<void>;
  disabled?: boolean;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        className
          ? className
          : `px-8 py-4 rounded-xl text-white w-full shadow-md
        ${disabled ? 'cursor-not-allowed' : ''}`
      }
      style={{
        background: disabled ? '#cccccc' : '#003366',
      }}
    >
      {label}
    </button>
  );
};
