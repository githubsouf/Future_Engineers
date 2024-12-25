from datetime import datetime
from app import db, ma


class Recommendation(db.Model):
    __tablename__ = 'recommendations'

    id = db.Column(db.Integer, primary_key=True)
    user_response_id = db.Column(db.Integer, db.ForeignKey('user_responses.id'), nullable=False)
    recommended_field_id = db.Column(db.Integer, db.ForeignKey('fields.id'), nullable=True)
    compatibility_score = db.Column(db.Float, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_response = db.relationship('UserResponse', back_populates='recommendations')
    recommended_field = db.relationship('Field', back_populates='recommendations')

    def __init__(self, user_response_id, recommended_field_id=None, compatibility_score=None):
        self.user_response_id = user_response_id
        self.recommended_field_id = recommended_field_id
        self.compatibility_score = compatibility_score

    def __repr__(self):
        return (f"<Recommendation(id={self.id}, user_response_id={self.user_response_id}, "
                f"recommended_field_id={self.recommended_field_id}, compatibility_score={self.compatibility_score}, "
                f"created_at={self.created_at})>")
class RecommendationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        fields = ['id', 'user_response_id', 'recommended_field_id', 'compatibility_score', 'created_at']

recommendation_schema = RecommendationSchema()
recommendations_schema = RecommendationSchema(many=True)
