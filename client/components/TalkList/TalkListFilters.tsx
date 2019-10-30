import React, { useState, useContext, useRef } from "react";
import { FilterContext, initialFilters } from "../../pages";
import { conferences } from "../../data/conferences.json";
import { categories } from "../../data/talk_categories.json";
import { sortDatesDescending } from "../../utils/sorting/sortDatesDescending";
import debounce from "lodash-es/debounce";
import { FormStyles } from "../forms";
import { Button } from "../generic";
import MultiSelect from "../generic/MultiSelect";

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

categoryList = categoryList.sort((a, b) => a.name.localeCompare(b.name))

conferencesList = conferencesList.sort((a, b) => a.name.localeCompare(b.name))

const TalkListFilters = () => {
  const { filters, setFilters } = useContext(FilterContext);
  const updateFilters = debounce((updates: Partial<initialFilters>) => {
    setFilters({
      ...filters,
      ...updates
    });
  });

  const handleConferenceSelect = (selectedItem: any) => {
    if (filters.conference_ids.includes(selectedItem.id)) {
      updateFilters({ conference_ids: filters.conference_ids.filter(id => id !== selectedItem.id) });
    } else {
      updateFilters({ conference_ids: [...filters.conference_ids, selectedItem.id] });
    }
  }

  const handleCategorySelect = (selectedItem: any) => {
    if (filters.category_ids.includes(selectedItem.id)) {
      updateFilters({ category_ids: filters.category_ids.filter(id => id !== selectedItem.id) });
    } else {
      updateFilters({ category_ids: [...filters.category_ids, selectedItem.id] });
    }
  }

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
      <MultiSelect label="Conference"
              items={conferencesList}
              itemFilterKeys={["name"]}
              itemToString={item => (item ? item.name : "")}
              onSelect={handleConferenceSelect}
              selectedItemIds={filters.conference_ids}
              zIndex={1} />
      <MultiSelect label="Category"
              items={categoryList}
              itemFilterKeys={["name"]}
              itemToString={item => (item ? item.name : "")}
              onSelect={handleCategorySelect}
              selectedItemIds={filters.category_ids} />
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
