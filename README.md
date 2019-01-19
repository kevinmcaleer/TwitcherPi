# TwitcherPi
An Opensource AI bird classification system based on Tensorflow,
Raspberry Pi Zero.

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

# Setting up the python environment with Tensorflow

sudo apt-get update
sudo apt install python3-dev python3-pip
sudo apt install libatlas-base-dev
sudo pip3 install -U virtualenv

virtualenv --system-site-packages -p python3 ./venv

source ./venv/bin/activate

pip install --upgrade pip
pip list
pip install --upgrade tensorflow

# Verify the install

python -c "import tensorflow as tf; tf.enable_eager_execution(); print(tf.reduce_sum(tf.random_normal([1000, 1000])))"

pip install pillow
pip install lxml
pip install jupyter
pip install matplotlib

git clone https://github.com/tensorflow/models.git

# Download protobuf from the website:
https://github.com/protocolbuffers/protobuf/releases


protoc object_detection/protos/*.proto --python_out=.
export PYTHONPATH=$PYTHONPATH:`pwd`:`pwd`/slim
