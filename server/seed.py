# Standard library imports
from random import randint, choice as rc
from datetime import datetime, timezone, timedelta


# Remote library imports
from faker import Faker
from werkzeug.security import generate_password_hash

# Local imports
from app import app
from models import db, User, Service, Booking, Review, Fundi, County

fake = Faker()

if __name__== "__main__":
    with app.app_context():
        print("Starting seed...")
        # Drop all tables and recreate them
        print("Dropping and creating tables...")
        db.drop_all()
        db.create_all()

        # Seed Counties
        print("Seeding counties...")
        county_names = [
            "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Busia",
            "Machakos", "Kakamega", "Nyeri", "Kiambu", "Meru"
        ]
        counties = [County(name=name) for name in county_names]
        db.session.add_all(counties)
        db.session.commit()

        # Seed Services
        print("Seeding services...")
        service_names = ["Plumbing", "Electrical", "Painting"]
        services = [Service(service_type=name) for name in service_names]
        db.session.add_all(services)
        db.session.commit()

        # Seed Users
        print("Seeding users...")
        users = []
        for _ in range(10):
            user = User(
                username=fake.user_name(),
                email=fake.unique.email(),
                phone_number=fake.phone_number(),
                password_hash=generate_password_hash("password123")
            )
            users.append(user)
        db.session.add_all(users)
        db.session.commit()

        # Seed Fundis
        print("Seeding fundis...")
        fundis = []
        for _ in range(20):
            fundi = Fundi(
                image=f"https://i.pravatar.cc/150?img={randint(1, 70)}",  # <-- updated line
                name=fake.name(),
                price=randint(500, 5000),
                phone_number=f"07{randint(0, 99999999):08d}",
                email=fake.unique.email(),
                password_hash=generate_password_hash("password123"),
                service_id=rc(services).id,
                county_id=rc(counties).id
            )
            fundis.append(fundi)

        db.session.add_all(fundis)
        db.session.commit()

        # Seed Bookings
        print("Seeding bookings...")
        bookings = []
        for _ in range(10):
            username=fake.user_name(),
            email=fake.unique.email(),
            user = rc(users)
            fundi = rc(fundis)
            booking = Booking(
                full_name=fake.name(),
                email=fake.unique.email(),
                user_id=user.id,
                fundi_id=fundi.id,
                created_at=datetime.now(timezone.utc)- timedelta(days=randint(1, 30)),
                updated_at=datetime.now(timezone.utc)
            )
            bookings.append(booking)
        db.session.add_all(bookings)
        db.session.commit()

        # Seed Reviews
        print("Seeding reviews...")
        comments = [
            "Excellent work!", "Very professional.",
            "Late arrival, good job.", "Not satisfied.",
            "Highly recommended!"
        ]
        reviews = []
        for booking in bookings:
            if randint(0, 1):  # 50% chance sometimes it will create a review sometimes not
                review = Review(
                    comment=rc(comments),
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow(),
                    booking_id=booking.id
                )
                reviews.append(review)
        db.session.add_all(reviews)
        db.session.commit()

        print("Seeding complete!")


