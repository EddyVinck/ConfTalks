import React from "react";

const NewsletterForm = () => {
  return (
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
  );
};

export { NewsletterForm };
