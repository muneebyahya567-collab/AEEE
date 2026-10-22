# AEEE ExCom website — three-page version

- `index.html`: homepage
- `apply.html`: application form
- `thankyou.html`: confirmation page shown after successful submission
- `style.css`: shared responsive theme
- `script.js`: scroll animations and Formspree submission handling
- `aeee-logo.png`, `aeee-logo-white.png`: logo assets

## Publish
Upload all files to the root of your GitHub Pages repository, replacing existing matching files. Ensure `thankyou.html` is uploaded too. Commit changes and wait for GitHub Pages to deploy.

The form submits to `https://formspree.io/f/myekapvb` using an AJAX request. The browser redirects to `thankyou.html` only if Formspree returns a successful response. Test after deployment.
