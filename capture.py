# TwitcherPi Image Capture
# Kevin McAleer
# December 2021

# Import Libraries
from io import BytesIO
from picamera import PiCamera
from dal import ImageDocument

image_document = ImageDocument()

camera = PiCamera()
camera.resolution = (1024, 768)

def take_picture():
    #  Take a picture

    image = BytesIO()
    camera.capture(image, 'jpeg')
    return image

def save_image(image):
    #  Save an inage to the Database

    image_document.save_image(image)

 
img = take_picture()

save_image(img)