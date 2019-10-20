import React, { Fragment } from "react";
import Nav from "../components/Nav/Nav";
import { Container, Section } from "../components/layout";
import Head from "next/head";
import { NewsletterSection } from "../components/forms";

const HeadTags = () => (
  <Head>
    <title>ConfTalks.org</title>
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
            <h1>Contributing</h1>
            <p>
              Thank you for contributing! This project wouldn't work without
              people like you :) <br />
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
        <NewsletterSection />
      </main>
    </Fragment>
  );
};

export default Contributing;
