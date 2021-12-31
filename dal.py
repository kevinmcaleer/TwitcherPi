from pymongo import MongoClient
import base64
from io import BytesIO
from datetime import datetime
from bson import ObjectId, BSON

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

    def save_image(self, image:BytesIO):
        self.__image = image.getbuffer().nbytes
        img = BSON()
        img.encode(self.__image)
        # db.images.insert_one({"date":self.__captured_date, "image":base64.b64encode(self.__image.getbuffer()), "author":self.__author})
        db.images.insert_one({"date":self.__captured_date, "image":img, "author":self.__author})


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

    def get_by_id(self, id):
        """ Get image by ID """
        print("id is:", id)
        print("id type is:", type(id))
        objInstance = ObjectId(id)
        image_file = db.images.find_one({"_id": objInstance})
        img = BSON(image_file['image']).decode()
        
        return img

    def get_ids(self):
        id_list = [str(id) for id in db.images.find().distinct('_id')]
        return id_list