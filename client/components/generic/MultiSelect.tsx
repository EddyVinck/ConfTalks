import * as React from "react";
import Downshift from "downshift";
import matchSorter from "match-sorter";
import { MultiSelectStyles, ArrowIcon } from "./MultiSelectStyles";
import { useRef } from "react";

interface MultiSelectProps {
  onSelect: (selection: any) => void;
  itemToString: (item: any) => string;
  itemFilterKeys: string[];
  items: any[];
  selectedItemIds: any[];
  label: string;
  zIndex?: number;
}

const MultiSelect = (props: MultiSelectProps) => {
  const input = useRef(null);

  const stateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          highlightedIndex: state.highlightedIndex,
          isOpen: true,
          inputValue: "",
        }
      default:
        return changes;
    }
  }

  const handleSelection = (selectedItem) => {
    props.onSelect(selectedItem);
  }
  
  const getRemoveButtonProps = ({onClick, item, ...props} = {} as any) => {
    return {
      onClick: e => {
        onClick && onClick(e)
        e.stopPropagation()
        handleSelection(item)
      },
      ...props,
    };
  }
    
  const getItems = (filter) => {
    return filter
      ? matchSorter(props.items, filter, {
          keys: props.itemFilterKeys,
        })
      : props.items;
  }

  return (
    <MultiSelectStyles>
      <Downshift
        {...props}
        stateReducer={stateReducer}
        onChange={handleSelection}
        selectedItem={null}
      >
        {({
            getLabelProps,
            getInputProps,
            getToggleButtonProps,
            isOpen,
            inputValue,
            getItemProps,
            highlightedIndex,
            toggleMenu,
          }) => (
            <div style={{margin: "auto", position: "relative", marginBottom: "1em"}}>
              <label {...getLabelProps()}>{props.label}</label>
              <div className="input-outer-wrapper"
                onClick={() => {
                  toggleMenu()
                  !isOpen && input.current.focus()
                }}
              >
                <div className="input-inner-wrapper">
                  {props.selectedItemIds.length > 0
                    ? props.items.filter(item => props.selectedItemIds.includes(item.id)).map(item => (
                        <div className="added-item-wrapper"
                          key={item.id}
                        >
                          <div className="added-item"
                          >
                            <span>{props.itemToString(item)}</span>
                            <button
                              className="remove-button"
                              {...getRemoveButtonProps({item})}
                            >
                              𝘅
                            </button>
                          </div>
                        </div>
                      ))
                    : ""}
                    <div>
                      <input
                        {...getInputProps({
                          ref: input,
                          onKeyDown(event) {
                            if (event.key === "Backspace" && !inputValue) {
                              handleSelection(props.items.find(item => item.id === props.selectedItemIds[props.selectedItemIds.length - 1]))
                            }
                          },
                        })}
                      />
                    </div>
                </div>
                <button
                  className="control-button"
                  {...getToggleButtonProps({
                    onClick(event) {
                      event.stopPropagation()
                    },
                  })}
                >
                  <ArrowIcon isOpen={isOpen} />
                </button>
              </div>
              {isOpen
                ? (
                <ul style={{zIndex: props.zIndex ? props.zIndex : 0 }}>
                  {getItems(inputValue).map((item, index) => (
                        <li
                          key={item.id}
                          {...getItemProps({
                            item,
                            index,
                          } as any)}
                          className={`${highlightedIndex === index ? "active" : ""} 
                                    ${props.selectedItemIds.includes(item.id) ? "selected" : ""}`}
                        >
                          {item.name}
                        </li>
                      ))}
                </ul>
              )  : null}
            </div>
          )}
      </Downshift>
    </MultiSelectStyles>
  )
}
export default MultiSelect;
