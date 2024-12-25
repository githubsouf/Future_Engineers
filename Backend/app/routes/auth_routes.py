from datetime import datetime
from email.mime.text import MIMEText
import smtplib
import bcrypt
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models.user import User
from app import db

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/register', methods=['POST'])
def register():
    """Register a new user"""
    data = request.get_json()

    # Check if the email is already registered
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already registered'}), 400

    # Create a new user
    new_user = User(email=data['email'], password=data['password'])  # Use 'password' instead of 'hashed_password'
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully', 'user': {'email': new_user.email}}), 201

@auth_blueprint.route('/login', methods=['POST'])
def login():
    """Login user and return access token"""
    data = request.get_json()

    # Find user by email
    user = User.query.filter_by(email=data['email']).first()

    if user and user.check_password(data['password']):  # Validate password
        # Convert user ID to a string before creating the token
        access_token = create_access_token(identity=str(user.id))  
        return jsonify({'access_token': access_token}), 200

    return jsonify({'message': 'Invalid email or password'}), 401
@auth_blueprint.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    """A protected route to test JWT tokens"""
    user_id = get_jwt_identity()
    return jsonify({'message': f'Hello, user {user_id}'}), 200
