
# Quote API

A RESTful API that serves random inspirational quotes with IP-based rate limiting. Built using **Express.js**, documented with **Swagger**, and tested using **Jest** and **Supertest**.

---

## 🚀 Features

✔ **GET /api/quote** – Retrieve a random inspirational quote  
✔ **IP-based rate limiting** – Each IP allowed 5 requests per minute  
✔ **Swagger documentation** – Interactive API docs at `/api-docs`  
✔ **Unit tests** – Tests for rate limiting using Jest and Supertest  
✔ **Deployment ready** – Supports Heroku and Vercel deployment configurations  
✔ **Logging** – Request logs including IP address and response status  

---

## 📂 Project Structure

```
quote-api/
├── server.js           # Main application code
├── server.test.js      # Unit tests
├── package.json        # Dependencies and scripts
├── README.md           # This documentation
```

---

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/saihariprasad1246/quote-api.git
   cd quote-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the server:

   ```bash
   npm start
   ```

   The server will start at `http://localhost:3000`.

4. Access the API documentation:

   ```
   http://localhost:3000/api-docs
   ```

---

## 📖 API Documentation

### **GET /api/quote**

- Returns a random inspirational quote.

**Request:**

```bash
GET /api/quote
```

**Response (200 OK):**

```json
{
  "quote": "The only way to do great work is to love what you do. - Steve Jobs"
}
```

**Rate limiting (429 Too Many Requests):**

```json
{
  "error": "Rate limit exceeded. Try again in 45 seconds."
}
```

---

## ✅ Testing

Unit tests are implemented using Jest and Supertest.

### Run tests:

```bash
npm test
```

This will:

✔ Test that an IP can make up to 5 requests successfully  
✔ Confirm that the 6th request gets blocked with a 429 error

---

## ⚙️ Configuration

- **Rate limit**: 5 requests per minute per IP  
- **In-memory storage**: Used for quotes and rate limiting (no database)  
- **Swagger documentation**: Available at `/api-docs`

You can adjust the rate limit by editing the `limiter` configuration in `server.js`.

---

## 🛠 Assumptions & Design Decisions

✔ In-memory data is sufficient — no persistent storage is required  
✔ Swagger is used for API documentation to improve usability  
✔ Express-rate-limit handles rate limiting efficiently  
✔ Jest and Supertest ensure code reliability and prevent regressions  
✔ The application is designed to be easily deployable and maintainable  

---

## 📂 License

MIT License.

---

## 📬 Contact

Developed by **Sai Hari Prasad**.

For questions or improvements, feel free to submit issues or pull requests!
