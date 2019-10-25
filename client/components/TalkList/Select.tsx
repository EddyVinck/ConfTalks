import React from "react";
import Downshift from 'downshift'
import { Input, ControllerButton, XIcon, Menu, Item, ArrowIcon } from "./DownshiftStyles";

interface SelectProps {
  onChange: (selection: any) => void;
  itemToString: (item: any) => string;
  items: any[];
  label: string;
}

const Select = (props: SelectProps) => {
  return (
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
            <div style={{position: 'relative'}}>
              <Input style={{ marginBottom: '1px', paddingRight: '32px' }} type="text" {...getInputProps()} />
              {selectedItem ? (
                <ControllerButton
                  onClick={(e) => clearSelection()}
                  aria-label="clear selection"
                >
                  <XIcon />
                </ControllerButton>
              ) : (
                <ControllerButton {...getToggleButtonProps()}>
                  <ArrowIcon isOpen={isOpen} />
                </ControllerButton>
              )}
            </div>
            <div style={{position: 'relative', marginBottom: '1em', zIndex: 1}}>
              {isOpen ? 
                <Menu {...getMenuProps()}>
                  { props.items
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .filter(item => !inputValue || item.name.toLowerCase().includes(inputValue.toLowerCase()))
                    .map((item, index) => (
                      <Item
                        {...getItemProps({
                          key: item.id,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index ? 'lightgray' : 'white',
                            fontWeight: selectedItem === item ? 'bold' : 'normal',
                          },
                        })}
                      >
                        {itemToString(item)}
                      </Item>
                    )) }
                </Menu>
              : null}
            </div>
        </div>
      )}
    </Downshift>
  );
};

export default Select;
