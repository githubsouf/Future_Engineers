from datetime import datetime
from app import db, ma

class UserResponse(db.Model):
    __tablename__ = 'user_responses'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='responses')
    answers = db.relationship('UserResponseAnswer', back_populates='user_response')
    recommendations = db.relationship('Recommendation', back_populates='user_response')


    def __init__(self, user_id):
        self.user_id = user_id

    def __repr__(self):
        return f"<UserResponse(id={self.id}, user_id={self.user_id}, submitted_at={self.submitted_at})>"

class UserResponseSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        fields = ['id', 'user_id', 'submitted_at']

user_response_schema = UserResponseSchema()
user_responses_schema = UserResponseSchema(many=True)
