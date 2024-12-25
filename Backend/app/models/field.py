from datetime import datetime
from app import db, ma

class Field(db.Model):
    __tablename__ = 'fields'

    id = db.Column(db.Integer, primary_key=True)
    field_name = db.Column(db.String(100), unique=True, nullable=False)
    field_description = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    recommendations = db.relationship('Recommendation', back_populates='recommended_field')

    def __init__(self, field_name, field_description=None):
        self.field_name = field_name
        self.field_description = field_description

    def __repr__(self):
        return f"<Field(id={self.id}, field_name={self.field_name}, field_description={self.field_description}, created_at={self.created_at})>"


class FieldSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        fields = ['id', 'field_name', 'field_description', 'created_at']

field_schema = FieldSchema()
fields_schema = FieldSchema(many=True)
