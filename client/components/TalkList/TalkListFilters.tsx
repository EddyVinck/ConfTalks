import React from "react";

const TalkListFilters = () => {
  return (
    <div>
      <label htmlFor="only-recorder-talks">
        Only recorded talks?
        <input
          checked={true}
          type="checkbox"
          id="only-recorder-talks"
          name="only-recorder-talks"
        />
      </label>
      <label htmlFor="speaker-name">Speaker name</label>
      <input type="text" id="speaker-name" name="speaker-name" />
      <label htmlFor="conference-name">Conference Name</label>
      <select name="conference-name" id="conference-name">
        <option value="1">JSCONF EU 2019</option>
      </select>
    </div>
  );
};

export default TalkListFilters;
