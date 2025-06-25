# Standard library imports
import os

# # Generate the environment variables (.env file)
# from dotenv import load_dotenv
# load_dotenv()

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt

# JWT #
from flask_jwt_extended import JWTManager

# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# JWT settings #
app.config['JWT_SECRET_KEY'] = b'\xc9\x9b\x1f\x12\x12\xfb\x80\xb9\x94\xb0C+\x95\xc4Mr' ## os.environ.get("JWT_SECRET_KEY") or "app-secret-key"
app.config['JWT_TOKEN_LOCATION'] = ["cookies"]
app.config['JWT_ACCESS_COOKIE_NAME'] = "access_token_cookie"
app.config['JWT_COOKIE_CSRF_PROTECT'] = False  # or True with CSRF token (frontend support)
app.config["JWT_VERIFY_SUB"] = False # Test # Optional
app.config["JWT_COOKIE_SECURE"] = False # True in production
app.config["JWT_COOKIE_SAMESITE"] = "Lax"  # or 'None' -if using HTTPS cross-origin

jwt = JWTManager(app)

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)