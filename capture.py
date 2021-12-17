# TwitcherPi Image Capture
# Kevin McAleer
# December 2021

# Import libraries
from picamera import PiCamera
from io import BytesIO
from pymongo import MongoClient
from datetime import datetime
import base64

# Connect to Mongo database server, where the IP address is that of your MongoDB server (TwitcherPi is the name of the database)
# There are two collections - images and birds; images saves the raw captured image, birds stores details of detected and classified birds
client = MongoClient('mongodb://192.168.1.150/twitcherpi')
db = client.twitcherpi

camera = PiCamera()
camera.resolution = (1024, 768)

def take_picture():
    # take a picture

    image = BytesIO()
    camera.capture(image,'jpeg')
    return image

def save_image(image):
    # Save an image to the mongo database

    now = datetime.now()
    date_string = now.isoformat
    db.images.insert_one({"date":date_string, "image":base64.b64encode(image.getbuffer())}) 
    
