from datetime import datetime
from app import db, ma


class UserResponseAnswer(db.Model):
    __tablename__ = 'user_response_answers'

    id = db.Column(db.Integer, primary_key=True)
    user_response_id = db.Column(db.Integer, db.ForeignKey('user_responses.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('quiz_questions.id'), nullable=False)
    answer_value = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_response = db.relationship('UserResponse', back_populates='answers')
    question = db.relationship('QuizQuestion', back_populates='answers')

    def __init__(self, user_response_id, question_id, answer_value=None):
        self.user_response_id = user_response_id
        self.question_id = question_id
        self.answer_value = answer_value

    def __repr__(self):
        return (f"<UserResponseAnswer(id={self.id}, user_response_id={self.user_response_id}, "
                f"question_id={self.question_id}, answer_value={self.answer_value}, created_at={self.created_at})>")
class UserResponseAnswerSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        fields = ['id', 'user_response_id', 'question_id', 'answer_value', 'created_at']

user_response_answer_schema = UserResponseAnswerSchema()
user_response_answers_schema = UserResponseAnswerSchema(many=True)
