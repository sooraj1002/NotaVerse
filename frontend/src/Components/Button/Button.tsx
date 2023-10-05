interface ButtonProps {
  title: string;
  customClass?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  title,
  customClass = "",
  onClick,
}) => {
  const buttonClass =
    "bg-blue-500 text-white font-bold rounded-full " + customClass;
  return (
    <button className={buttonClass} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
