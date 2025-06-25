#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from sqlalchemy.exc import IntegrityError
from flask_restful import Resource

# JWT
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity,
    set_access_cookies,
    unset_jwt_cookies
)


# Local imports
from config import app, db, api, jwt, bcrypt
# Add your model imports
from models import User, Booking, Review, Fundi, County #


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# 1. Signup
class Signup(Resource):
    
    def post(self):
        
        data = request.get_json()
        
        if not data:
            return {'error': "No user details provided"}, 400
        
        username = data.get('username')
        password = data.get('password') 
        email = data.get('email')
        phone_number = data.get('phone_number')

        if not username or not email:
           return {'error': "No user details provided"}, 400

        try:
            new_user = User(
                username=username,
                email=email,
                phone_number=phone_number,
                # Remoed couty_id
            )
            
            password_hash = bcrypt.generate_password_hash(
                password.encode('utf-8') 
            )
            new_user.password_hash = password_hash.decode('utf-8')
    
            db.session.add(new_user)
            db.session.commit()

            # OPTIONAL: issuing JWT on signup (issued on login)
            access_token = create_access_token(identity=new_user.id)
            response = make_response(new_user.to_dict(), 201)
            set_access_cookies(response, access_token)
            
            return response

        except IntegrityError:
            db.session.rollback() 
            return {'error': "Username or Email already exists"}, 422
        
        except:
            return {'error': "Unprocessable Entity"}, 422

# 2. Login
class Login(Resource):

    def post(self):
        data = request.get_json()

        if not data:
            return {'error': "No user details provided"}, 400

        username_or_email = data.get('username')  # Either username or email
        password = data.get('password')

        if not username_or_email or not password:
            return {'error': "Username/Email and password are required"}, 400

        user = User.query.filter(
            (User.username == username_or_email) | (User.email == username_or_email)
        ).first()

        if not user or not bcrypt.check_password_hash(user.password_hash, password.encode('utf-8')):
            return {'error': "Invalid username or password"}, 401

        access_token = create_access_token(identity=user.id)
        response = make_response(user.to_dict(), 200)
        set_access_cookies(response, access_token)
        
        return response   

# 3. Ckeck session
# Use: jwt_required, get_jwt_identity
class CheckSession(Resource):
    
    @jwt_required()
    def get(self):
        
        user_id = get_jwt_identity()
        
        user = User.query.get(user_id)

        if user:
            return make_response(user.to_dict(), 200)
        return {}, 401

# 4. Logout
class Logout(Resource):
    
    @jwt_required()
    def delete(self):
        
        response = make_response({}, 204)
        
        unset_jwt_cookies(response)
        
        return response

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Logout, '/logout', endpoint='logout')

# Model-based Routes
class BookingResource(Resource):

    def get(self):
        booking = [booking.to_dict() for booking in Booking.query.all()]

        if not booking:
           return {"error": "No booking retrieved. Please try again."}, 500

        return make_response(jsonify(booking), 200)

    def post(self):

        data = request.get_json()

        try:
            new_booking = Booking(
                fundi_id =data.get('fundi_id'),
                user_id =data.get('user_id'),
            )

            db.session.add(new_booking)
            db.session.commit()

        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 422

        return make_response(new_booking.to_dict(), 201)

class BookingByID(Resource):
    
    def get(self, id):
        booking = Booking.query.filter_by(id=id).first()

        if not booking:
           return {"error": "Wrong booking id. Resource not found."}, 400
        
        return make_response(booking.to_dict(), 200)

    def patch(self, id):

        data = request.get_json()

        booking = Booking.query.filter_by(id=id).first()

        if not booking:
           return {"error": "Wrong booking id. Resource not found."}, 400

        for attr in data:
            setattr(booking, attr, data[attr])

        db.session.add(booking)
        db.session.commit()

        return make_response(booking.to_dict(), 200)

    def delete(self, id):

        booking = Booking.query.filter_by(id=id).first()

        if not booking:
           return {"error": "Wrong booking id. Resource not found."}, 400

        db.session.delete(booking)
        db.session.commit()

        return make_response('', 204)

api.add_resource(BookingResource, '/booking', endpoint='booking')
api.add_resource(BookingByID, '/booking/<int:id>', endpoint='bookingbyid')

# Review CRUD
class ReviewResource(Resource):

    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]

        if not reviews:
            return {"error": "No reviews found."}, 404

        return make_response(jsonify(reviews), 200)

    def post(self):
        data = request.get_json()

        try:
            new_review = Review(
                comment=data.get('comment'),
                booking_id=data.get('booking_id'),
            )

            db.session.add(new_review)
            db.session.commit()

        except Exception as e:
            return {"errors": "422: Unprocessable Entity", "message": str(e)}, 422

        return make_response(new_review.to_dict(), 201)

class ReviewByID(Resource):

    def get(self, id):
        review = Review.query.filter_by(id=id).first()

        if not review:
            return {"error": "Review not found."}, 404

        return make_response(review.to_dict(), 200)

    def patch(self, id):
        data = request.get_json()
        review = Review.query.filter_by(id=id).first()

        if not review:
            return {"error": "Review not found."}, 404

        for attr in data:
            setattr(review, attr, data[attr])

        db.session.commit()

        return make_response(review.to_dict(), 200)

    def delete(self, id):
        review = Review.query.filter_by(id=id).first()

        if not review:
            return {"error": "Review not found."}, 404

        db.session.delete(review)
        db.session.commit()

        return make_response('', 204)

api.add_resource(ReviewResource, '/reviews', endpoint='reviews')
api.add_resource(ReviewByID, '/reviews/<int:id>', endpoint='reviewbyid')

# Fundi CRUD
class FundiResource(Resource):

    def get(self):
        fundis = [fundi.to_dict() for fundi in Fundi.query.all()]

        if not fundis:
            return {"error": "No fundis found."}, 404

        return make_response(jsonify(fundis), 200)

    def post(self):
        data = request.get_json()

        password = data.get('password') 

        try:
            new_fundi = Fundi(
                name=data.get('name'),
                price=data.get('price'),
                phonenumber=data.get('phonenumber'),
                email=data.get('email'),
                service_id=data.get('service_id'),
                county_id=data.get('county_id'), # Added county_id
            )

            password_hash = bcrypt.generate_password_hash(
                password.encode('utf-8') 
            )
            new_fundi.password_hash = password_hash.decode('utf-8')
    
            db.session.add(new_fundi)
            db.session.commit()

            response = make_response(new_fundi.to_dict(rules=('-password_hash',)), 201) # Added rules
            
            return response
        
        except Exception as e:
            return {"errors": "422: Unprocessable Entity", "message": str(e)}, 422

class FundiByID(Resource):

    def get(self, id):
        fundi = Fundi.query.filter_by(id=id).first()

        if not fundi:
            return {"error": "Fundi not found."}, 404

        return make_response(fundi.to_dict(rules=('-password_hash',)), 200) # Exclude password

    def patch(self, id):
        data = request.get_json()
        fundi = Fundi.query.filter_by(id=id).first()

        if not fundi:
            return {"error": "Fundi not found."}, 404
        
        ALLOWED_FIELDS = {'name', 'price', 'phonenumber', 'email', 'service_id', 'county_id'}

        for attr in data:
            if attr == 'password':
                # Allow updating/changing password
                password_hash = bcrypt.generate_password_hash(data['password'].encode('utf-8'))
                fundi.password_hash = password_hash.decode('utf-8')
            
            elif attr in ALLOWED_FIELDS:
                setattr(fundi, attr, data[attr])

        db.session.commit()

        return make_response(fundi.to_dict(), 200)

    def delete(self, id):
        fundi = Fundi.query.filter_by(id=id).first()

        if not fundi:
            return {"error": "Fundi not found."}, 404

        db.session.delete(fundi)
        db.session.commit()

        return make_response('', 204)

api.add_resource(FundiResource, '/fundis', endpoint='fundis')
api.add_resource(FundiByID, '/fundis/<int:id>', endpoint='fundibyid')

# County CRUD
class CountyResource(Resource):

    def get(self):
        counties = [county.to_dict() for county in County.query.all()]

        if not counties:
            return {"error": "No counties found."}, 404

        return make_response(jsonify(counties), 200)

    def post(self):
        data = request.get_json()

        try:
            new_county = County(
                name=data.get('name'),
            )
    
            db.session.add(new_county)
            db.session.commit()

            response = make_response(new_county.to_dict(), 201)
            
            return response
        
        except Exception as e:
            return {"errors": "422: Unprocessable Entity", "message": str(e)}, 422

class CountyByID(Resource):

    def get(self, id):
        county = County.query.filter_by(id=id).first()

        if not county:
            return {"error": "County not found."}, 404

        return make_response(county.to_dict(), 200) 

    def patch(self, id):
        data = request.get_json()
        county = County.query.filter_by(id=id).first()

        if not county:
            return {"error": "County not found."}, 404

        for attr in data:
            setattr(county, attr, data[attr])

        db.session.commit()

        return make_response(county.to_dict(), 200)

    def delete(self, id):
        county = County.query.filter_by(id=id).first()

        if not county:
            return {"error": "County not found."}, 404

        db.session.delete(county)
        db.session.commit()

        return make_response('', 204)

api.add_resource(CountyResource, '/counties', endpoint='counties')
api.add_resource(CountyByID, '/counties/<int:id>', endpoint='countybyid')


if _name_ == '_main_':
    app.run(port=5555, debug=True)