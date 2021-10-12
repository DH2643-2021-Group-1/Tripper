# Tripper
[![codecov](https://codecov.io/gh/DH2643-2021-Group-1/Tripper/branch/main/graph/badge.svg?token=BQERY0QSYL)](https://codecov.io/gh/DH2643-2021-Group-1/Tripper)

Easily create rich blogs post about your trips with this site. The main project in the course DH2643 - Advanced Interaction Programming.

## Coding Convention
### Files names
Model -> Presenter (Controller) -> View
* View: CoolComponentView.tsx
* Presenter: CoolComponentPresenter.tsx
* Model: blogPost.ts

### Folder names
* Folders that contains multiple components should only be lowercase.
  * Ex: blog-post-cards
* Folder that is the container of a component should be CamelCase.
  * Ex: BlogPostCard

### SCSS
See BEM: http://getbem.com/introduction/

---

## Development Setup
### Frontend - React
* Step 0 - Run `git pull`
* Step 1 - If it is the first time running the app, run `npm install`
* Step 2 - Start the the app by typing `npm start`
### Backend - Node
TODO

---

## Contribution Guide
* Step 1 - Create an issue for the feature / bug that you want to work with.
* Step 2 - Copy the issue id, the one with the hashtag e.g (#23)
* Step 3 - Create a new branch with the following name structure: 
  * Structure: `issue/<issue_id>-short-title-of-issue`
  * Exempel: `issue/23-fix-text-editor-crash`
* Step 4 - Code, commit, and push! A recommended naming convention for the commits are as follow
  *  Structure: `<type>[optional scope]: <description>`
  *  Example: `fix: the text editor crashed when applying bold style`
  *  Notes: `<type>` is usually either: fix = bugfix, feat = feature, test = tests
  *  More can be read here: https://www.conventionalcommits.org/en/v1.0.0/
* Step 5 - Create a pull request of your branch into the master branch.
* Step 6 - Connection the relevant issue to the PR, this can be done inside the created PR page in GitHub.  
* Step 7 - Name the PR with the following structure: `#<issue_id> <type>: <description>`
  * Example: `#23 fix: Prevent text editor to crash when applying bold text`
* Step 8 - Ask for code review.
* Step 9 - Merge the branch using "squash and merge". **OBS** Check that the commit of the merge is the same name as the PR and ends with the PR id, e.g {#24}.
  * Example: `#23 fix: Prevent text editor to crash when applying bold text (#24)`


---

## Deployment
TODO