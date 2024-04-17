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

  useEffect(() => {
    setclassName(props.vital ? "Flagtrue": "Flagfalse")
  })

  const [className, setclassName] = useState(props.vital ? "Flagtrue": "Flagfalse");
  return (
    <div className="TaskNameHeader">
      <form className="TaskNameHeaderForm" action="">
        <div id="taskHeaderName">Задача № {props.typeOfWindow === "simple" ? props.task.task_num + 1 : ""}</div>
      </form>
      <img
        onClick={(e) => {
          let ChangedTask = props.task
          ChangedTask.vital = props.task.vital === 1 ? 0 : 1
          props.setTask(ChangedTask)
          props.setVital(!props.vital)
          props.setChanged(true)
          setclassName("Flag" + ChangedTask.vital);
        }}
        src={`${process.env.PUBLIC_URL}/img/flag.svg`}
        alt="Pict"
        className={className}
      />
    </div>
  );
};

export default TaskWindowHeader;
