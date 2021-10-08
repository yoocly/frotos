# FROTOS
App to search Unsplash, Pexels and Pixabay for free images and to organize, edit and download them

<a href="https://dirk-zukunft.de/frotos" target="_blank">👉🏼  &nbsp;  Live App</a>

https://user-images.githubusercontent.com/87307560/136006950-1a9c6357-cf2b-493c-afdc-41aa00f7b373.mp4


# Setup

Clone this repo and run `npm install` to install all the dependencies.

Add a .env file to the root of the project and add the following content:

```
PORT=3001
KEY_PEXELS={Pexels API Key}
KEY_UNSPLASH=Client-ID {Unsplash API Key}
KEY_PIXABAY={Pixabay API Key}
DB_URI=mongodb+srv://...
HASH_PEPPER={Random string for password hashing pepper in addition to Argon2id}
JWT_SECRET={JSON Web Token Secret}
```

Run `npm run dev` to start the server at [`http://localhost:3001`](http://localhost:3001), the client at [`http://localhost:3000`](http://localhost:3000) and storybook at [`http://localhost:6006`](http://localhost:6006).

A production build can be built with `npm run build`.

# Technologies

- Vite
- Husky
- Storybook
- React
- React Router
- React Query
- Node.js
- Express.js
- MongoDB with MongoDB Atlas
- Axios
- Argon2id
- JSON Web Token
- Sharp
- Typescript
- CSS Modules
- Masonry Layout with self-built infinite scrolling
- ...
