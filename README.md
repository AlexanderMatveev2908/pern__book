# PERN STACK BOOKS PROJECT 📔

Welcome to my project! This time, I decided to create an app based on books — during high school I developed a passion for reading that I still carry with me today.

---

## 🚀 Main Technologies

- **Vite** as web bundler
- **React** as the main library (or framework depending on your point of view 🧐)
- **Tailwind CSS** for styling
- **Redux Toolkit** for global state management
- **Express** as the backend framework
- **PostgreSQL** as the database

---

## 📦 Tooling & Architecture Notes

- I use **Yarn** instead of npm because it's faster for installing packages.
- I'm still learning **TypeScript**, so in some places I used `any` to bypass errors — but I made sure to be as specific as possible in key parts like API calls, Redux slices, and global types.
- I integrated **Axios** into **RTK Query** with a custom `baseQuery` to get better control and feedback from async operations.
- I tried adopting a **feature-based folder architecture** for the first time. I’m not sure I applied it perfectly in all cases, but it was a great learning experience.

---

## 🛠️ Setup Instructions

1.  **Install dependencies:**

    ```bash
    cd client && yarn install
    cd ../server && yarn install
    ```

2.  **Setup PostgreSQL with Aiven:**

    - Create an account at [Aiven.io](https://aiven.io/).
    - After logging in, create a new PostgreSQL service:
      - Choose a cloud provider (or leave the default)
      - Choose a region (or leave the default)
      - Select a plan (I chose the free one)
      - Wait a few minutes for the service to be created

3.  **Configure your database:**

    - Go to your Aiven service page.
    - Copy the Service URI.
    - Download the CA Certificate (`.pem`) for SSL connections.

4.  **Connect your backend:**

    - Store the Service URI in your `.env` file.
    - Reference the `.pem` file to enable SSL if needed.

5.  **(Optional) Setup with pgAdmin:**
    - If you want to use **pgAdmin**, paste your:
      - Host
      - Port
      - Database name
      - User
      - Password
    - ...into the pgAdmin UI when registering a new server.

---

## 🚢 Deploy Notes

### 🔥 Fly.io

I tried **Fly.io** and found it super handy for deploying directly from the terminal — very fast and straightforward.

- Fly automatically handles Docker builds if a `Dockerfile` is present in the project.
- However, Fly does NOT automatically pass environment variables at build time to the frontend (client).

#### 🔧 To pass build-time environment variables (like `VITE_` vars), use the `--build-arg` flag:

```bash
fly deploy --build-arg VITE_API_URL=https://your-api-url
```

### 🌐 Render & Railway

If you're using **Render**,it does pass environment variables at build time to the frontend by default — so no extra config needed for that.

- ⚠️ On Render, make sure to select "Environment: Docker" manually when setting up the deploy, otherwise it may default to "Node" and break things.

---

## ✅ Project is Ready to Run 🎉

If you run into any problems, feel free to message me — I’ll be happy to help and update this guide with anything I missed.

---

## 🙌 Feedback Welcome

If you see areas for improvement or have suggestions on doing things differently, I’d love to hear your ideas — always open to learning something new!

Thanks for visiting PERN\_\_BOOK ✌🏼
