import React, { Fragment } from "react";
import Nav from "../components/Nav/Nav";
import { Container, Section, ContentWrapper, Hero } from "../components/layout";
import { NewsletterForm } from "../components/forms/Newsletter";
import Head from "next/head";

const HeadTags = () => (
  <Head>
    <title>ConfTalks.org</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

const Contributing = () => {
  return (
    <Fragment>
      <HeadTags />
      <header>
        <Nav />
      </header>
      <main>
        <Container>
          <Section>
            <h2>Contributing</h2>
            <p>
              Thank you for contributing! This project wouldn't work without
              people like you :) <br />
              <br />
              See our{" "}
              <a href="https://github.com/EddyVinck/ConfTalks/blob/master/CONTRIBUTING.md">
                Contributing Guidelines
              </a>{" "}
              on GitHub.
            </p>
            <p>
              Talk with other contributors and conference enthusiasts in our{" "}
              <a
                href="https://join.slack.com/t/conftalks/shared_invite/enQtNzk1MjA1ODQ2NzM3LTRkMmU0YmRhZDEzYmUxZTEyYjhlMWYzOWIyYTU0NDBkMGFlN2U3MjJmNWE5MjM4ZDM1Yzg0M2QwZWUzODllMzM"
                target="_blank"
              >
                community Slack!
              </a>
            </p>
          </Section>
        </Container>
        <Hero className="hero">
          <Container>
            <section>
              <label
                style={{
                  textAlign: "center",
                  fontSize: "1.1rem",
                  display: "block",
                  fontWeight: "bold"
                }}
                htmlFor="mce-EMAIL"
              >
                Subscribe to the ConfTalks newsletter 💌
              </label>
              <NewsletterForm style={{ marginBottom: "1rem" }} />
              <ContentWrapper variant="center">
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: "normal",
                    textAlign: "center"
                  }}
                >
                  Newsletters include news about ConfTalks and also occasionally
                  exclusive conference related offers. You will only receive
                  newsletters when we have something to say. <br />
                  No spam 🚫
                </p>
              </ContentWrapper>
            </section>
          </Container>
        </Hero>
      </main>
    </Fragment>
  );
};

export default Contributing;
