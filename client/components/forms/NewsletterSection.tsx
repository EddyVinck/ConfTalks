import React from "react";
import { Container, ContentWrapper, Hero } from "../layout";
import { EmailOctopus } from "./EmailOctopus";

const NewsletterSection = () => {
  return (
    <Hero>
      <Container>
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
  );
};

export default NewsletterSection;
