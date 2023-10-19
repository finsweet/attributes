import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

const fixtureHtml = `
  <!DOCTYPE html>
  <html data-wf-domain="dev-attributes-countdown.webflow.io" data-wf-page="64af1812b863e3584b68e15d" data-wf-site="64af1812b863e3584b68e15e" data-wf-status="1" class=" w-mod-js w-mod-ix"><head><style>.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}</style>
    <meta charset="utf-8">
    <title>DEV ATTRIBUTES countdown</title>
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta content="Webflow" name="generator">
    <link href="https://assets-global.website-files.com/64af1812b863e3584b68e15e/css/dev-attributes-countdown.webflow.bf1cfdeb6.css" rel="stylesheet" type="text/css">
    <script type="text/javascript">
      ! function(o, c) {
        var n = c.documentElement,
          t = " w-mod-";
        n.className += t + "js", ("ontouchstart" in o || o.DocumentTouch && c instanceof DocumentTouch) && (n.className += t + "touch")
      }(window, document);
    </script>
    <link href="https://assets-global.website-files.com/64af1812b863e3584b68e15e/64af1812b863e3584b68e16b_Fevicon%20Fs.png" rel="shortcut icon" type="image/x-icon">
    <link href="https://assets-global.website-files.com/64af1812b863e3584b68e15e/64af1812b863e3584b68e167_WEbclip%20FS.png" rel="apple-touch-icon">
    <link href="https://www.finsweet.com/attributes/" rel="canonical">
    <!-- Please keep this css code to improve the font quality-->
    <style>
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    </style>
    <script async="" type="module" src="http://localhost:3000/dist/index.js" fs-countdown="">
    </script>
  </head>
  <body data-new-gr-c-s-check-loaded="14.1132.0" data-gr-ext-installed="">
    <div class="page-wrapper">
      <div class="global-styles w-embed">
        <style>
          /* Snippet gets rid of top margin on first element in any rich text*/
          .w-richtext>:first-child {
            margin-top: 0;
          }

          /* Snippet gets rid of bottom margin on last element in any rich text*/
          .w-richtext>:last-child,
          .w-richtext ol li:last-child,
          .w-richtext ul li:last-child {
            margin-bottom: 0;
          }

          /* Snippet makes all link elements listed below to inherit color from their parent */
          a,
          .w-tab-link,
          .w-nav-link,
          .w-dropdown-btn,
          .w-dropdown-toggle,
          .w-dropdown-link {
            color: inherit;
          }

          /* Snippet prevents all click and hover interaction with an element */
          .clickable-off {
            pointer-events: none;
          }

          /* Snippet enables all click and hover interaction with an element */
          .clickable-on {
            pointer-events: auto;
          }

          /* Snippet enables you to add class of div-square which creates and maintains a 1:1 dimension of a div.*/
          .div-square::after {
            content: "";
            display: block;
            padding-bottom: 100%;
          }

          /*Hide focus outline for main content element*/
          main:focus-visible {
            outline: -webkit-focus-ring-color auto 0px;
          }

          /* Make sure containers never lose their center alignment*/
          .container-medium,
          .container-small,
          .container-large {
            margin-right: auto !important;
            margin-left: auto !important;
          }

          /*Reset selects, buttons, and links styles*/
          .w-input,
          .w-select {
            color: inherit;
            text-decoration: inherit;
            font-size: inherit;
          }

          /*Apply "..." after 3 lines of text */
          .text-style-3lines {
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }

          /*Apply "..." after 2 lines of text */
          .text-style-2lines {
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        </style>
      </div>
      <main class="main-wrapper">
        <div class="section_header">
          <div class="padding-global">
            <div class="container-medium">
              <h1>Countdown</h1>
              <div><strong>KEY&nbsp;-</strong> countdown</div>
            </div>
          </div>
        </div>
        <div class="section_demo">
          <div class="padding-global">
            <div class="container-medium">
              <h2>Big sale starting in</h2>
              <div fs-countdown-instance="1">
                <div data-testid="visible" fs-countdown-date="December 1, 2023 09:30:00" fs-countdown-timezone="GMT-02:00" fs-countdown-element="complete-hide" class="countdown_component-large">
                  <div class="countdown_item">
                    <div fs-countdown-element="months" class="countdown_value">1</div>
                    <div class="countdown_day-text">months</div>
                  </div>
                  <div class="countdown_item">
                    <div fs-countdown-element="days" class="countdown_value">12</div>
                    <div class="countdown_day-text">days</div>
                  </div>
                  <div class="countdown_item">
                    <div fs-countdown-element="hours" class="countdown_value">15</div>
                    <div class="countdown_day-text">hours</div>
                  </div>
                  <div class="countdown_item">
                    <div fs-countdown-element="minutes" class="countdown_value">6</div>
                    <div class="countdown_day-text">minutes</div>
                  </div>
                  <div class="countdown_item">
                    <div fs-countdown-element="seconds" class="countdown_value">8</div>
                    <div class="countdown_day-text">seconds</div>
                  </div>
                </div>
                <div fs-countdown-element="complete-show" class="countdown_success">
                  <div>Countdown is complete!</div>
                </div>
              </div>
              <div fs-countdown-instance="2" fs-countdown-date="December 10, 2020 09:30:00" fs-countdown-timezone="GMT+07:00" class="countdown_component-small">
                <div data-testid="hidden" fs-countdown-element="complete-hide" style="display: none;">Our next sale is in <span fs-countdown-element="days">-</span> days, <span fs-countdown-element="hours">-</span> hours, <span fs-countdown-element="minutes">-</span> minutes. Get ready for the sale by subscribing.</div>
                <div fs-countdown-element="complete-show" class="countdown_success" style="display: block;">
                  <div>THE&nbsp;SALE&nbsp;IS&nbsp;TODAY! Check out our offer.</div>
                </div>
              </div>
            </div>
            <div class="spacer-large"></div>
            <div>See display:none; messages with class countdown_complete. These should show when the countdown is complete.</div>
          </div>
        </div>
      </main>
    </div>
    <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=64af1812b863e3584b68e15e" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="https://assets-global.website-files.com/64af1812b863e3584b68e15e/js/webflow.0c7b7c8b5.js" type="text/javascript"></script>
  
<a class="w-webflow-badge" href="https://webflow.com?utm_campaign=brandjs"><img src="https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon-d2.89e12c322e.svg" alt="" style="margin-right: 4px; width: 26px;"><img src="https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-text-d2.c82cec3b78.svg" alt="Made in Webflow"></a></body><grammarly-desktop-integration data-grammarly-shadow-root="true"></grammarly-desktop-integration></html>
`;

test.beforeEach(async ({ page }) => {
  await page.setContent(fixtureHtml);
});

test.describe('countdown', () => {
  test('Elements should be hidden', async ({ page }) => {
    const hideElement = page.getByTestId('hidden');
    await waitAttributeLoaded(page, 'countdown');
    const showElement = page.getByTestId('visible');
    await expect(showElement).toBeVisible();
    await expect(hideElement).toBeHidden();
  });
});
