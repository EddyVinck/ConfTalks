import React, { Fragment } from "react";
import { Button } from "../generic";
import { getYouTubeIdFromUrl } from "../../utils/youtube/getYouTubeIdFromUrl";
import LinkButton from "../generic/LinkButton";

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
        const youTubeId = getYouTubeIdFromUrl(talk.video_url);
        let className = youTubeId ? "has-video" : "no-video";
        const validUrl = talk.video_url !== "" && youTubeId;
        className += talk.bookmarked ? " is-bookmarked" : "";
        return (
          <li key={talk.id} className={className}>
            <div className="talk">
              <h3>
                {validUrl ? (
                  <a href={talk.video_url}>{talk.main_title}</a>
                ) : (
                  <>{talk.main_title}</>
                )}
              </h3>
              <div className="talk-info">
                <div className="details-wrapper">
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
                  {!validUrl && (
                    <p>
                      <i>
                        No link available for this talk (ID: {talk.id}). If you
                        think this talk is available please contribute the URL.
                      </i>
                    </p>
                  )}
                  <div className="talk-buttons-wrapper">
                    <Button
                      type="button"
                      onClick={event => handleBookmark(event, talk.id)}
                    >
                      {talk.bookmarked
                        ? "Remove bookmark"
                        : !validUrl
                        ? "bookmark for later"
                        : "bookmark"}
                    </Button>
                    {youTubeId && (
                      <LinkButton variant="secondary" href={talk.video_url}>
                        Watch video
                      </LinkButton>
                    )}
                    {!validUrl && (
                      <LinkButton
                        href={`https://github.com/EddyVinck/ConfTalks/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+talk+${talk.id}`}
                        target="_blank"
                        variant="tertiary"
                      >
                        Contribute
                      </LinkButton>
                    )}
                  </div>
                </div>
                <div className="thumbnail-wrapper">
                  {youTubeId && (
                    <a href={talk.video_url} target="_blank">
                      <img
                        // https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
                        // mqdefault stands for medium quality and is 16:9
                        src={`https://img.youtube.com/vi/${youTubeId}/mqdefault.jpg`}
                        title={`Watch "${talk.main_title}" on YouTube`}
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
      {itemsToShow.length < 1 && (
        <p>No conference talks found for your current filters.</p>
      )}
    </Fragment>
  );
};

export default TalkList;
