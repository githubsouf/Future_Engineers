from datetime import datetime
from app import db, ma

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    hashed_password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    responses = db.relationship('UserResponse', back_populates='user')

    def __init__(self, email, hashed_password):
        self.email = email
        self.hashed_password = hashed_password

    def __repr__(self):
        return (f"<User(id={self.id}, email={self.email}, hashed_password={self.hashed_password}, "
                f"created_at={self.created_at}, updated_at={self.updated_at})>")


class UserSchema(ma.Schema):
    class Meta:
        fields = ['id', 'email', 'created_at', 'updated_at']

user_schema = UserSchema()
users_schema = UserSchema(many=True)
