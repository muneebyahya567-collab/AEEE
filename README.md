# AEEE ExCom Elections website

A responsive GitHub Pages website inspired by the clean, student-association style of the reference site, adapted for AEEE ExCom elections.

## Files
- `index.html` — page sections and application form
- `style.css` — responsive styling
- `script.js` — mobile navigation and form submission
- `.nojekyll` — static Pages marker

## Before publishing
- Confirm the official AEEE name/branding, roles, eligibility, dates, and election process. Sample roles and dates in this starter must be replaced.
- GitHub Pages does not store form submissions. Create a form at https://formspree.io/, copy the endpoint (for example `https://formspree.io/f/abcdefgh`) and replace `https://formspree.io/f/YOUR_FORMSPREE_ID` in `script.js`.
- Verify the form and test a submission before collecting real student data. Add a privacy contact/policy and limit access to authorized election organizers.

## Publish to GitHub Pages
1. Create a repository named `aeee-excom-election` at https://github.com/new.
2. Upload all files to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/(root)`, then Save.
5. After deployment, visit `https://YOUR-USERNAME.github.io/aeee-excom-election/`.

The website is static and does not require a build step.
