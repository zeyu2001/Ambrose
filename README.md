# Ambrose

## What This Is

This is a Chrome extension to easily answer [Wizard101 trivia questions](https://www.wizard101.com/game/trivia). You ean answer 10 trivia quizzes per day to earn Crowns.

## Is This Against TOS?

**TL;DR: I don't think so.**

According to the [Terms of Service](https://www.wizard101.com/game/termsofuse), one cannot use any robot, spider or other autometic device to access the site.

> You agree that you will not (a) use any robot, spider or other automatic device, process or means to access the Site, (b) use any manual process to monitor or copy any of the material on this site or for any other unauthorized purpose without the prior written consent of the Company, (c) use any device, software or routine that interferes with the proper working of the Site, (d) attempt to interfere with the proper working of the Site, (e) take any action that imposes an unreasonable or disproportionately large load on the Company’s infrastructure, or (f) access, reload or “refresh” transactional pages, or make any other request to transactional servers, more than once during any three (3) second interval.

This means that other trivia bots, such as those based on browser automation or programmatically sending HTTP requests are explicitly against the TOS.

This extension will **only** do the following:

- Read the trivia question from the trivia site
- Highlight the suggested answer
- Remove the fade-in animation
- Track when you last completed a quiz and show if the cooldown is over

It will **not**:

- Automatically select or submit answers
- Bypass the mandatory CAPTCHAs

This extension serves as more of an answer suggester and does not perform any automated interactions with the site. To the best of my knowledge, this is fair game. There are many other legitimate extensions that constantly read the contents of webpages you visit and/or modify the webpage contents to serve their intended purpose - the idea is that once downloaded, the user is not obliged to render the HTML in any particular way.

## How to Use

I currently do not have plans to publish this extension to the Chrome Web Store. While the previous extensions that received takedown requests from KI all performed automated interactions in breach of the TOS, I do not want to risk it.

Here's how you can install it manually.

1. Click on Code > Download ZIP
2. In Chrome, go to [chrome://extensions](chrome://extensions)
3. Turn on "Developer mode"
4. Click "Load unpacked"
5. Browse to the `build` directory in this repository

## Security

As a security practitioner myself, I understand that there may be concerns about using an untrusted Chrome extension.

This extension does not store any information about you or your Wizard101 account. It does keep track of which quizzes you have completed, so that you don't do the same quiz twice in the same 22-hour period.

Importantly, the extension only ever has access to `https://www.wizard101.com/quiz/trivia/game/*` URLs and the Chrome extension storage API. This means that the extension does not run on any URLs other than the trivia-specific ones.

Just like any other software, my advice would be to take a look for yourself and see if this is something you trust. Permissions are configured in the [`manifest.json`](./public/manifest.json) file.

## Contributing

Feel free to contribute to this project by adding/improving features or adding answers not currently found in [`answers.json`](./src/data/answers.json). I do not currently have the answers to all available quizzes.

If you face any issues using this extension, please open an issue in the Issues tab.
