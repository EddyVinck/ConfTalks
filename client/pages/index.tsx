import React, { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import Nav from "../components/nav";
import { getTalkList } from "../utils/data-formatting/getTalkList";
import { Form, Field, Formik } from "formik";
import findIndex from "lodash-es/findIndex";
import * as gtag from "../utils/analytics/gtag";
import { Container, Section } from "../components/layout";

const TalkList = styled.ol({
  // maxWidth: "800px",
  // width: "80%",
  // margin: "0 auto",

  li: {
    a: {
      display: "block",
      position: "relative",
      color: "#000",
      textDecoration: "none",
      padding: "1rem 0.5rem",
      background: "white",
      borderBottom: "2px solid lightgray",
      "&:visited": {
        color: "#666"
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

const Hero = styled.section({
  color: "#fff6f6",
  background: "#2f1212",
  padding: "80px 0",
  p: {
    fontWeight: 600,
    fontSize: "1.2rem",
    lineHeight: "1.4em"
  },
  "p, label": {
    opacity: 0.8
  }
});

interface StyledProps {
  variant?: string;
}

const ContentWrapper = styled.div(<T extends StyledProps>(props: T) => ({
  maxWidth: "540px",
  width: "100%",
  ...(props.variant === "center" && {
    marginLeft: "auto",
    marginRight: "auto"
  })
}));

const FilterStyles = styled.div({
  background: "#faf5f5",
  borderRadius: 20,
  padding: "32px 24px",
  width: "100%",
  h2: {
    fontSize: "0.8rem",
    marginBottom: "1rem",
    letterSpacing: "2px",
    textTransform: "uppercase",
    opacity: 0.7
  },
  "input, select": {
    width: "100%"
  },
  "input[type=checkbox], input[type=radio]": {
    width: "auto"
  },
  label: {
    marginBottom: "0.5rem",
    display: "inline-block"
  },
  "input, select, textarea": {
    marginBottom: "1rem"
  },
  select: {
    appearance: "none",
    boxShadow: "0 2px 2px rgba(0,0,0,0.05)",
    textIndent: "0.01px",
    textOverflow: "",
    padding: ".5em 3em .5em .5em",
    /* Targetting Webkit browsers only. FF will show the dropdown arrow with so much padding. */
    "@media screen and (-webkit-min-device-pixel-ratio:0)": {
      paddingRight: "3em"
    },
    border: "1px solid #c7c7c7",
    borderRadius: 0,
    backgroundColor: "rgba(255,255,255,0.5)",
    color: "textcolor",
    outline: "none",
    display: "inline-block",
    backgroundImage:
      "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACgUlEQVR4nO3cSW7bQBBGYd8n3ZTY1VplkVNl8CRlOEMWOYgXvpyVhdEAIUiySFbP7wO8L+p/sjcG7+4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEDzrMifwfnH3Hf0xjh3MM4dsh5hRX5v/O44iH8jgnSMc4eN3x03fne0IvssR4Txww8RpDEdP1sEdpRfp0cQQXznxg+fux3lOckRl8YngrgujZ80gsH5n9eOIII4Phr/JIKnKEfcOj4R6Lp1/KgRzD0iSZEdmPuli/Lls+P4ZckRRLDO0vGnn/un7fazyjFLfwMQwTIa46v/+SWCNIocPyCCuIoeP7AieyLQpzG+ce4hybFEoKuq8QMi0FHl+AERrFP1+AERLNPE+AERzNPU+IEV2Q/i34jguibHD+woz0RwWdPjB0Rwnsr4Ive5n+MmShGk+Q+XBD76J5qmxg+I4F2X4we9R9D1+EGvETD+RG8RMP4ZdpSnHiJg/Ctaj0BjfCvyI/dzRNVqBIw/Q2sRMP4CrUTA+CvUHgHjK6g1AsZXVFsEjB/B4PxjDRGojD/K99h3VkklgogvS2D8BEqN4PSNKIwf0doINl73tSmMn0EpETB+RrkjYPwC5IqA8QtinHtIGQHjFyhVBCrjO/8txWfSndgRMH4FYkXA+BXRjoDxK6QVAeNXTCMCxq+cEbnPEQHjFyR1BO9v43Jfcz83JlJFwPgFix0B41cgVgSMXxHtCBi/QloRMH7FrPP/1gZgnPub+zmwgtnK69LxrfiX3PdDwZIIGL8xcyJg/EbdEgHjN+5aBIzfiXMRMH5nphEwfqfMVl4ZHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlO4/4NIPH7tR+MsAAAAASUVORK5CYII=)",
    backgroundPosition: "calc(100% - 10px) 50%",
    backgroundSize: "15px",
    backgroundRepeat: "no-repeat",
    transition: "all .3s ease-in-out",

    // Fix for IE 11
    "&::-ms-expand": {
      display: "none"
    },
    "&:focus": {
      borderColor: "#569aff",
      boxShadow: "inset 0 0 4px #569aff"
    },
    "&:hover": {
      borderColor: "#888888"
    }
  }
});

const TalkListLayout = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  ".talk-list": {
    flex: "0 1 100%"
  },
  aside: {
    flex: "0 0 100%"
  },
  "@media (min-width: 800px)": {
    flexDirection: "row",
    aside: {
      marginRight: "24px",
      flex: "0 0 300px",
      marginBottom: "2rem"
    }
  }
});

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
              <div
                dangerouslySetInnerHTML={{
                  __html: `
            <!-- Begin Mailchimp Signup Form -->
            <link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css">
            <style type="text/css">
              #mc_embed_signup{clear:left; font:14px Helvetica,Arial,sans-serif; width:100%;}
              /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
                 We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
            </style>
            <style type="text/css">
              #mc-embedded-subscribe-form input[type=checkbox]{display: inline; width: auto;margin-right: 10px;}
              #mergeRow-gdpr {margin-top: 20px;}
              #mergeRow-gdpr fieldset label {font-weight: normal;}
              #mc-embedded-subscribe-form .mc_fieldset{border:none;min-height: 0px;padding-bottom:0px;}
            </style>
            <div id="mc_embed_signup">
            <form action="https://gmail.us20.list-manage.com/subscribe/post?u=8a83058b9ef8a5d4d9076f258&amp;id=7fcdb807f6" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                <div id="mc_embed_signup_scroll">
              <label for="mce-EMAIL">Subscribe to the ConfTalks newsletter</label>
              <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
                <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_8a83058b9ef8a5d4d9076f258_7fcdb807f6" tabindex="-1" value=""></div>
                <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
                </div>
                </form>
                </div>
                
                <!--End mc_embed_signup-->
                `
                }}
              />
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
                </FilterStyles>
                <p>
                  <b>Tip!</b> You can bookmark talks so you can check up on them
                  later to see if they have been uploaded already. Bookmarks are
                  stored on your current device.
                </p>
              </aside>
              <div className="talk-list">
                <TalkList>
                  {talkList.map(talk => {
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
                              alert(
                                "There is no video submitted for this talk"
                              );
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
                                <li key="no-categories">
                                  No categories available
                                </li>
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
              </div>{" "}
            </TalkListLayout>
          </Section>
        </Container>
      </main>
    </div>
  );
};

export default Home;
