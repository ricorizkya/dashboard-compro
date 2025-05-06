type ButtonProps = {
  label: string;
  onClick: (e: React.FormEvent) => Promise<void>;
  disabled?: boolean;
  className?: string;
  backgroundColor?: string;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  className,
  backgroundColor = '#003366',
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
        background: disabled ? '#cccccc' : backgroundColor,
      }}
    >
      {label}
    </button>
  );
};
