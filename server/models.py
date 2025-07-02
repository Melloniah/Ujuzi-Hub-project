from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
import re
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class Service(db.Model, SerializerMixin):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    service_type = db.Column(db.String)

    service_fundis = db.relationship("Fundi", back_populates="service")
    counties = association_proxy('service_fundis', 'county')

    serialize_rules = ('-service_fundis.service',)

    
  
    @property
    def county_list(self):
        return [county.to_dict() for county in self.counties]

class County(db.Model, SerializerMixin):
    __tablename__ = 'counties'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)


    county_fundis = db.relationship("Fundi", back_populates="county")
    services = association_proxy('county_fundis', 'service')

    serialize_rules = ('-county_fundis.county',)
  
    @property
    def service_list(self):
        return [service.to_dict() for service in self.services]

class Fundi(db.Model, SerializerMixin):
    __tablename__ = 'fundis'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=True)
    price = db.Column(db.Float)

    phone_number = db.Column(db.String)
   
    email = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String, nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'))
    county_id = db.Column(db.Integer, db.ForeignKey('counties.id'))


    service = db.relationship("Service", back_populates="service_fundis")
    county = db.relationship("County", back_populates="county_fundis")
    fundi_bookings = db.relationship("Booking", back_populates="fundi", cascade='all, delete-orphan')

    serialize_rules = ('-service.service_fundis', '-county.county_fundis', '-password_hash',)

 
   
    @validates("price")
    def validate_prices(self, key, price):
        if price is None or not (500 <= price <= 5000):
            raise ValueError("Price must be between 500 & 5000")
        return price


   
    @validates("email")
    def validate_emails(self, key, email):
        email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_regex, email):
            raise ValueError("Invalid email format. Must contain '@' and domain name.")
        return email

    @validates('phone_number')
    def validate_phonenumbers(self, key, phone_number):
        phonenumber_regex = r'^(?:\+254|254|0)7\d{8}$'
        if not re.match(phonenumber_regex, phone_number):
            raise ValueError("Invalid Kenyan phone number")
        return phone_number

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    phone_number = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String, nullable=False)


    user_bookings = db.relationship("Booking", back_populates="user", cascade='all, delete-orphan')

    serialize_rules = ('-user_bookings.user', '-password_hash',)


    @validates("email")
    def validate_emails(self, key, email):
        email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_regex, email):
            raise ValueError("Invalid email format. Must contain '@' and domain name.")
        return email

class Booking(db.Model, SerializerMixin):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String(100), nullable=False)

    date = db.Column(db.Date, nullable=True)  
    service = db.Column(db.String, nullable=True)  

    created_at = db.Column(db.DateTime(), server_default=func.now())
    updated_at = db.Column(db.DateTime(), onupdate=func.now())

    fundi_id = db.Column(db.Integer, db.ForeignKey('fundis.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship("User", back_populates="user_bookings")
    fundi = db.relationship("Fundi", back_populates="fundi_bookings")
    reviews = db.relationship("Review", back_populates="review_booking", cascade='all, delete-orphan')

    serialize_rules = ('-user.user_bookings', '-fundi.fundi_bookings', '-reviews.review_booking',)

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(), server_default=func.now())
    updated_at = db.Column(db.DateTime(), onupdate=func.now())

    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'))

    review_booking = db.relationship("Booking", back_populates="reviews")


    serialize_rules = (
        '-review_booking.reviews',
        '-review_booking.user.user_bookings',
        '-review_booking.fundi.fundi_bookings',
    )