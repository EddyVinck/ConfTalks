import React, { Fragment } from "react";
import { Button } from "../generic";

const TalkList = ({ talkList, toggleBookmark, itemsPerPage, offset }) => {
  const handleBookmark = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id
  ) => {
    event.preventDefault();
    toggleBookmark(id);
  };

  const itemsToShow = talkList.slice(offset, offset + itemsPerPage);
  return (
    <Fragment>
      {itemsToShow.map(talk => {
        let className = talk.video_url ? "has-video" : "no-video";
        className += talk.bookmarked ? " is-bookmarked" : "";
        return (
          <li key={talk.id} className={className}>
            <a
              href={talk.video_url || "#"}
              target="blank"
              rel="noopener"
              onClick={event => {
                if (!talk.video_url) {
                  event.preventDefault();
                  alert("There is no video submitted for this talk");
                }
              }}
            >
              <h3>{talk.main_title}</h3>
              <div className="horizontal-list-wrapper">
                <p className="horizontal-list-label">By:</p>
                <ul className="horizontal-list">
                  {talk.speakers.length ? (
                    talk.speakers.map(speaker => (
                      <li key={speaker.name}>{speaker.name}</li>
                    ))
                  ) : (
                    <li key="no-speakers">No speakers available</li>
                  )}
                </ul>
              </div>
              <div className="horizontal-list-wrapper">
                <p className="horizontal-list-label">Categories:</p>
                <ul className="horizontal-list">
                  {talk.categories.length ? (
                    talk.categories.map(category => (
                      <li key={category.name}>{category.name}</li>
                    ))
                  ) : (
                    <li key="no-categories">No categories available</li>
                  )}
                </ul>
              </div>
              <p>Upload date: {talk.video_upload_date}</p>
              <Button
                type="button"
                onClick={event => handleBookmark(event, talk.id)}
              >
                {talk.bookmarked ? "Remove bookmark" : "Bookmark"}
              </Button>
            </a>
          </li>
        );
      })}
    </Fragment>
  );
};

export default TalkList;
