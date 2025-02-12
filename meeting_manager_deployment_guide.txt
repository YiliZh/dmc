# Meeting Manager - Deployment Guide

## **1️⃣ Running the Application Locally**
This guide provides step-by-step instructions to set up, run, and deploy the Meeting Manager application.

### **1.1 Install Dependencies**
Ensure all required dependencies are installed before running the application:
```sh
npm install
```

### **1.2 Start the JSON Server (Mock API)**
The application requires `json-server` to serve meeting data.
Start the server by running:
```sh
npx json-server --watch src/db/data.json --port 3005
```
✅ **Verify:** Open **[http://localhost:3005/meetings](http://localhost:3005/meetings)** in your browser to check if the mock API is running.

### **1.3 Start the React Application**
Run the React app in a separate terminal:
```sh
npm start
```
✅ The app will open automatically in your default browser at:  
**[http://localhost:3000/](http://localhost:3000/)**

### **1.4 Stopping the Application**
To stop the application:
- **Stop JSON Server:** Press `CTRL + C` in the terminal where it’s running.
- **Stop React App:** Press `CTRL + C` in the terminal running `npm start`.

---

## **2️⃣ Deploying to a Production Server**
There are multiple ways to deploy a React app. Below are two commonly used methods.

### **2.1 Deploying to a Static Hosting Service (Recommended)**
For deployment to **Netlify, Vercel, or GitHub Pages**, follow these steps:

#### **Step 1: Build the React App**
Run:
```sh
npm run build
```
This creates a production-ready build inside the `/build` folder.

#### **Step 2: Deploy to Netlify (Example)**
1. Install the Netlify CLI (optional):
   ```sh
   npm install -g netlify-cli
   ```
2. Deploy using Netlify:
   ```sh
   netlify deploy --prod
   ```

✅ **Alternative:** Upload the `/build` folder manually to **Netlify, Vercel, or GitHub Pages**.

---

### **2.2 Deploying to a Node.js Server**
If you want to deploy the app using **Node.js & Express**, follow these steps:

#### **Step 1: Install `serve`**
```sh
npm install -g serve
```

#### **Step 2: Serve the Production Build**
```sh
serve -s build -l 5000
```
✅ The app will now be available at **http://localhost:5000/**.

---

### **2.3 Deploying JSON Server to a Remote Server**
If you need to deploy `json-server` to a cloud service (like Heroku or Render):

#### **Step 1: Create a `server.js` File**
Inside the project root, create `server.js`:
```javascript
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("src/db/data.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3005;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});
```

#### **Step 2: Deploy to Heroku (Example)**
1. Install the Heroku CLI:
   ```sh
   npm install -g heroku
   ```
2. Login to Heroku:
   ```sh
   heroku login
   ```
3. Create a new Heroku app:
   ```sh
   heroku create my-meeting-manager
   ```
4. Push the code:
   ```sh
   git add .
   git commit -m "Deploy JSON Server"
   git push heroku main
   ```

✅ The JSON Server will be hosted at **`https://my-meeting-manager.herokuapp.com/meetings`**.

---

## **3️⃣ Post Deployment Checks**
- **Ensure API calls work** in production by updating the API URL in the frontend (`Home.js` & `CalendarProvider.js`).
- **Monitor performance & logs** using Netlify/Vercel dashboards or Heroku logs:
  ```sh
  heroku logs --tail
  ```

🚀 **Congratulations! Your Meeting Manager is now running in production.** Let me know if you need any modifications! 🎉
