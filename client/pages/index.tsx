import React, { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import Nav from "../components/nav";
import { getTalkList } from "../utils/data-formatting/getConferenceList";
import { Form, Field, Formik } from "formik";

const initialState = getTalkList();

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
      "&:hover": {
        color: "blue"
      }
    },
    "p.categoryLabel": {
      display: "inline-block",
      margin: "0 0.5rem 0 0"
    },
    "ul.categories": {
      display: "inline-flex",
      listStyle: "none",
      padding: 0,
      margin: 0,
      "li + li": {
        "::before": {
          content: "', '",
          border: ""
        }
        // margin: "0 0.5rem 0 0"
      }
    }
  }
});

const Home = () => {
  const [talkList, setTalkList] = useState(initialState);

  console.log(talkList);

  return (
    <div>
      <Head>
        <title>Home</title>
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
          <h2>Subscribe to the newsletter</h2>
          <Formik initialValues={{ email: "" }} onSubmit={() => {}}>
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

        <TalkList>
          {talkList.map(talk => {
            return (
              <li key={talk.id}>
                <a href={talk.video_url} target="blank" rel="noopener">
                  <h2>{talk.main_title}</h2>
                  <p>Upload date: {talk.video_upload_date}</p>
                  <p className="categoryLabel">Categories:</p>
                  <ul className="categories">
                    {talk.categories.length ? (
                      talk.categories.map(category => (
                        <li key={category.name}>{category.name}</li>
                      ))
                    ) : (
                      <li key="no-categories">No categories available</li>
                    )}
                  </ul>
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
