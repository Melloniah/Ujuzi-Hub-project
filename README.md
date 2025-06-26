# Ujuzi-Hub

Ujuzi-Hub is a platform that seamlessly connects users with skilled "fundis" (service professionals) across various counties. Users can browse available fundis by service and location, book appointments, and leave reviews—all in one platform. The backend is powered by Flask and SQLAlchemy, with a React frontend.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
- [API Overview](#api-overview)
    - [Users & Auth](#users--auth)
    - [Fundis](#fundis)
    - [Bookings](#bookings)
    - [Reviews](#reviews)
    - [Counties & Services](#counties--services)
- [Database Models](#database-models)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)
- [Contact](#contact)

---

## Features

- **User Authentication** (JWT): Sign up and log in securely.
- **Browse Fundis**: Filter by service and county.
- **Book Appointments**: Seamless booking with fundis.
- **Leave Reviews**: Comment on your bookings and rate fundis.
- **Admin CRUD Operations**: Manage fundis, counties, services.
- **Validation**: Kenyan phone numbers, price ranges, email formats.
- **Responsive UI**: (React frontend - not included here).

---

## Tech Stack

- **Backend:** Python, Flask, Flask-RESTful, Flask-JWT-Extended, SQLAlchemy
- **Database:** SQLite/PostgreSQL (SQLAlchemy ORM)
- **Frontend:** React (see `/client` directory)
- **Other:** bcrypt (password hashing), JWT

---

## Getting Started

### Backend Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/Ujuzi-Hub-project.git
   cd Ujuzi-Hub-project
   ```

2. **Set up a virtual environment and install dependencies:**

   ```sh
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r server/requirements.txt
   pipenv install && pipenv shell
   ```

3. **Set up your database:**

   - By default, the app uses SQLite (change to PostgreSQL in `server/config.py` if desired).
   - Initialize tables:
     ```sh
     flask db init
     flask db migrate -m "message"
     flask db upgrade
     ```

4. **Run the server:**
   ```sh
   python server/app.py
   # Or:
   flask --app server/app.py run
   ```

### Frontend Setup

1. **Navigate to the client directory and install dependencies:**
   ```sh
   cd client
   npm install
   ```

2. **Run the React app:**
   ```sh
   npm start
   ```

---

## API Overview

### Users & Auth

- `POST /signup` — Register a new user
- `POST /login` — Log in (returns JWT cookie)
- `GET /check_session` — Check current session (JWT required)
- `DELETE /logout` — Log out

### Fundis

- `GET /fundis` — List all fundis
- `POST /fundis` — Register a new fundi (admin)
- `GET /fundis/<id>` — Get fundi details
- `PATCH /fundis/<id>` — Update fundi info
- `DELETE /fundis/<id>` — Remove fundi

### Bookings

- `GET /booking` — List all bookings
- `POST /booking` — Create a new booking (needs `user_id`, `fundi_id`)
- `GET /booking/<id>` — Get a booking by ID
- `PATCH /booking/<id>` — Update booking
- `DELETE /booking/<id>` — Delete booking

### Reviews

- `GET /reviews` — List all reviews
- `POST /reviews` — Add a review (`comment`, `booking_id`)
- `GET /reviews/<id>` — Get review by ID
- `PATCH /reviews/<id>` — Update review
- `DELETE /reviews/<id>` — Delete review

### Counties & Services

- `GET /counties` — List all counties
- `POST /counties` — Add a county
- `GET /counties/<id>` — County details
- `PATCH /counties/<id>` — Update
- `DELETE /counties/<id>` — Delete

- `GET /services` *(not shown above, but typically present)* — List all services

---

## Database Models

### **User**
- `id`, `username`, `email`, `phone_number`, `password_hash`
- Relationships: `bookings`

### **Fundi**
- `id`, `username`, `price`, `phonenumber`, `email`, `password_hash`, `service_id`, `county_id`
- Relationships: `service`, `county`, `bookings`

### **Booking**
- `id`, `created_at`, `updated_at`, `fundi_id`, `user_id`
- Relationships: `fundi`, `user`, `reviews`

### **Review**
- `id`, `comment`, `created_at`, `updated_at`, `booking_id`
- Relationships: `booking`

### **Service**
- `id`, `service_type`
- Relationships: `fundis`, association to `counties` via fundis

### **County**
- `id`, `name`
- Relationships: `fundis`, association to `services` via fundis

---

## Folder Structure

The project is organized as follows:

![image1](image1)

```
Ujuzi-Hub-project/
│
├── client/              # React frontend
│   └── node_modules/
│
├── server/              # Flask backend and API
│   ├── app.py
│   ├── models.py
│   ├── config.py
│   └── seed.py
│
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE.md
├── package-lock.json
├── package.json
├── Pipfile
├── Pipfile.lock
├── README.md
└── ... (other files)
```

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## Contributors

- **Mellon Obada** (Team Lead, Frontend Developer)
- **Elsie Oscar** – Frontend Developer
- **Brian Mongare** – Frontend Developer
- **Dedan Opiyo** – Backend Developer
- **Joan Kori** – Backend Developer
- **Shamim Kalande** – Backend Developer

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Contact

Created by [Group-5]  
For issues, suggestions, or feature requests, please open an [issue](https://github.com/Melloniah/Ujuzi-Hub-project/issues).
