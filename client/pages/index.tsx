import React, {
  useState,
  useEffect,
  Fragment,
  Dispatch,
  SetStateAction
} from "react";
import Head from "next/head";
import Nav from "../components/nav";
import { getTalkList } from "../utils/data-formatting/getTalkList";
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

interface Conference {
  id: number;
  end_date: string;
  locations: string[];
  name: string;
  start_date: string;
}

interface Speaker {
  id: number;
  name: string;
}

interface Talk {
  alternative_titles: string[];
  bookmarked: boolean;
  categories: string[];
  conferences: Conference[];
  id: number;
  main_title: string;
  speakers: Speaker[];
  video_upload_date: string;
  video_url: string;
}

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
  let talkList: Talk[] = getTalkList();
  const bookmarks = getCurrentTalkBookmarks();

  if (bookmarks && bookmarks.length) {
    talkList = talkList.map(talk => ({
      ...talk,
      bookmarked: bookmarks.includes(talk.id)
    }));
  }

  return talkList;
};

export const initialFilters = {
  onlyShowRecordedTalks: false,
  speakerName: "",
  conference_id: "",
  talkTitle: ""
};
export type initialFilters = typeof initialFilters;

export const FilterContext = React.createContext({
  filters: initialFilters,
  setFilters: (_: initialFilters) => {}
});

const HeadTags = () => (
  <Head>
    <title>ConfTalks.org</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

const Home = () => {
  const [talkList, setTalkList] = useState(getInitialState());
  const [filters, setFilters] = useState(initialFilters);

  const filterTalks = () => {
    const filtered = talkList.filter(talk => {
      if (filters.onlyShowRecordedTalks) {
        if (talk.video_url === "") return null;
      }
      if (filters.conference_id) {
        if (
          talk.conferences.find(
            conf => String(conf.id) === filters.conference_id
          ) === undefined
        )
          return null;
      }
      if (filters.speakerName) {
        if (
          talk.speakers
            .map(s => s.name.toLowerCase())
            .find(speakerName =>
              speakerName.includes(filters.speakerName.toLowerCase())
            ) === undefined
        )
          return null;
      }
      if (filters.talkTitle) {
        if (
          talk.main_title
            .toLowerCase()
            .includes(filters.talkTitle.toLowerCase()) === false
        )
          return null;
      }
      return talk;
    });
    // filter out null
    return filtered.filter(Boolean);
  };

  const filteredTalkList = filterTalks();

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
              <FilterContext.Provider value={{ filters, setFilters }}>
                <Fragment>
                  <aside>
                    <FilterStyles>
                      <h2>Filters</h2>
                      <TalkListFilters />
                    </FilterStyles>
                    <p>
                      <b>Tip!</b> You can bookmark talks so you can check up on
                      them later to see if they have been uploaded already.
                      Bookmarks are stored on your current device.
                    </p>
                  </aside>
                  <div className="talk-list">
                    <TalkListStyles>
                      <TalkList
                        talkList={filteredTalkList}
                        toggleBookmark={toggleBookmark}
                      />
                    </TalkListStyles>
                  </div>
                </Fragment>
              </FilterContext.Provider>
            </TalkListLayout>
          </Section>
        </Container>
      </main>
    </Fragment>
  );
};

export default Home;
