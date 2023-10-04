interface ButtonProps {
  title: string;
  customClass?: string;
}

const Button: React.FC<ButtonProps> = ({ title, customClass = "" }) => {
  const buttonClass =
    "bg-blue-500 text-white font-bold rounded-full " + customClass;
  return <button className={buttonClass}>{title}</button>;
};

export default Button;
