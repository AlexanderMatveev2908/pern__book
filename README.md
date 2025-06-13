# PERN STACK BOOKS PROJECT 📔

Welcome to my project! This time, I decided to create an app based on books, during high school I developed a passion for reading that I still carry with me today.

---

## 🚀 Main Technologies

### 🚀 Main Technologies

- **Vite** as the web bundler
- **React** as the main library (or framework, depending on your point of view 🤔)
- **React Router DOM** for routing and page navigation
- **Cloudinary** for user-uploaded asset storage (images, etc.)
- **Stripe** (custom checkout, test mode) for secure payments
- **Axios** replaces the default `fetch` in RTK Query for better control
- **React Hook Form** and **Zod** for form handling and schema-based validation
- **Sequelize** as the ORM for interacting with PostgreSQL
- **TypeScript** as code compiler
- **Tailwind CSS** for utility-first styling
- **Sass (SCSS)** as an optional CSS preprocessor
- **Redux Toolkit** (with **RTK Query**) for global state and API caching
- **Express** as the backend web framework
- **Nodemailer** to send verification and transactional emails
- **Argon2** for password hashing
- **JWE**, **JWT**, and **AES-CBC-HMAC** used respectively for refresh tokens, access tokens, and verifications tokens
- **PostgreSQL** as the relational database

## PostgreSQL as the relational database

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

### ⚠️ HTTPS Dev Setup Required

This project uses **HTTPS even in development** to:

- Enable `secure` cookies for authentication
- Allow Stripe integrations that require `https://`
- Match production setup for testing parity

### Required Tools:

- `nginx` — for local reverse proxy with HTTPS
- `ngrok` — to tunnel HTTPS requests (useful for webhooks)
- `mkcert` + `nss` — to generate and trust self-signed certificates (especially needed for Firefox)

### 🔧 NGINX Config Example

Create or edit your nginx config (e.g., `/etc/nginx/nginx.conf`):

```nginx
user http;
worker_processes auto;

events {
    worker_connections 1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout 65;

    server_tokens off;
    types_hash_max_size 2048;
    types_hash_bucket_size 128;

    server {
        listen 80;
        server_name localhost;

        location / {
            return 301 https://$host$request_uri;
        }
    }

    server {
        listen 443 ssl;
        server_name localhost;

        client_max_body_size 200M;

        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        access_log /var/log/nginx/access.log;
        error_log  /var/log/nginx/error.log warn;

        ssl_certificate     /home/ninja/certs/nginx-dev/localhost.pem;
        ssl_certificate_key /home/ninja/certs/nginx-dev/localhost-key.pem;

        location /api/v1/ {
            proxy_pass http://localhost:3000/api/v1/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location / {
            proxy_pass http://localhost:3001/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

### 🌐 Start NGINX

```bash
ngx() {
  sudo systemctl start nginx
}
```

### 🌍 Create a Tunnel with ngrok

```bash
rokix() {
  ngrok http https://localhost --host-header=localhost > /dev/null &
  sleep 2

  url=$(curl -s http://127.0.0.1:4040/api/tunnels \
    | grep -o 'https://[a-zA-Z0-9.-]*\.ngrok-free\.app' \
    | head -n 1)

  full_url="${url}/api/v1/webhooks/stripe"

  if [[ -n "$url" ]]; then
    echo "✅ ngrok URL: $url"

    if command -v wl-copy &>/dev/null; then
      echo -n "$full_url" | wl-copy
      echo "📋 Copied to clipboard with wl-copy"
    elif command -v xclip &>/dev/null; then
      echo -n "$full_url" | xclip -selection clipboard
      echo "📋 Copied to clipboard with xclip"
    else
      echo "⚠️ Clipboard tool not found. Please install wl-clipboard or xclip."
    fi
  else
    echo "❌ Could not extract ngrok URL. Is ngrok running correctly?"
  fi
}
```

### 🧪 Trust the HTTPS Certificate

- Use `mkcert` to generate local dev certs
- Add them to the trust store with `mkcert -install`
- For Firefox, install `nss` (`sudo pacman -S nss`) to integrate with system certs

---

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
