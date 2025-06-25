from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
import re
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class Service(db.Model, SerializerMixin):
    __tablename__='services'
    
    id = db.Column(db.Integer, primary_key=True)
    service_type = db.Column(db.String)

    #Relationship - To get all fundis with a specific service
    fundis = db.relationship("Fundi", back_populates="service")

    #Association proxy
    counties = association_proxy('fundis', 'county')

    #Serialization rules
    serialize_rules = ('-fundis.service',)

class County(db.Model, SerializerMixin):
    __tablename__='counties'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    #Relationship
    fundis = db.relationship("Fundi", back_populates="county")

    #Association proxy- get services offered in a certain county through fundis
    services = association_proxy('fundis', 'service')

    #Serialization rules
    serialize_rules = ('-fundis.county',)
  
class Fundi(db.Model, SerializerMixin):
    __tablename__='fundis'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    price = db.Column(db.Float)
    phone_number = db.Column(db.String)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String, nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'))
    county_id = db.Column(db.Integer, db.ForeignKey('counties.id'))
 
    #Relationships
    service = db.relationship("Service", back_populates="fundis")
    county = db.relationship("County", back_populates="fundis")
    bookings = db.relationship("Booking", back_populates ="fundi", cascade='all,  delete-orphan')
    
    #Serialization rules
    serialize_rules = ('-password_hash', '-bookings', 'county.name', 'service.service_type')

    ##Validations
    #Price validation
    @validates("price")
    def validate_prices(self, key, price):
        if price is None or not (500 <= price <= 5000):
            raise ValueError("Price must be between 500 & 5000")
        return price
    
    #Email validation
    @validates("email")
    def validate_emails(self, key, email):

        email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'

        if not re.match(email_regex, email):
            raise ValueError("Invalid email format. Must contain '@' and domain name.")
        return email

    ##Phone number
    @validates('phone_number')
    def validate_phonenumbers(self, key, phone_number):
        phonenumber_regex = r'^(?:\+254|254|0)7\d{8}$'
        if not re.match(phonenumber_regex, phone_number):
            raise ValueError("Invalid Kenyan phone number")
        return phone_number
    
class User(db.Model, SerializerMixin):

    __tablename__='users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    phone_number = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String, nullable=False)

    #Relationship
    bookings = db.relationship("Booking", back_populates ="user", cascade='all,  delete-orphan')
    
    #Serialization rules
    serialize_rules = ('-password_hash', '-bookings.user',)

    ##Validations
    #Email validation
    @validates("email")
    def validate_emails(self, key, email):

        email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'

        if not re.match(email_regex, email):
            raise ValueError("Invalid email format. Must contain '@' and domain name.")
        return email

    ##Phone number
    @validates('phone_number')
    def validate_phone(self, key, phone_number):
        phonenumber_regex = r'^(?:\+254|254|0)7\d{8}$'
        if not re.match(phonenumber_regex, phone_number):
            raise ValueError("Invalid Kenyan phone number")
        return phone_number
    

class Booking(db.Model, SerializerMixin):
    __tablename__='bookings'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    created_at = db.Column(db.DateTime(), server_default= func.now())
    updated_at = db.Column(db.DateTime(), onupdate=func.now())

    fundi_id = db.Column(db.Integer, db.ForeignKey('fundis.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    #Relationship
    fundi = db.relationship("Fundi", back_populates = "bookings")
    user = db.relationship("User", back_populates= "bookings")
    reviews = db.relationship("Review", back_populates="booking", cascade='all, delete-orphan')

    #Serialization rules
    serialize_rules = ('-reviews.booking', '-fundi.bookings', '-user.bookings')

class Review(db.Model, SerializerMixin):
    __tablename__='reviews'

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(), server_default= func.now())
    updated_at = db.Column(db.DateTime(), onupdate=func.now())

    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'))

    #Relationship
    booking = db.relationship("Booking", back_populates="reviews")

    #Serialization rules
    serialize_rules = ('-booking.reviews', '-booking.user.bookings', '-booking.fundi.bookings')

  





