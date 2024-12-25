from app import create_app, db
from app.models.user import User
from app.models.user_response import UserResponse
from app.models.user_response_answer import UserResponseAnswer
from app.models.quiz_question import QuizQuestion
from app.models.field import Field
from app.models.recommendation import Recommendation

app = create_app()

with app.app_context():
    # Clear the database (useful for repeated testing)
    db.drop_all()
    db.create_all()

    # Insert data into `users`
    user1 = User(email="user1@example.com", hashed_password="hashedpassword123")
    user2 = User(email="user2@example.com", hashed_password="hashedpassword456")
    db.session.add_all([user1, user2])
    db.session.commit()

    print(f"Inserted Users: {User.query.all()}")

    # Insert data into `quiz_questions`
    question1 = QuizQuestion(question_text="What is Flask?", category="Framework")
    question2 = QuizQuestion(question_text="What is SQLAlchemy?", category="ORM")
    db.session.add_all([question1, question2])
    db.session.commit()

    print(f"Inserted Quiz Questions: {QuizQuestion.query.all()}")

    # Insert data into `user_responses`
    response1 = UserResponse(user_id=user1.id)
    response2 = UserResponse(user_id=user2.id)
    db.session.add_all([response1, response2])
    db.session.commit()

    print(f"Inserted User Responses: {UserResponse.query.all()}")

    # Insert data into `user_response_answers`
    answer1 = UserResponseAnswer(user_response_id=response1.id, question_id=question1.id, answer_value="Flask is a microframework")
    answer2 = UserResponseAnswer(user_response_id=response2.id, question_id=question2.id, answer_value="SQLAlchemy is an ORM")
    db.session.add_all([answer1, answer2])
    db.session.commit()

    print(f"Inserted User Response Answers: {UserResponseAnswer.query.all()}")
    print("------------------------------")


    # Insert data into `fields`
    field1 = Field(field_name="Web Development", field_description="All about web technologies")
    field2 = Field(field_name="Database Management", field_description="Focus on database design and optimization")
    db.session.add_all([field1, field2])
    db.session.commit()

    print(f"Inserted Fields: {Field.query.all()}")
    print("------------------------------")


    # Insert data into `recommendations`
    recommendation1 = Recommendation(user_response_id=response1.id, recommended_field_id=field1.id, compatibility_score=0.85)
    recommendation2 = Recommendation(user_response_id=response2.id, recommended_field_id=field2.id, compatibility_score=0.75)
    db.session.add_all([recommendation1, recommendation2])
    db.session.commit()

    print(f"Inserted Recommendations: {Recommendation.query.all()}")
    print("------------------------------")


    # --- Testing Relationships ---
    # Test User -> UserResponse
    print(f"Responses for User {user1.id}: {user1.responses}")
    print("------------------------------")


    # Test UserResponse -> User
    print(f"User for Response {response1.id}: {response1.user}")
    print("------------------------------")


    # Test UserResponse -> UserResponseAnswer
    print(f"Answers for Response {response1.id}: {response1.answers}")
    print("------------------------------")


    # Test UserResponseAnswer -> UserResponse and QuizQuestion
    print(f"Response for Answer {answer1.id}: {answer1.user_response}")
    print(f"Question for Answer {answer1.id}: {answer1.question}")
    print("------------------------------")


    # Test Field -> Recommendation
    print(f"Recommendations for Field {field1.id}: {field1.recommendations}")
    print("------------------------------")


    # Test Recommendation -> UserResponse and Field
    print(f"Response for Recommendation {recommendation1.id}: {recommendation1.user_response}")
    print(f"Field for Recommendation {recommendation1.id}: {recommendation1.recommended_field}")
    print("------------------------------")

