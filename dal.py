from pymongo import MongoClient
import base64
from io import BytesIO
from datetime import datetime

# Connect to Mongo database server, where the IP address is that of your MongoDB server (TwitcherPi is the name of the database)
# There are two collections - images and birds; images saves the raw captured image, birds stores details of detected and classified birds
client = MongoClient('mongodb://192.168.1.150/twitcherpi')
db = client.twitcherpi

class ImageDocument():
    """ Hides complexities of connecting to databases etc """
    
    __captured_date = ""
    __processed = False
    __image = BytesIO()

    def __init__(self):
        now = datetime.now()
        self.__captured_date = now.isoformat

    @property
    def captured_date(self)->str:
        """ Returns the date captured of the image """
        return self.__captured_date

    @captured_date.setter
    def captured_date(self, value:str):
        """ Sets the image capture date """
        self.__captured_date = value

    def save_image(self, image):
        """ Save the image to the database """
        self.__image = image
        db.images.insert_one({"date":self.date_string, "image":base64.b64encode(image.getbuffer())}) 

    @property
    def image(self):
        """ Returns the image """
        return self.__image

    @image.setter
    def image(self, value:BytesIO):
        """ Sets the image file """
        self.__image = value

    @property
    def processed(self)->bool:
        """ Returns the current status of the image; if its processed or not """
        return self.__processed

    @processed.setter
    def processed(self, value:bool):
        """ Sets the current processed status """
        self.__processed = value

    def load_image(self):
        image_record = db.images.find()
        image = image_record['image']
        print(image)