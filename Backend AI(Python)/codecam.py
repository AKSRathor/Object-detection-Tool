import cv2 as cv
import matplotlib.pyplot as pyplot
from PIL import Image
import numpy as np

config_file = "ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt"
frozen_model = "frozen_inference_graph.pb"
model = cv.dnn_DetectionModel(frozen_model, config_file)
classLabels = []
fileName = "labels.txt"
with open(fileName, 'rt') as fpt:
    classLabels = fpt.read().rstrip('\n').split('\n')
# print(classLabels)




model.setInputSize(320, 320)
model.setInputScale(1.0/127.5)
model.setInputMean((127.5,127.5,127.5))
model.setInputSwapRB(True)
# cap = cv.VideoCapture('media_files/traffic video.webm')
cap = cv.VideoCapture(0)
if not cap.isOpened():
    cap = cv.VideoCapture(0)
if not cap.isOpened():
    raise IOError("Can't open the video")

font_scale = 3
font = cv.FONT_HERSHEY_PLAIN

while True:
    ret, frame = cap.read()
    classIndex, confidence, bbox = model.detect(frame, confThreshold = 0.5)
    print(classIndex)

    if(len(classIndex)!=0):
        for classind, conf, boxes in zip(classIndex.flatten(), confidence.flatten(), bbox):
            if(classind<=80):
                cv.rectangle(frame, boxes, (255, 0, 0), 2)
                cv.putText(frame, classLabels[classind - 1], (boxes[0]+10, boxes[1]+40), font, fontScale = font_scale, color=(0,255,0), thickness=3)
    cv.imshow("Obj detection", frame)
    if(cv.waitKey(2) & 0xff == ord('q')):
        break
cap.release()
cv.destroyAllWindows()

