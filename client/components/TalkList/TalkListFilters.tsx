import React, { useState, useContext } from "react";
import { FilterContext, initialFilters } from "../../pages";
import { conferences } from "../../data/conferences.json";
import { categories } from "../../data/talk_categories.json";
import { sortDatesDescending } from "../../utils/sorting/sortDatesDescending";
import debounce from "lodash-es/debounce";
import { FormStyles } from "../forms";
import { Button } from "../generic";

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
      <label htmlFor="conference-name">Conference</label>
      <select
        name="conference-name"
        id="conference-name"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          updateFilters({ conference_id: event.target.value });
        }}
      >
        <option value="">Any conference</option>
        {conferencesList
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(conf => (
            <option key={conf.id} value={conf.id}>
              {conf.name}
            </option>
          ))}
      </select>
      <label htmlFor="category-name">Category</label>
      <select
        name="category-name"
        id="category-name"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          updateFilters({ category_id: event.target.value });
        }}
      >
        <option value="">Any category</option>
        {categoryList
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
      </select>
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
