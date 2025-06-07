# PERN STACK BOOKS PROJECT 📔

Welcome to my project! This time, I decided to create an app based on books, during high school I developed a passion for reading that I still carry with me today.

---

## 🚀 Main Technologies

- **Vite** as web bundler
- **React** as the main library (or framework depending on your point of view 🤔)
- **Tailwind CSS** for styling
- **Redux Toolkit** for global state management
- **Express** as the backend framework
- **PostgreSQL** as the database

---

## 📆 Tooling & Architecture Notes

- I use **Yarn Berry (v4)** instead of npm because it's faster for setups.

- **Yarn Berry Setup**:

  ```bash
  sudo corepack enable && \
  corepack prepare yarn@4.9.1 --activate && \
  yarn set version berry && \
  echo "nodeLinker: node-modules" > .yarnrc.yml && \
  yarn install
  ```

  > This ensures you're using Yarn Berry **with `node_modules` instead of PnP**, which improves compatibility with many packages while still keeping the speed boost.

- I'm still learning **TypeScript**, so in some places I used `any` to bypass errors — but I made sure to be as specific as possible in key parts like API calls, Redux slices, and global types.

- I integrated **Axios** into **RTK Query** with a custom `baseQuery` to get better control and feedback from async operations.

- I tried adopting a **feature-based folder architecture** for the first time. I’m not sure I applied it perfectly in all cases, so advices are really welcome

---

## 🛠️ Setup Instructions

1. **Install dependencies:**

   ```bash
   cd client && yarn install
   cd ../server && yarn install
   ```

2. **Setup PostgreSQL with Aiven:**

   - Create an account at [Aiven.io](https://aiven.io/).
   - After logging in, create a new PostgreSQL service:

     - To stay on the free tier, leave all options at their defaults. Just pick the nearest available cloud region if it's included in the base plan.

3. **Configure your database:**

   - Go to your Aiven service page.
   - Copy the Service URI.
   - Download the CA Certificate (`.pem`) for SSL connections.

4. **Connect your backend:**

   - Store the Service URI in your `.env` file.
   - Reference the `.pem` file to enable SSL if needed.

5. **(Optional) Setup with pgAdmin:**

   - If you want to use **pgAdmin**, paste your:

     - Host
     - Port
     - Database name
     - User
     - Password

   - into the pgAdmin UI when registering a new server.

---

## 🚢 Deploy Notes

### 🔥 Fly.io (with Docker)

This project is deployed using a **single Dockerfile** that serves **both the Express backend and React frontend** together. Express is configured to serve the compiled client as static files.

I used **Fly.io** to deploy the full stack app easily:

- Fly automatically detects and builds from a `Dockerfile`.
- However, it **does not automatically pass `VITE_` env variables at build time** to the frontend.

To pass build-time environment variables:

```bash
fly deploy --build-arg VITE_API_URL=https://your-api-url
```

### 🌐 Render

If you're using **Render**:

- It **does** pass environment variables at build time.
- Make sure to select **"Environment: Docker"** during setup or it might default to "Node" and break the deployment.

---

## ✅ Project is Ready to Run 🎉

If you run into any problems, feel free to message me, I’ll be happy to help and update this guide with anything I missed.

---

## 🙌 Feedback Welcome

If you have any suggestions or see any areas for improvement, I’d be glad to hear them and work on improving the app further.

Thanks for visiting **PERN\_\_BOOK** ✌︎️
