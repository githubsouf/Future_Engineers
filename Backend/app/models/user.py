from datetime import datetime, timedelta
import secrets
from app import db, ma, bcrypt

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    hashed_password = db.Column(db.String(200), nullable=False)
    reset_token = db.Column(db.String(200), nullable=True)  # Reset token
    reset_token_expiration = db.Column(db.DateTime, nullable=True)  # Token expiration
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    responses = db.relationship('UserResponse', back_populates='user')

    def __init__(self, email, password):
        self.email = email
        self.hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        """Verify the hashed password."""
        return bcrypt.check_password_hash(self.hashed_password, password)

    def generate_reset_token(self):
        """Generate a secure reset token."""
        self.reset_token = secrets.token_urlsafe(32)
        self.reset_token_expiration = datetime.utcnow() + timedelta(hours=1)  # 1-hour expiration

    def __repr__(self):
        return (f"<User(id={self.id}, email={self.email}, created_at={self.created_at}, "
                f"updated_at={self.updated_at})>")

class UserSchema(ma.Schema):
    class Meta:
        fields = ['id', 'email', 'created_at', 'updated_at']

user_schema = UserSchema()
users_schema = UserSchema(many=True)
