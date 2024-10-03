import { useController, UseControllerProps } from "react-hook-form";
import { useState, useEffect } from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: "number" | "text" | "password";
  disabled?: boolean;
  showInline?: boolean;
}

const Input = (props: UseControllerProps & InputProps) => {
  const {
    label,
    placeholder,
    defaultValue,
    type = "text",
    disabled,
    showInline,
  } = props;
  const { field, fieldState } = useController(props);

  const initialValue = field.value ?? defaultValue;

  const [input, setInput] = useState<string>(initialValue ?? "");

  useEffect(() => {
    if (type === "number") field.onChange(defaultValue ?? 0);
  }, []);

  return (
    <div
      className={`w-full ${showInline ? "inline-flex gap-2 items-center" : ""}`}
    >
      {label && (
        <label
          htmlFor={label}
          className={`block text-sm font-medium  ${
            disabled ? "text-gray-400" : "text-gray-700"
          }`}
        >
          <span className="inline-flex items-center">{label}</span>
        </label>
      )}
      <div className="relative mt-1 rounded-md shadow-sm inline-flex items-center w-full ">
        <input
          type={type === "password" ? type : "text"}
          className={` ${
            fieldState.error
              ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "focus:ring-gray-400 focus:border-gray-600 "
          } block w-full rounded-md sm:text-sm placeholder:text-slate-400 
           ${
             disabled
               ? "border-gray-300 text-gray-400"
               : "border-gray-500 text-gray-500"
           } min-h-[40px] border border-slate-500 px-3 `}
          placeholder={placeholder && placeholder}
          value={input}
          onChange={(e) => {
            if (type === "number") {
              if (
                (e.target.value.charCodeAt(e.target.value.length - 1) >= 48 &&
                  e.target.value.charCodeAt(e.target.value.length - 1) <= 57) ||
                (e.target.value.charCodeAt(e.target.value.length - 1) === 46 &&
                  !e.target.value
                    .slice(0, e.target.value.length - 1)
                    .includes(".")) ||
                e.target.value === ""
              ) {
                setInput(e.target.value);
                field.onChange(Number(e.target.value));
              }
            } else {
              setInput(e.target.value);
              field.onChange(e.target.value);
            }
          }}
          disabled={disabled}
        />

        {fieldState.error && (
          <>
            <p className="absolute -bottom-5 text-xs text-red-600 flex flex-shrink-0 ">
              {fieldState.error?.message}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
