import { useEffect, useState } from "react";
import "./TaskWindowHeader.css";

const TaskWindowHeader = (props: any) => {
  const useValtidation = (value: any, validations: any) => {
    const [isEmpty, setEmpty] = useState(true);
    const [inputValid, setInputValid] = useState(false);
    useEffect(() => {
      for (const validation in validations) {
        switch (validation) {
          case "isEmpty":
            value ? setEmpty(false) : setEmpty(true);
            break;
        }
      }
    }, [value, validations]);

    useEffect(() => {
      if (isEmpty) {
        setInputValid(false);
      } else {
        setInputValid(true);
      }
    }, [isEmpty]);

    return {
      isEmpty,
      inputValid,
    };
  };

  const useInput = (initialValue: any, validation: any) => {
    const [value, setValue] = useState(initialValue);

    const [isDirty, setDirty] = useState(false);
    const valid = useValtidation(value, validation);
    const onChange = (e: any) => {
      setValue(e.target.value);
    };

    const onBlur = (e: any) => {
      setDirty(true);
    };

    return {
      value,
      onChange,
      onBlur,
      isDirty,
      ...valid,
    };
  };

  const [className, setclassName] = useState("Flagfalse");
  const name = useInput("", { isEmpty: true });
  return (
    <div className="TaskNameHeader">
      <form className="TaskNameHeaderForm" action="">
        <input
          type="text"
          value={name.value}
          placeholder="Задача"
          name=""
          id="1"
          onChange={(e) => name.onChange(e)}
          onBlur={(e) => name.onBlur(e)}
        />
      </form>
      <img
        onClick={(e) => {
          props.setIsRequired(!props.isRequired);
          setclassName("Flag" + !props.isRequired)
        }}
        src={`${process.env.PUBLIC_URL}/img/flag.svg`}
        alt="Pict"
        className={className}
      />
    </div>
  );
};

export default TaskWindowHeader;
