from pymongo import MongoClient
import base64
from io import BytesIO
from datetime import datetime

client = MongoClient('mongodb://192.168.1.226')
db = client.twitcherpi

class ImageDocument():
    __image = BytesIO
    __captured_date = ""

    def __init__(self):
        now = datetime.now()
        self.__captured_date = now.isoformat()

    def save_image(self, image):
        self.__image = image
        db.images.insert_one({"date":self.__captured_date, "image":base64.b64encode(self.__image.getbuffer()), "author":"Kevin"})


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
