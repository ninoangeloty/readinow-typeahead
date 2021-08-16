import React from "react";

interface TypeaheadItemProps {
  id: string;
  text: string;
  description?: string;
  searchText?: string;
  onSelect?: (text: string) => void;
}

function transformText(text: string, searchText?: string) {  
  let newText = text;
  if (searchText) {
    const index = text.toLowerCase().indexOf(searchText.toLowerCase());
    if (index > -1) {
      const preText = `${text.substr(0, index)}`;
      const postText = `${text.substr((index + searchText.length), (text.length - (index + 1)))}`;
      const highlightText = `${text.substr(index, searchText.length)}`;
      newText = `${preText}<strong>${highlightText}</strong>${postText}`;
    }
  }
  return { __html: newText };
}

function TypeaheadItem(props: TypeaheadItemProps) {
  const { text, description, searchText, onSelect } = props;
  return (
    <div
      className="select-item"
      onClick={() => {
        if (onSelect) {
          onSelect(text);
        }
      }}
    >
      <div dangerouslySetInnerHTML={transformText(text, searchText)}></div>
      {description && <div className="select-item-description text-truncate">{description}</div>}
    </div>
  );
}

export default TypeaheadItem;
