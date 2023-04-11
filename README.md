# TwitcherPi

`TwitcherPi` is an opensource AI bird classification system based on Tensorflow, intended to run on a Raspberry Pi Zero. The Rapsberry Pi will take pictures every x minutes (or will enable one to be taken based on a trigger from a motion sensor).

## Machine Learning model

The images will be stored in a Redis database, for later classification.
You can visit the RaspberryPi Zero hosted TwicherPi website and classify the pictures waiting to be processed using the web user interface. The interface will enable you to draw a rectangle over the image if there are any birds present, and then classify them.

Once there are enough tagged images in the database, the model will be able to be updated so it can automatically detect each bird and record when it was seen and what type of bird it is.

---

## Types of bird

The following types (classes) of bird can be detected:

1. House Sparrow
1. Starling
1. Blue tit
1. Blackbird
1. Woodpigeon
1. Goldfinch
1. Great tit
1. Robin
1. Long-tailed tit
1. Chaffinch

Note - you can add to this using the web UI.

---

## Setting up the python environment with Tensorflow

sudo apt-get update
sudo apt install python3-dev python3-pip
sudo apt install libatlas-base-dev
sudo pip3 install -U virtualenv

virtualenv --system-site-packages -p python3 ./venv

source ./venv/bin/activate

pip install --upgrade pip
pip list
pip install --upgrade tensorflow

---

## Verify the install

`python -c "import tensorflow as tf; tf.enable_eager_execution(); print(tf.reduce_sum(tf.random_normal([1000, 1000])))"`

```bash
pip install pillow
pip install lxml
pip install jupyter
pip install matplotlib

git clone https://github.com/tensorflow/models.git
```

---

## Download protobuf from the website:

<https://github.com/protocolbuffers/protobuf/releases>

protoc object_detection/protos/*.proto --python_out=.
export PYTHONPATH=$PYTHONPATH:`pwd`:`pwd`/slim
