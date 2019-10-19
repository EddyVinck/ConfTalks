import React from "react";
import styled from "styled-components";

const NewsLetterFormStyles = styled.div({});

const EmailOctopus = props => {
  return (
    <NewsLetterFormStyles>
      <div
        {...props}
        dangerouslySetInnerHTML={{
          __html: `
        <link rel="stylesheet" href="https://emailoctopus.com/bundles/emailoctopuslist/css/formEmbed.css">

        <div class="email-octopus-form-wrapper">
            <h2 class="email-octopus-heading">Subscribe to the ConfTalks newsletter 💌</h2>
            <p class="email-octopus-success-message"></p>
            <p class="email-octopus-error-message"></p>
        
            <form method="post"
              action="https://emailoctopus.com/lists/b6cc50a1-f282-11e9-be00-06b4694bee2a/members/embedded/1.3/add"
              class="email-octopus-form"
              data-sitekey="6LdYsmsUAAAAAPXVTt-ovRsPIJ_IVhvYBBhGvRV6"
            >
                
                <div class="email-octopus-form-row">
                    <label for="field_0">Email address</label>
                    <input id="field_0" name="field_0" type="email" placeholder="">
                </div>
        
        
                
            <div class="email-octopus-form-row-consent">
                <input type="checkbox" id="consent" name="consent">
                <label for="consent">I consent to receiving your weekly newsletters. Newsletters include news about ConfTalks and also occasionally exclusive conference related offers. You will only receive newsletters when we have something to say.<br>No spam 🚫</label>
            </div>
        
        
                <div class="email-octopus-form-row-hp" aria-hidden="true">
                    <!-- Do not remove this field, otherwise you risk bot sign-ups -->
                    <input type="text" name="hpb6cc50a1-f282-11e9-be00-06b4694bee2a"
                       tabindex="-1"
                       autocomplete="nope">
                </div>
        
                <div class="email-octopus-form-row-subscribe">
                    <input type="hidden"
                       name="successRedirectUrl"
                       value="">
                    <button type="submit">Subscribe</button>
                </div>
            </form>
        
            
            <div class="email-octopus-rewards">
                Powered by <a href="https://emailoctopus.com/?urli=6h5rF&amp;utm_medium=user_referral&amp;utm_source=builder" target="_blank">EmailOctopus</a>
            </div>
        
        </div>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
        <script src="https://emailoctopus.com/bundles/emailoctopuslist/js/1.3/formEmbed.js"></script>
    `
        }}
      />
    </NewsLetterFormStyles>
  );
};

export { EmailOctopus };
