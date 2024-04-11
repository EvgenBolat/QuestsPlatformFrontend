import { useEffect, useState } from "react";
import "./BlockNameForm.css";
import { useParams } from "react-router-dom";

const BlockNameForm = (props: any) => {
  const userid = localStorage.getItem("id")
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

    const onBlur = async (e: any) => {
      setDirty(true);
      const response = await fetch(
        `https://quests.projectswhynot.site/api/v1/block/${props.currentCard.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            auth_token: userid,
            block_name: name.value,
            block_num: props.currentCard.block_num,
            block_type: props.currentCard.block_type,
            min_tasks: props.currentCard.min_tasks,
          }),
        }
      )
        .then((response) => response.json())
        .catch((error) => console.log(error));
      if (response.status === "OK") {
        console.log("ok");
      }
      console.log(response)
    };

    return {
      value,
      onChange,
      onBlur,
      isDirty,
      ...valid,
    };
  };

  const name = useInput(props.currentCard.block_name, { isEmpty: true });

  return (
    <div className="TaskBlockName">
      <form className="BlockNameForm" action="">
        <input
          type="text"
          value={name.value}
          placeholder="Название"
          max={15}
          name=""
          id="1"
          onChange={(e) => name.onChange(e)}
          onBlur={(e) => name.onBlur(e)}
        />
      </form>
      <button
        onClick={(e) => {
          props.setActionMenuOpen(true);
          props.setLeftPosition(e.clientX);
          props.setTopPosition(e.clientY);
        }}
        className="ActionButton"
      >
        <img src={`${process.env.PUBLIC_URL}/img/ActionButton.svg`} alt="" />
      </button>
    </div>
  );
};

export default BlockNameForm;
