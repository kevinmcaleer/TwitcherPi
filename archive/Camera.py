# Grab a video feed from the camera and pass to the classifer
# TwitcherPi - AI Bird Counter
# By Kevin McAleer
# January 2019

from picamera import PiCamera
from time import sleep
import datetime

camera = PiCamera()

# camera.start_preview()
# sleep(10)
# camera.stop_preview()


def take_photo():
    # Get the current date and time and make a unique filename

    # camera.image_effect = 'saturation'
    camera.start_preview()
    now = datetime.datetime
    print(now)
    filename = "{0:%Y}-{0:%m}-{0:%d}".format(now)
    # filename = '/home/pi/Desktop/image.jpg'
    camera.capture(filename)
    camera.stop_preview()

# Main loop


while True:
    camera.start_preview()
    take_photo()
    sleep(10)
    camera.stop_preview()
