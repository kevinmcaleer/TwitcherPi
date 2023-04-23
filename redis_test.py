import redis

redis_client = redis.Redis(host='192.168.1.102', port=6379)

# # Set a hash value
# redis_client.hset('myhash', 'key1', 'value1')

# Get a hash value by key
value = redis_client.hget('myhash', 'key1')

# Get all hash values
all_values = redis_client.hgetall('myhash')

print(f'all_values {all_values}, value {value}')