import * as React from "react";
import Downshift from "downshift";
import matchSorter from 'match-sorter';
import { MultiSelectStyles, ArrowIcon, XIcon } from "./MultiSelectStyles";

interface MultiSelectProps {
  onChange: (selection: any, stateAndHelpers: any) => void;
  onSelect?: (selection: any, stateAndHelpers: any) => void;
  itemToString: (item: any) => string;
  items: any[];
  label: string;
  zIndex?: number;
  render?: any;
}

class MultiSelect extends React.Component<MultiSelectProps, any> {
  state = {selectedItems: []};
  input: React.RefObject<HTMLInputElement> = React.createRef()

  stateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          highlightedIndex: state.highlightedIndex,
          isOpen: true,
          inputValue: '',
        }
      default:
        return changes
    }
  }

  handleSelection = (selectedItem, downshift) => {
    const callOnChange = () => {
      const {onSelect, onChange} = this.props
      const {selectedItems} = this.state
      if (onSelect) {
        onSelect(selectedItems, this.getStateAndHelpers(downshift))
      }
      if (onChange) {
        onChange(selectedItems, this.getStateAndHelpers(downshift))
      }
    }
    if (this.state.selectedItems.includes(selectedItem)) {
      this.removeItem(selectedItem, callOnChange)
    } else {
      this.addSelectedItem(selectedItem, callOnChange)
    }
  }

  removeItem = (item, cb?) => {
    this.setState(({selectedItems}) => {
      return {
        selectedItems: selectedItems.filter(i => i !== item),
      }
    }, cb)
  }
  addSelectedItem(item, cb) {
    this.setState(
      ({selectedItems}) => ({
        selectedItems: [...selectedItems, item],
      }),
      cb,
    )
  }

  getRemoveButtonProps = ({onClick, item, downshift, ...props} = {} as any) => {
    return {
      onClick: e => {
        // TODO: use something like downshift's composeEventHandlers utility instead
        onClick && onClick(e)
        e.stopPropagation()
        this.handleSelection(item, null)
        // this.removeItem(item, )
      },
      ...props,
    }
  }

  getStateAndHelpers(downshift) {
    const {selectedItems} = this.state
    const {getRemoveButtonProps, removeItem} = this
    return {
      getRemoveButtonProps,
      removeItem,
      selectedItems,
      ...downshift,
    }
  }

  
getItems(filter) {
  return filter
    ? matchSorter(this.props.items, filter, {
        keys: ['name'],
      })
    : this.props.items
}

  render() {
    const {render, children = render, ...props} = this.props
    // TODO: compose together props (rather than overwriting them) like downshift does
    return (
    <MultiSelectStyles>
      <Downshift
        {...props}
        stateReducer={this.stateReducer}
        onChange={this.handleSelection}
        selectedItem={null}
      >
        {({
            getLabelProps,
            getInputProps,
            getToggleButtonProps,
            getMenuProps,
            isOpen,
            inputValue,
            getItemProps,
            highlightedIndex,
            toggleMenu,
          }) => (
            <div style={{width: 500, margin: 'auto', position: 'relative', marginBottom: '1em'}}>
              <label {...getLabelProps()}>{props.label}</label>
              <div className="input-outer-wrapper"
                onClick={() => {
                  toggleMenu()
                  !isOpen && this.input.current.focus()
                }}
              >
                <div className="input-inner-wrapper">
                  {this.state.selectedItems.length > 0
                    ? this.state.selectedItems.map(item => (
                        <div className="added-item-wrapper"
                          key={item.id}
                        >
                          <div className="added-item"
                          >
                            <span>{item.name}</span>
                            <button
                              className="remove-button"
                              {...this.getRemoveButtonProps({item})}
                            >
                              𝘅
                            </button>
                          </div>
                        </div>
                      ))
                    : 'Select a value'}
                  <input
                    {...getInputProps({
                      ref: this.input,
                      onKeyDown(event) {
                        if (event.key === 'Backspace' && !inputValue) {
                          this.removeItem(this.state.selectedItems[this.state.selectedItems.length - 1])
                        }
                      },
                    })}
                  />
                </div>
                <button
                  className="control-button"
                  {...getToggleButtonProps({
                    // prevents the menu from immediately toggling
                    // closed (due to our custom click handler above).
                    onClick(event) {
                      event.stopPropagation()
                    },
                  })}
                >
                  <ArrowIcon isOpen={isOpen} />
                </button>
              </div>
              <ul style={{zIndex: props.zIndex ? props.zIndex : 0 }}>
                {isOpen
                  ? this.getItems(inputValue).map((item, index) => (
                      <li
                        key={item.id}
                        {...getItemProps({
                          item,
                          index,
                          // isActive: highlightedIndex === index,
                          // isSelected: this.state.selectedItems.includes(item),
                        } as any)}
                      >
                        {item.name}
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          )}
      </Downshift>
    </MultiSelectStyles>
    )
  }
}
/*
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
    </MultiSelectStyles>
  );
};
*/
export default MultiSelect;
