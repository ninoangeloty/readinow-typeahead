import React, { useEffect, useState } from "react";
import useOutsideClick from "../../shared/hooks/useOutsideClick";
import TypeaheadItem from "./typeahead-item";
import "./typeahead.css";

const TYPEAHEAD_MAX_ITEMS = 100;

interface TypeaheadProps {
  labelKey: string;
  descriptionKey?: string;
  placeholderText?: string;
  minimumLength?: number;
  maxItems?: number;
  className?: string;  
  data: Array<any>;
}

function onTextChange(
  text: string,
  minimumLength: number,
  setInputText: React.Dispatch<React.SetStateAction<string>>,
  setActive: React.Dispatch<React.SetStateAction<boolean>>
) {
  setInputText(text);
  if (text.length >= minimumLength) {
    setActive(true);
  } else {
    setActive(false);
  }
}

function Typeahead(props: TypeaheadProps) {
  const {
    placeholderText,
    data,
    minimumLength,
    className,
    maxItems,
    labelKey,
    descriptionKey
  } = props;

  const [inputText, setInputText] = useState("");
  const [active, setActive] = useState(false);
  let inputTextRef: HTMLInputElement | null;

  useEffect(() => {
    if (inputTextRef) {
      inputTextRef.focus();
    }
  });
  useOutsideClick(".select", () => setActive(false))

  const filteredData = data    
    .filter(
      (item) => item.name.toLowerCase().indexOf(inputText.toLowerCase()) > -1
    )
    .slice(0, maxItems ?? TYPEAHEAD_MAX_ITEMS);

  return (
    <div className={`select ${className}`}>
      <div className="select-body">
        <input
          ref={(ref) => {
            inputTextRef = ref;
          }}
          className="select-input"
          type="text"
          placeholder={placeholderText}
          value={inputText}
          onClick={() => {
            if (minimumLength === 0) {
              setActive(true);
            }
          }}
          onChange={(e) =>
            onTextChange(
              e.target.value,
              minimumLength ?? 0,
              setInputText,
              setActive
            )
          }
        ></input>
        {active && filteredData.length > 0 && (
          <div className="select-options">
            {filteredData.map((item: any) => {
              return (
                <TypeaheadItem
                  key={item.id}
                  id={item.id}
                  text={item[labelKey]}
                  description={descriptionKey ? item[descriptionKey] : ""}
                  searchText={inputText}
                  onSelect={(text) => {
                    setActive(false);
                    setInputText(text);
                    inputTextRef?.focus();
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Typeahead;
