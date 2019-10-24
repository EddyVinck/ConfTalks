import React, { useState, useContext } from "react";
import { FilterContext, initialFilters } from "../../pages";
import { conferences } from "../../data/conferences.json";
import { categories } from "../../data/talk_categories.json";
import { sortDatesDescending } from "../../utils/sorting/sortDatesDescending";
import debounce from "lodash-es/debounce";
import { FormStyles } from "../forms";
import { Menu, Item, Input, ControllerButton, ArrowIcon, XIcon } from "./DownshiftStyles";
import { Button } from "../generic";
import Downshift from 'downshift'

let conferencesList = [];

for (const key in conferences) {
  if (conferences.hasOwnProperty(key)) {
    const conf = conferences[key];
    conferencesList.push({ id: key, ...conf });
  }
}

let categoryList = [];

for (const key in categories) {
  if (categories.hasOwnProperty(key)) {
    const category = categories[key];
    categoryList.push({ id: key, ...category });
  }
}

conferencesList = sortDatesDescending(conferencesList, "start_date");

const TalkListFilters = () => {
  const { filters, setFilters } = useContext(FilterContext);

  const updateFilters = debounce((updates: Partial<initialFilters>) => {
    setFilters({
      ...filters,
      ...updates
    });
  });

  const resetFilters = () => {
    updateFilters(initialFilters);
  };

  return (
    <FormStyles>
      <label htmlFor="talk-title">Talk title</label>
      <input
        type="text"
        id="talk-title"
        name="talk-title"
        value={filters.talkTitle}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          updateFilters({ talkTitle: event.target.value });
        }}
      />
      <label htmlFor="speaker-name">Speaker name</label>
      <input
        type="text"
        id="speaker-name"
        name="speaker-name"
        value={filters.speakerName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          updateFilters({ speakerName: event.target.value });
        }}
      />
      {/* TODO make Downshift JSX more DRY */} 
      <Downshift
         onChange={selection => {
          updateFilters({ conference_id: selection === null ? null : selection.id });
        }}
          itemToString={item => (item ? item.name : '')}
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
              <label {...getLabelProps()}>Conference</label>
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
                    { conferencesList
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .filter(item => !inputValue || item.name.includes(inputValue))
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
      <Downshift
        onChange={selection => {
          updateFilters({ category_id: selection === null ? null : selection.id });
        }} 
        itemToString={item => (item ? item.name : '')}
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
            <label {...getLabelProps()}>Category</label>
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
            <div style={{position: 'relative', marginBottom: '1em'}}>
              {isOpen ? 
                <Menu {...getMenuProps()}>
                  { categoryList
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .filter(item => !inputValue || item.name.includes(inputValue))
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
      <label htmlFor="only-bookmarked-talks">
        Only bookmarked talks?
        <input
          checked={filters.onlyShowBookmarkedTalks}
          type="checkbox"
          id="only-bookmarked-talks"
          name="only-bookmarked-talks"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            updateFilters({ onlyShowBookmarkedTalks: event.target.checked })
          }
        />
      </label>
      <label htmlFor="only-recorded-talks">
        Only recorded talks?
        <input
          checked={filters.onlyShowRecordedTalks}
          type="checkbox"
          id="only-recorded-talks"
          name="only-recorded-talks"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            updateFilters({ onlyShowRecordedTalks: event.target.checked })
          }
        />
      </label>
      <Button variant="secondary" outline type="button" onClick={resetFilters}>
        Remove filters
      </Button>
    </FormStyles>
  );
};

export default TalkListFilters;
