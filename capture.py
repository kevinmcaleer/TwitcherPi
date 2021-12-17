# TwitcherPi Image Capture
# Kevin McAleer
# December 2021

# Import libraries
from picamera import PiCamera
from io import BytesIO
from pymongo import MongoClient
from datetime import datetime

client = MongoClient('mongodb://192.168.1.150/twitcherpi')
imagesdb = client.images
birdsdb = client.birds

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
    imagesdb.images.insert_ont({"date":date_string, "image":image}) 
    