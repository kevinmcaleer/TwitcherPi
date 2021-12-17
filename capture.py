# TwitcherPi Image Capture
# Kevin McAleer
# December 2021

# Import libraries
from picamera import PiCamera
from io import BytesIO
from dal import DATABASE, ImageDocument

from datetime import datetime


image_document = ImageDocument()

camera = PiCamera()
camera.resolution = (1024, 768)

def take_picture():
    # take a picture

    image = BytesIO()
    camera.capture(image,'jpeg')
    return image

def save_image(image):
    # Save an image to the mongo database

    image_document.save_image(image)


image_document.load_image()
