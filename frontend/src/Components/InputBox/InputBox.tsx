interface InputBoxProps {
  text: string;
  value: string;
  handleChange: (value: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ text, value, handleChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value);
  };

  let type = text;

  if (text === "password" || text === "Confirm Password") {
    type = "password";
  }

  if (text === "email") {
    type = "email";
  }

  return (
    <>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type={type}
          value={value}
          onChange={handleInputChange}
          className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          {text}
        </label>
      </div>
    </>
  );
};

export default InputBox;
