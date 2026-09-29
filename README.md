# FitPlan: Fitness Trainer assignment example

This is a small working example for **ISM 6225 Assignment 1: Look and Feel**. It uses sample workout data and demonstrates the four required pages. Customize the wording, sample workouts, and About Us page so it reflects your own work.

## What is in this folder?

| File | Purpose |
| --- | --- |
| `index.html` | Home page and overview. |
| `aboutus.html` | Student developer profile, process, and repository link. **Edit before submitting.** |
| `manageworkouts.html` | Form and table for mock Create, Read, Update, Delete actions. |
| `analytics.html` | Chart of workout minutes by category. |
| `styles.css` | Shared design across all pages. |
| `app.js` | Sample data, browser storage, form behavior, and chart setup. |
| `assets/fitness-hero.svg` | Illustration used on the home page. |

HTML = page structure. CSS = appearance. JavaScript = interactive behavior. Chart.js is loaded on the Analytics page from a CDN, so that chart requires an internet connection. The text totals underneath still display if it cannot load.

## Beginner workflow

1. Sign in to GitHub. Open the professor's starter repository: <https://github.com/ISM6225/Assignment_LookAndFeel>. Click **Fork**, choose your account as owner, and create your own fork. Your URL should start with `https://github.com/YOUR_USERNAME/`.
2. Download and unzip the `FitPlan_Fitness_Trainer_Example.zip` file supplied with this guide. Open the **folder** and identify the files listed above. Do not upload the ZIP itself to GitHub; GitHub Pages needs the actual HTML, CSS, JavaScript, and SVG files.
3. In your fork, click **Add file → Upload files**. Drag the **contents of this folder** into the upload area so `index.html` appears at the repository root, alongside `aboutus.html`. If the professor's starter already has a file with the same name, replace its contents in your fork; keep any unrelated starter files. Commit the changes to your own repository.
4. In `aboutus.html`, replace `YOUR_USERNAME` in the repository link with your actual GitHub username. Rewrite the two marked paragraphs so they accurately describe your own profile and development process. On GitHub, open the file, click the pencil icon, edit, and commit the change.
5. For a more personal project, edit `SAMPLE_WORKOUTS` near the top of `app.js`. Keep the exact category names `Strength`, `Cardio`, and `Mobility` because the chart groups by them. The default example uses six fictional workouts.
6. In your fork, open **Settings → Pages**. Under **Build and deployment**, set **Source: Deploy from a branch**, choose your default branch (often `main`), choose **/(root)**, and save. Once published, GitHub displays a live URL similar to `https://YOUR_USERNAME.github.io/Assignment_LookAndFeel/`.
7. Open the live URL. Click every navigation item. On Workouts, add one, edit it, and delete it. On Analytics, confirm the chart and text totals. On About Us, make sure your GitHub link goes directly to **your** repository. Then submit the **live home page URL** in Canvas.

## Important details

- This is a mock application: there is no account system or database. `localStorage` saves changes in the current browser only. Another visitor/browser starts with the sample workouts.
- To reset your own browser to the sample workouts, clear the site's storage in browser settings. Editing `SAMPLE_WORKOUTS` alone will not change data already saved in your own browser until that storage is cleared.
- The course instructions grade five areas: relevant content and mock CRUD, look and feel, usability, loading performance, and all required pages plus source code.
- Do not leave the `YOUR_USERNAME` placeholder or the two editing notes on the About Us page when submitting.
