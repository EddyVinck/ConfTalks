import React, {
  useState,
  useEffect,
  Fragment,
  Dispatch,
  SetStateAction
} from "react";
import Head from "next/head";
import Nav from "../components/Nav/Nav";
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
import { Pagination } from "semantic-ui-react";
import AsideBlock from "../components/layout/AsideBlock";
import { EmailOctopus } from "../components/forms/EmailOctopus";
import ThreeColumnLayout from "../components/layout/ThreeColumnLayout";
import { getYouTubeIdFromUrl } from "../utils/youtube/getYouTubeIdFromUrl";
import Link from "next/link";
import { PaginationStyles } from "../components/Pagination";
import LinkButton from "../components/generic/LinkButton";

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

  if (bookmarks) {
    talkList = talkList.map(talk => {
      return {
        ...talk,
        bookmarked: bookmarks.includes(talk.id)
      };
    });
  }

  return talkList;
};

export const initialFilters = {
  onlyShowRecordedTalks: false,
  onlyShowBookmarkedTalks: false,
  speakerName: "",
  conference_ids: [],
  category_ids: [],
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
  </Head>
);

const filterTalks = (talkList, filters) => {
  const filtered = talkList.filter(talk => {
    if (filters.onlyShowRecordedTalks) {
      if (talk.video_url === "" || !getYouTubeIdFromUrl(talk.video_url))
        return null;
    }
    if (filters.onlyShowBookmarkedTalks) {
      if (talk.bookmarked === false) return null;
    }
    if (filters.conference_ids.length > 0) {
      if (
        talk.conferences.find(
          conf => filters.conference_ids.includes(String(conf.id))
        ) === undefined
      )
        return null;
    }
    if (filters.category_ids.length > 0) {
      if (
        talk.categories.find(cat => filters.category_ids.includes(String(cat.id))) ===
        undefined
      )
        return null;
    }
    if (filters.speakerName) {
      if (
        talk.speakers
          .map(s => s.name.toLowerCase())
          .find(speakerName =>
            speakerName.includes(filters.speakerName.toLowerCase().trim())
          ) === undefined
      )
        return null;
    }
    if (filters.talkTitle) {
      if (
        talk.main_title
          .toLowerCase()
          .includes(filters.talkTitle.toLowerCase().trim()) === false
      )
        return null;
    }
    return talk;
  });
  // filter out null
  const result = filtered.filter(Boolean);
  return result;
};

const Home = () => {
  const [talkList, setTalkList] = useState(getInitialState());
  const [filters, setFilters] = useState(initialFilters);
  let filteredTalkList: Talk[] = filterTalks(talkList, filters);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredTalkList.length / itemsPerPage);

  const [pagination, setPagination] = useState({
    activePage: 1,
    boundaryRange: 1,
    siblingRange: 1,
    showEllipsis: false,
    showFirstAndLastNav: true,
    showPreviousAndNextNav: true
  });

  const offset = (pagination.activePage - 1) * itemsPerPage;

  const handlePaginationChange = (_event: MouseEvent, { activePage }) => {
    setPagination({ ...pagination, activePage });
  };

  const handleBottomPaginationChange = (event: MouseEvent, { activePage }) => {
    handlePaginationChange(event, { activePage });
    document.getElementById("videos").scrollIntoView();
  };

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

  let {
    activePage,
    boundaryRange,
    siblingRange,
    showEllipsis,
    showPreviousAndNextNav
  } = pagination;

  // Make sure the user isn't on a higher page number than there are pages available (due to filtering when on a high page number)
  useEffect(() => {
    if (activePage > totalPages && totalPages > 0) {
      setPagination({ ...pagination, activePage: 1 });
    }
  }, [filters]);

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
                  <i>
                    &ldquo;I think I've seen some of these talks
                    already...&rdquo;
                  </i>{" "}
                  —{" "}
                  <i>&ldquo;Only a few of these talks interest me...&rdquo;</i>{" "}
                  — <i>&ldquo;Is it worth my time?&rdquo;</i> ConfTalks is an
                  open source index of already recorded and scheduled{" "}
                  <Link href="/contributing#development-related">
                    <a>development related</a>
                  </Link>{" "}
                  related conference talks to help you decide if you should go.
                </p>
              </div>
            </ContentWrapper>
            <section>
              <ContentWrapper variant="center" style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: 20, marginBottom: "14px" }}>
                  Subscribe to the ConfTalks newsletter 💌
                </h2>
                <EmailOctopus style={{ marginBottom: "1rem" }} />
              </ContentWrapper>
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
                      <p>
                        <b>Tip!</b> You can bookmark talks so you can check up
                        on them later to see if they have been uploaded.
                        Bookmarks are stored on your current device.
                      </p>
                    </FilterStyles>
                    <AsideBlock className="join-community">
                      <h2>Community</h2>
                      <p>
                        Talk with other conference enthusiasts in our{" "}
                        <a
                          href="https://join.slack.com/t/conftalks/shared_invite/enQtNzk1MjA1ODQ2NzM3LTRkMmU0YmRhZDEzYmUxZTEyYjhlMWYzOWIyYTU0NDBkMGFlN2U3MjJmNWE5MjM4ZDM1Yzg0M2QwZWUzODllMzM"
                          target="_blank"
                        >
                          community Slack!
                        </a>
                      </p>
                    </AsideBlock>
                    <AsideBlock className="join-community">
                      <h2>Newsletter</h2>
                      <EmailOctopus className="full-width-fields" />
                    </AsideBlock>
                  </aside>
                  <div className="talk-list">
                    <PaginationStyles>
                      <Pagination
                        id="videos"
                        activePage={activePage}
                        boundaryRange={boundaryRange}
                        // @ts-ignore
                        onPageChange={handlePaginationChange}
                        siblingRange={siblingRange}
                        totalPages={totalPages}
                        ellipsisItem={showEllipsis ? undefined : null}
                        firstItem={null}
                        lastItem={null}
                        prevItem={showPreviousAndNextNav ? undefined : null}
                        nextItem={showPreviousAndNextNav ? undefined : null}
                      />
                    </PaginationStyles>
                    <LinkButton href="/contributing" variant="primary">
                      Contribute talks
                    </LinkButton>
                    <TalkListStyles>
                      <TalkList
                        offset={offset}
                        itemsPerPage={itemsPerPage}
                        talkList={filteredTalkList}
                        toggleBookmark={toggleBookmark}
                      />
                    </TalkListStyles>
                    <Pagination
                      activePage={activePage}
                      boundaryRange={boundaryRange}
                      // @ts-ignore
                      onPageChange={handleBottomPaginationChange}
                      siblingRange={siblingRange}
                      totalPages={totalPages}
                      ellipsisItem={showEllipsis ? undefined : null}
                      firstItem={null}
                      lastItem={null}
                      prevItem={showPreviousAndNextNav ? undefined : null}
                      nextItem={showPreviousAndNextNav ? undefined : null}
                    />
                  </div>
                </Fragment>
              </FilterContext.Provider>
            </TalkListLayout>
          </Section>
          <Section>
            <h2>Get involved</h2>
            <ThreeColumnLayout>
              <AsideBlock>
                <h2>Newsletter</h2>
                <p>Get the latest news!</p>
                <EmailOctopus className="full-width-fields" />
              </AsideBlock>
              <AsideBlock>
                <h2>Community</h2>
                <p>
                  Talk with other conference enthusiasts in our{" "}
                  <a
                    href="https://join.slack.com/t/conftalks/shared_invite/enQtNzk1MjA1ODQ2NzM3LTRkMmU0YmRhZDEzYmUxZTEyYjhlMWYzOWIyYTU0NDBkMGFlN2U3MjJmNWE5MjM4ZDM1Yzg0M2QwZWUzODllMzM"
                    target="_blank"
                  >
                    community Slack!
                  </a>
                </p>
              </AsideBlock>
              <AsideBlock>
                <h2>Contributing</h2>
                <p>
                  Thank you for using ConfTalks! Please consider contributing
                  data so ConfTalks stays up to date!
                  <br />
                  <br />
                  See our{" "}
                  <a href="https://github.com/EddyVinck/ConfTalks/blob/master/CONTRIBUTING.md">
                    Contributing Guidelines
                  </a>{" "}
                  on GitHub. You can find the full repository here:{" "}
                  <a href="https://github.com/EddyVinck/ConfTalks">
                    https://github.com/EddyVinck/ConfTalks
                  </a>
                  .
                </p>
              </AsideBlock>
            </ThreeColumnLayout>
          </Section>
        </Container>
      </main>
    </Fragment>
  );
};

export default Home;
