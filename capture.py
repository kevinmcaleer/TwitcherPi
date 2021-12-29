# TwitcherPi Image Capture
# Kevin McAleer
# December 2021

# Import Libraries
from io import BytesIO
from picamera import PiCamera
from dal import ImageDocument
from datetime import datetime
from PIL import Image

image_document = ImageDocument()

camera = PiCamera()
camera.resolution = (1024, 768)

def take_picture():
    #  Take a picture

    image = BytesIO()
    camera.capture(image, 'jpeg')
    
    return image

def save_image(image):
    #  Save an image to the Database

    image_document.capture_date = str(datetime.now().isoformat())
    image_document.author = "Kevin McAleer"
    image_document.save_image(image)

img = take_picture()

save_image(img)
image = Image.open("test.jpg")
byte_io = BytesIO()
image.save(byte_io, 'jpeg')
