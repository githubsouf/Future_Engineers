from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from config import Config

db = SQLAlchemy()
ma = Marshmallow()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialisez les extensions Flask
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)

    # Importez les modèles pour les enregistrer
    with app.app_context():
        from app import models

    return app
