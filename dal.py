from pymongo import MongoClient
import base64
from io import BytesIO
from datetime import datetime

client = MongoClient('mongodb://192.168.1.226')
db = client.twitcherpi

class ImageDocument():
    __image = BytesIO
    __captured_date = ""
    __author = ""

    def __init__(self):
        now = datetime.now()
        self.__captured_date = now.isoformat()

    @property
    def author(self):
        return self.__author
    
    @author.setter
    def author(self, value):
        self.__author = value

    @property
    def capture_date(self):
        return self.__captured_date

    @capture_date.setter
    def capture_date(self, value):
        self.__captured_date = value

    def save_image(self, image):
        self.__image = image
        db.images.insert_one({"date":self.__captured_date, "image":base64.b64encode(self.__image.getbuffer()), "author":self.__author})


    def seed_database(self):
        """ Seeds the database with a default set of values """
        labels = ["sparrow","blackbird","robin","starling","wood pigeon","great tit","blue tit","crow"]

        for label in labels:
            db.labels.insert_one({"label":label})
    

    def get_labels(self):
        """ Return a list of labels """

        data = list(db.labels.find({},{"_id":False}))
        # data = db.labels.find()
        print("there be labels here!:", data)
        return data

    def get_one(self):
        """ Get one image file record """

        image_file = list(db.images.find())
        return image_file