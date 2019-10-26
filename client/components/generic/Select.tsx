import React from "react";
import Downshift from "downshift"
import { SelectStyles, ArrowIcon, XIcon } from "./SelectStyles";

interface SelectProps {
  onChange: (selection: any) => void;
  itemToString: (item: any) => string;
  items: any[];
  label: string;
  zIndex?: number;
}

const Select = (props: SelectProps) => {
  return (
    <SelectStyles>
      <Downshift
          onChange={ selection => props.onChange(selection) }
          itemToString={ item => props.itemToString(item) }
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            getToggleButtonProps,
            clearSelection,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
            itemToString,
          }) => (
            <div>
              <label {...getLabelProps()}>{props.label}</label>
              <div className="select-input-wrapper">
                <input type="text" {...getInputProps()} />
                {selectedItem ? (
                  <button
                    onClick={(e) => clearSelection()}
                    aria-label="clear selection"
                  >
                    <XIcon />
                  </button>
                ) : (
                  <button {...getToggleButtonProps()}>
                    <ArrowIcon isOpen={isOpen} />
                  </button>
                )}
              </div>
              <div className="select-list-wrapper" style={{zIndex: props.zIndex ? props.zIndex : 0 }}>
                {isOpen ? 
                  <ul {...getMenuProps()}>
                    { props.items
                      .sort((a, b) => props.itemToString(a).localeCompare(props.itemToString(b)))
                      .filter(item => !inputValue || props.itemToString(item).toLowerCase().includes(inputValue.toLowerCase()))
                      .map((item, index) => (
                        <li
                          {...getItemProps({
                            key: item.id,
                            index,
                            item,
                            className: `${highlightedIndex === index ? 'highlighted' : ''} ${selectedItem === item ? 'selected' : ''}`
                          })}
                        >
                          {itemToString(item)}
                        </li>
                      )) }
                  </ul>
                : null}
              </div>
          </div>
        )}
      </Downshift>
    </SelectStyles>
  );
};

export default Select;
