from datetime import datetime
from app import db, ma

class QuizQuestion(db.Model):
    __tablename__ = 'quiz_questions'

    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.String(500), nullable=False)
    category = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    answers = db.relationship('UserResponseAnswer', back_populates='question')

    def __init__(self, question_text, category=None):
        self.question_text = question_text
        self.category = category

    def __repr__(self):
        return f"<QuizQuestion(id={self.id}, question_text={self.question_text}, category={self.category}, created_at={self.created_at})>"

class QuizQuestionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        fields = ['id', 'question_text', 'category', 'created_at']

quiz_question_schema = QuizQuestionSchema()
quiz_questions_schema = QuizQuestionSchema(many=True)
