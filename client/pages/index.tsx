import React, { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import Nav from "../components/nav";
import { getTalkList } from "../utils/data-formatting/getTalkList";
import { Form, Field, Formik } from "formik";
import findIndex from "lodash-es/findIndex";
// import useLocalStorage from "react-use-localstorage";
import * as gtag from "../utils/analytics/gtag";

const TalkList = styled.ol({
  maxWidth: "800px",
  width: "80%",
  margin: "0 auto",

  li: {
    a: {
      display: "block",
      color: "#000",
      textDecoration: "none",
      padding: "1rem 0.5rem",
      background: "white",
      borderBottom: "2px solid lightgray",
      "&: visited": {
        color: "#aaa"
      },
      "&:hover": {
        color: "blue"
      },
      "> p": {
        margin: "0.5rem 0 0.5rem"
      }
    },
    ".horizontal-list-wrapper": {
      marginBottom: "0.5rem"
    },
    "p.horizontal-list-label": {
      display: "inline-block",
      margin: "0 0.5rem 0 0"
    },
    ".horizontal-list": {
      display: "inline-flex",
      listStyle: "none",
      padding: 0,
      marginLeft: 0,
      "li + li": {
        "::before": {
          content: "', '",
          border: ""
        }
      }
    },
    "&.no-video": {
      // TODO
    }
  }
});

const getCurrentTalkBookmarks = () => {
  let bookmarkList = [];
  if (typeof window !== "undefined") {
    let bookmarks = localStorage.getItem("bookmarked_talks");
    if (bookmarks && typeof bookmarks === "string") {
      bookmarkList = bookmarks.split(",").map(str => Number(str));
    }
  }
  return bookmarkList;
};

const addTalkBookmark = talkId => {
  const talkBookmarks = getCurrentTalkBookmarks();
  if (talkBookmarks.includes(talkId) === false) {
    talkBookmarks.push(talkId);
  }
  localStorage.setItem("bookmarked_talks", talkBookmarks.join(","));
};
const removeTalkBookmark = talkId => {
  const talkBookmarks = getCurrentTalkBookmarks();
  if (talkBookmarks.includes(talkId)) {
    const index = talkBookmarks.indexOf(talkId);
    talkBookmarks.splice(index, 1);
  }
  localStorage.setItem("bookmarked_talks", talkBookmarks.join(","));
};

const getInitialState = () => {
  let talkList = getTalkList();

  const bookmarks = getCurrentTalkBookmarks();

  if (bookmarks && bookmarks.length) {
    talkList = talkList.map(talk => ({
      ...talk,
      bookmarked: bookmarks.includes(talk.id)
    }));
  }

  return talkList;
};

const Home = () => {
  const [talkList, setTalkList] = useState(getInitialState());

  const handleBookmark = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    talkId
  ) => {
    // prevent the link from opening
    event.preventDefault();

    let updatedTalkList = [...talkList];
    const index = findIndex(updatedTalkList, { id: talkId });
    const itemToUpdate = updatedTalkList[index];
    itemToUpdate.bookmarked = !itemToUpdate.bookmarked;

    itemToUpdate.bookmarked
      ? addTalkBookmark(itemToUpdate.id)
      : removeTalkBookmark(itemToUpdate.id);

    setTalkList(updatedTalkList);
  };

  return (
    <div>
      <Head>
        <title>ConfTalks.org</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <div className="hero">
        <h1>ConfTalks</h1>
        <p className="description">
          Do you ever look at conference programs and think: "I wish I could go,
          but I can't" or "only a few of these talks interest me, is this really
          worth my time?". ConfTalks is an open source attempt to solve this
          problem for free, by creating an index of conference talks that are
          already recorded and uploaded somewhere. You can bookmark talks so you
          can check up on them later to see if they have been uploaded already.
        </p>

        <section>
          <h2>Subscribe to the ConfTalks newsletter</h2>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={() => {
              // gtag.event({
              //   action: 'submit_form',
              //   category: 'Newsletter',
              //   label: email
              // })
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="email" name="email" />
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </section>

        <aside>
          <h2>Filters</h2>
        </aside>

        <TalkList>
          {talkList.map(talk => {
            let className = talk.video_url ? "has-video" : "no-video";
            className += talk.bookmarked ? " is-bookmarked" : "";
            return (
              <li key={talk.id} className={className}>
                <a href={talk.video_url} target="blank" rel="noopener">
                  <h2>{talk.main_title}</h2>
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
                  <button
                    type="button"
                    onClick={event => handleBookmark(event, talk.id)}
                  >
                    {talk.bookmarked ? "Remove bookmark" : "Bookmark"}
                  </button>
                </a>
              </li>
            );
          })}
        </TalkList>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }
        .card:hover {
          border-color: #067df7;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default Home;
