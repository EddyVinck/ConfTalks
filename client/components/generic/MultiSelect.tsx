import * as React from "react";
import Downshift from "downshift";
import matchSorter from 'match-sorter';
import { MultiSelectStyles, ArrowIcon } from "./MultiSelectStyles";

interface MultiSelectProps {
  onChange: (selection: any, stateAndHelpers: any) => void;
  itemToString: (item: any) => string;
  items: any[];
  label: string;
  zIndex?: number;
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

  reset = () => {
    this.setState({selectedItems: []})
  }

  handleSelection = (selectedItem, downshift) => {
    const callOnChange = () => {
      const {onChange} = this.props
      const {selectedItems} = this.state
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

  getRemoveButtonProps = ({onClick, item, ...props} = {} as any) => {
    return {
      onClick: e => {
        onClick && onClick(e)
        e.stopPropagation()
        this.handleSelection(item, null)
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
    const {...props} = this.props
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
              isOpen,
              inputValue,
              getItemProps,
              highlightedIndex,
              toggleMenu,
            }) => (
              <div style={{margin: 'auto', position: 'relative', marginBottom: '1em'}}>
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
                      : ''}
                      <div>
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
                    {this.getItems(inputValue).map((item, index) => (
                          <li
                            key={item.id}
                            {...getItemProps({
                              item,
                              index,
                            } as any)}
                            className={`${highlightedIndex === index ? 'active' : ''} 
                                      ${this.state.selectedItems.includes(item) ? 'selected' : ''}`}
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
}
export default MultiSelect;
