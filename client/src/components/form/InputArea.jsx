import Label from "./Label";

const InputArea = ({
  name,
  label,
  type = "text",
  rules,
  Icon,
  register,
  readOnly,
  defaultValue,
  autoComplete,
  placeholder,
  maxLength,
}) => {
  return (
    <>
      <Label label={label} />

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-800 sm:text-base">
              <Icon />
            </span>
          </div>
        )}

        <input
          type={type}
          readOnly={readOnly}
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoComplete={autoComplete}
          maxLength={maxLength}
          {...register(name, rules)}   // ✅ SINGLE register call
          className={`${
            Icon ? "py-2 pl-10" : "py-2 px-4 md:px-5"
          } w-full appearance-none border text-sm opacity-75 text-input rounded-md
          placeholder-body min-h-12 transition duration-200 ease-in-out bg-white
          border-gray-200 focus:outline-none focus:border-emerald-500
          h-11 md:h-12 ${
            readOnly ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""
          }`}
        />
      </div>
    </>
  );
};

export default InputArea;
