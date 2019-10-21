import React, { Fragment } from "react";
import Nav from "../components/Nav/Nav";
import { Container, Section, ContentWrapper, Hero } from "../components/layout";
import Head from "next/head";
import { NewsletterSection } from "../components/forms";

const HeadTags = () => (
  <Head>
    <title>ConfTalks.org</title>
  </Head>
);

const About = () => {
  return (
    <Fragment>
      <HeadTags />
      <header>
        <Nav />
      </header>
      <main>
        <Container>
          <Section>
            <h1>About ConfTalks</h1>
            <p>
              Read more about{" "}
              <a
                href="https://dev.to/eddyvinck/i-created-my-first-open-source-project-in-7-days-and-released-it-today-12d5"
                target="_blank"
              >
                the ConfTalks release on DEV.to!
              </a>
            </p>
            <p>
              When I got the idea for ConfTalks, I wrote down the problem I
              wanted to solve:
            </p>
            <blockquote>
              When I am deciding if a conference is worth attending I usually
              check out the list of talks. I then decide which talks I'd like to
              see. Then I check YouTube to see if those talks are already
              uploaded. If the majority of the talks are recorded, then maybe it
              isn't worth going to the conference. Ideally there would be a
              website that can help find these talks. An index of conference
              talks that are already recorded and uploaded somewhere. You can
              bookmark talks so you can check up on them later to see if they
              have been uploaded already.
            </blockquote>
            <p>
              Talk with other conference enthusiasts in our{" "}
              <a
                href="https://join.slack.com/t/conftalks/shared_invite/enQtNzk1MjA1ODQ2NzM3LTRkMmU0YmRhZDEzYmUxZTEyYjhlMWYzOWIyYTU0NDBkMGFlN2U3MjJmNWE5MjM4ZDM1Yzg0M2QwZWUzODllMzM"
                target="_blank"
              >
                community Slack!
              </a>{" "}
              and{" "}
              <a href="https://twitter.com/Veinq_" target="_blank">
                follow me on Twitter
              </a>
              .
            </p>
          </Section>
        </Container>
        <NewsletterSection />
      </main>
    </Fragment>
  );
};

export default About;
