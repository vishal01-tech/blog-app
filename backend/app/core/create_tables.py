import sys
import os

# Add root directory to sys.path so Python can resolve absolute imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from app.core.database import Base, engine
from app.models import users, posts 

def create_all_tables():
    print("Creating tables in the database...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")

if __name__ == '__main__':
    create_all_tables()
