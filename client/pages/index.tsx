import React, { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import styled from "styled-components";
import Nav from "../components/nav";
import { getTalkList } from "../utils/data-formatting/getTalkList";
import { Form, Field, Formik } from "formik";
import findIndex from "lodash-es/findIndex";
import * as gtag from "../utils/analytics/gtag";
import { Container, Section, ContentWrapper, Hero } from "../components/layout";
import {
  TalkListStyles,
  TalkListLayout,
  FilterStyles,
  TalkList,
  TalkListFilters
} from "../components/TalkList";
import { NewsletterForm } from "../components/forms/Newsletter";

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

const addTalkBookmark = (talkId: number) => {
  const talkBookmarks = getCurrentTalkBookmarks();
  if (talkBookmarks.includes(talkId) === false) {
    talkBookmarks.push(talkId);
  }
  localStorage.setItem("bookmarked_talks", talkBookmarks.join(","));
};

const removeTalkBookmark = (talkId: number) => {
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

const HeadTags = () => (
  <Head>
    <title>ConfTalks.org</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

const Home = () => {
  const [talkList, setTalkList] = useState(getInitialState());

  const toggleBookmark = (talkId: number) => {
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
    <Fragment>
      <HeadTags />
      <header>
        <Nav />
      </header>
      <main>
        <Hero className="hero">
          <Container>
            <ContentWrapper variant="center">
              <div style={{ textAlign: "center" }}>
                <h1>ConfTalks</h1>
                <p className="description">
                  Do you ever look at conference programs and think:{" "}
                  <i>"I wish I could go, but I can't"</i> or{" "}
                  <i>"only a few of these talks interest me"</i> or{" "}
                  <i>"I don't know if it is worth my time"</i>? ConfTalks is an
                  open source index of scheduled or already recorded talks to
                  help you decide if you should go.
                </p>
              </div>
            </ContentWrapper>
            <section>
              <NewsletterForm />
            </section>
          </Container>
        </Hero>

        <Container>
          <Section>
            <h2>Conference Talks</h2>
            <TalkListLayout>
              <aside>
                <FilterStyles>
                  <h2>Filters</h2>
                  <TalkListFilters />
                </FilterStyles>
                <p>
                  <b>Tip!</b> You can bookmark talks so you can check up on them
                  later to see if they have been uploaded already. Bookmarks are
                  stored on your current device.
                </p>
              </aside>
              <div className="talk-list">
                <TalkListStyles>
                  <TalkList
                    talkList={talkList}
                    toggleBookmark={toggleBookmark}
                  />
                </TalkListStyles>
              </div>{" "}
            </TalkListLayout>
          </Section>
        </Container>
      </main>
    </Fragment>
  );
};

export default Home;
