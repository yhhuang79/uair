#!/usr/bin/python

import sys
import tensorflow as tf
import pandas as pd
import numpy as np

# global variables

f_col = ['AccelerometerX','AccelerometerY','AccelerometerZ','GravityX', u'GravityY', u'GravityZ', u'GyroscopeX',
       u'GyroscopeY', u'GyroscopeZ','LinearAccelerationX', u'LinearAccelerationY', u'LinearAccelerationZ',
       u'MagneticFieldX', u'MagneticFieldY', u'MagneticFieldZ',
       'RotationVectorAccuracy',
       u'RotationVectorXsin', u'RotationVectorYsin', u'RotationVectorZsin',
       u'RotationVectorcos']
kp = 0.9
actvfunc = tf.nn.sigmoid
learning_rate = 0.01
num_record = 1000
num_group = 40
window_size = 100
threshold = 0.00001
num_input = 780

# functions

def add_layer(inputs, in_size, out_size, n_layer, activation_function=None):
    # add one more layer and return the output of this layer
    layer_name = 'layer%s' % n_layer
    with tf.name_scope(layer_name):
        with tf.name_scope('weights'):
            Weights = tf.Variable(tf.random_normal([in_size, out_size]), name='W')
            tf.histogram_summary(layer_name + '/weights', Weights)
            
        with tf.name_scope('biases'):
            biases = tf.Variable(tf.zeros([1, out_size]) + 0.1, name='b')
            tf.histogram_summary(layer_name + '/biases', biases)
        
        with tf.name_scope('Wx_plus_b'):
            Wx_plus_b = tf.add(tf.matmul(inputs, Weights), biases)
            # here to dropout
            #Wx_plus_b = tf.nn.dropout(Wx_plus_b, keep_prob)
        if activation_function is None:
            outputs = Wx_plus_b
        else:
            outputs = activation_function(Wx_plus_b, )
        tf.histogram_summary(layer_name + '/outputs', outputs)
        return outputs

    
# get 10 time shift delta
def get_delta_data(df, f_col):
    return df[10:][f_col].subtract(df.shift(10)[10:][f_col], fill_value=0)

#input: gloal_df, feature, k-group
#output: f_global_min, f_global_max, f_global_range

def make_global_max_min_range(global_df, f, k):
    return global_df[[f]].min().values, global_df[[f]].max().values, ((global_df[[f]].max().values-global_df[[f]].min().values)/k)

#input: df, feature, f_global_min, f_global_max, f_global_range
#output: count_array
def group_count(df, f, f_global_min, f_global_max, f_global_range):
    if(f_global_min == f_global_max):
        op_array = [0]*39
    else:    
        op_array = df[f].groupby(pd.cut(df[f], np.arange(f_global_min, f_global_max, f_global_range))).count().values
    
    return op_array

#input: global_df, df, f_col,  k-group
#output: features array
def make_record_array(global_df, df, f_col,  k ):
    total_f_ary = []
    for i in f_col:
        f_global_min, f_global_max, f_global_range = make_global_max_min_range(global_df, i, k)
        f_ary = group_count(df, i, f_global_min, f_global_max, f_global_range)
        #print(len(f_ary))
        total_f_ary = np.append(total_f_ary,f_ary)
    return total_f_ary

def convert_data_to_model_df(df,f_col, k):
    op_df = pd.DataFrame()
    op_df['op'] = make_record_array(df,df,f_col,k)
    return op_df.T

# tensorflow graph

# define placeholder for inputs to network
with tf.name_scope('inputs'):
    #keep_prob = tf.placeholder(tf.float32)
    xs = tf.placeholder('float', [None, num_input], name='x_input')
    ys = tf.placeholder('float', [None, 3], name='y_input')


num_nural_1 = int((num_input + 1) **0.5//1)
num_nural_2 = num_nural_1
l1 = add_layer(xs, num_input, num_nural_1, n_layer=1, activation_function=actvfunc)
#l2 = add_layer(l1, num_nural_1, num_nural_2, n_layer=2, activation_function=actvfunc)

prediction = add_layer(l1, num_nural_1, 3, n_layer=2, activation_function=tf.nn.softmax)

with tf.name_scope('loss'):
    loss = tf.reduce_mean(-tf.reduce_sum(ys * tf.log(prediction),
                                              reduction_indices=[1]))
    #tf.reduce_mean(tf.reduce_sum(tf.square(ys - prediction),
           #                             reduction_indices=[1]))**0.5
    tf.scalar_summary('loss', loss)

with tf.name_scope('train'):
    train_step = tf.train.MomentumOptimizer(0.07,0.99).minimize(loss)


    
# data path
data_path = sys.argv[1]

df = pd.read_json(data_path)
df = df.drop_duplicates().sort(['imei','Time']).convert_objects(convert_numeric=True)

data_array = convert_data_to_model_df(df[f_col], f_col, num_group)

# restore model
saver = tf.train.Saver()#tf.train.import_meta_graph("mymodel.meta")
sess = tf.Session()
saver.restore(sess, "/var/nginx/uair/api/predictModule/mymodel")

prediction = sess.run(prediction, feed_dict={xs: data_array})

if (np.argmax(prediction,1) == [0]):
    print 'light'
elif (np.argmax(prediction,1) == [1]):
    print 'mid'
elif (np.argmax(prediction,1) == [2]):
    print 'heavy'
