# World Cup 2018 - Frontend

This repo contains the source files for the frontend of my fullstack project, **World Cup 2018 Fixtures**. The technologies used are **HTML, CSS with SASS, and Javascript.**

> You can visit the live site [here.](https://vigorous-spence-f64f9f.netlify.app/)
>
> Visit the URL for the backend API of this project [here](https://worldcup2018-api.herokuapp.com), or view the [git repo.](https://github.com/cremecoder/footy-api)

<br>

## Background

**World Cup 2018 Fixtures** is a fullstack brief that was given to me by an agency based in my hometown for the purposes of feedback and critique.

<br>

## Instructions

```
npm install

npm start

npm run build
```

- **`npm install`** will install dependencies and create node_modules folder.
- **`npm start`** will run the parcel development server and create the **`dev`** file.
- **`npm run build`** will run the parcel build command, creating the **`dist`** folder and minify the **`src`** files.

<br>

## **`src/`**

- **`images/`**
  - **`1200px-2018_FIFA_worldcup.svg.png`** Logo image.
  - **`england.svg`** Replacement for Great Britain flag from the api.
  - **`search icon.svg`** Search icon.
- **`js/`**
  - **`app.js`** Root javascript file interacting with the DOM.
  - **`Fetch.js`** ES6 Class module that uses the Fetch API to handle API calls.
  - **`templates.js`** Functions that return template literals and show dynamic data.
  - **`utils.js`** Helper functions used for data manipulation in **`template.js`**.
- **`scss/`**
  - **`abstracts/*`** **Sass Maps** for the root colors and typography.
  - **`base/*`** Root styles; mostly derived from abstracts into utility classes and CSS Custom Properties.
  - **`components/*`** Styles scoped to individual components like the cards and CSS ball animation.
  - **`_index.scss`** Directory file.
  - **`main.scss`** Main output file from which the **Sass** is compiled into **minified CSS**.
- **`index.html`** Root output html file.
