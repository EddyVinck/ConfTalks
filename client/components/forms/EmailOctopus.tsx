import React from "react";
import styled from "styled-components";
import { Button } from "../generic";

const NewsLetterFormStyles = styled.div({
  ".email-octopus-form-wrapper": {
    h2: {
      fontSize: "20px",
      margin: "0 0 1rem"
    }
  },
  ".email-octopus-heading": {
    fontSize: "20px",
    margin: "0 0 1rem"
  },
  ".email-octopus-success-message": {},
  ".email-octopus-error-message": {
    color: "#e74c3c"
  },
  ".email-octopus-form": {},
  ".email-octopus-form-row": {
    marginBottom: "15px",
    label: {
      display: "block",
      span: {
        position: "absolute" /* Outside the DOM flow */,
        height: "1px",
        width: "1px" /* Nearly collapsed */,
        overflow: "hidden",
        clip: "rect(1px, 1px, 1px, 1px)" /* All other browsers */
      }
    },
    input: {
      padding: "8px",
      height: "32px",
      border: "1px solid #ccc"
    }
  },
  ".email-octopus-form-row-consent": {
    marginTop: "20px",
    label: {
      verticalAlign: "top"
    }
  },
  ".email-octopus-form-row-subscribe": {},
  // this should get rid of some bots
  ".email-octopus-form-row-hp": {
    position: "absolute",
    left: "-5000px"
  },
  ".input-wrapper": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    maxWidth: "100%",
    "input, button": {
      marginBottom: "0",
      height: 40
    },
    input: {
      minWidth: 240
    },
    button: {
      position: "relative",
      zIndex: 1
    }
  },
  "@media (max-width: 640px)": {
    ".input-wrapper": {
      "input, button": { flexGrow: 1 }
    }
  },
  "@media (min-width: 640px)": {
    ".input-wrapper": {
      transform: "translateX(-5px)",
      input: {
        transform: "translateX(5px)"
      }
    }
  }
});

const EmailOctopus = props => {
  return (
    <NewsLetterFormStyles>
      <div {...props}>
        <div className="email-octopus-form-wrapper">
          <h2 className="email-octopus-heading">
            Subscribe to the ConfTalks newsletter 💌
          </h2>
          <form
            method="post"
            action="https://emailoctopus.com/lists/b6cc50a1-f282-11e9-be00-06b4694bee2a/members/embedded/1.3/add"
            className="email-octopus-form"
            data-sitekey="6LdYsmsUAAAAAPXVTt-ovRsPIJ_IVhvYBBhGvRV6"
          >
            <div className="email-octopus-form-row">
              <label aria-label="Email address" htmlFor="field_0">
                <span aria-hidden="true">Email address</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="field_0"
                  name="field_0"
                  type="email"
                  placeholder="Email address"
                />
                <Button type="submit">Subscribe</Button>
              </div>
              <input type="hidden" name="successRedirectUrl" value="" />
              <div className="email-octopus-form-row-subscribe"></div>
            </div>
            <div className="email-octopus-form-row-hp" aria-hidden="true">
              {/* Do not remove this field, otherwise you risk bot sign-ups */}
              <div
                dangerouslySetInnerHTML={{
                  __html: `
                    <input type="text" name="hpb6cc50a1-f282-11e9-be00-06b4694bee2a"
                       tabindex="-1"
                       autocomplete="nope" />                    
                    `
                }}
              />
            </div>
            <p style={{ fontSize: "14px" }}>
              Newsletters include news about ConfTalks and also occasionally
              exclusive conference related offers. You will only receive
              newsletters when we have something to say.
              <br />
              No spam 🚫
            </p>
          </form>
          <p className="email-octopus-success-message"></p>
          <p className="email-octopus-error-message"></p>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js" />
        <script src="https://emailoctopus.com/bundles/emailoctopuslist/js/1.3/formEmbed.js" />
      </div>
    </NewsLetterFormStyles>
  );
};

export { EmailOctopus };
