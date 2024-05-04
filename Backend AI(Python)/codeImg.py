import cv2 as cv
import matplotlib.pyplot as plt
from io import BytesIO
import io
from PIL import Image
import numpy as np
from flask import Flask, request
from flask_cors import CORS
from flask import send_file

config_file = "ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt"
frozen_model = "frozen_inference_graph.pb"
model = cv.dnn_DetectionModel(frozen_model, config_file)
classLabels = []
fileName = "labels.txt"
with open(fileName, 'rt') as fpt:
    classLabels = fpt.read().rstrip('\n').split('\n')
# print(classLabels)


# url = 'https://cdn.pixabay.com/photo/2024/01/08/07/22/ai-generated-8494819_1280.jpg'
# url = 'https://images.livemint.com/rf/Image-920x613/LiveMint/Period2/2017/06/29/Photos/Processed/trafficsignal-k0gG--621x414@LiveMint.jpg'
# url = 'https://m.media-amazon.com/images/I/71AyxR0yeeL._AC_UF894,1000_QL80_.jpg'

# response = requests.get(url)
# img = Image.open(BytesIO(response.content))

# img_array = np.array(img)
# print(len(img_array[1]))

# plt.imshow(img_array)
# plt.show()


model.setInputSize(320, 320)
model.setInputScale(1.0/127.5)
model.setInputMean((127.5,127.5,127.5))
model.setInputSwapRB(True)


app  =Flask(__name__)
CORS(app)

# app.config["IMAGE_UPLOADS"]
@app.route("/aiimg", methods =['GET', 'POST'])

def aiimg():
    if(request.method == 'POST'):
        # print("Post request")
        if(request.files):
            print("File request", request.files)
            file = request.files['myfile']
            img_temp = Image.open(file)
            img_array2 = np.array(img_temp)

            classIndex, confidence, bbox = model.detect(img_array2, confThreshold = 0.5)
            print("Classes received",classIndex)

            font_scale = 3
            font = cv.FONT_HERSHEY_PLAIN
            for classind, conf, boxes in zip(classIndex.flatten(), confidence.flatten(), bbox):
                cv.rectangle(img_array2, boxes, (255, 0, 0), 2)
                cv.putText(img_array2, classLabels[classind-1], (boxes[0]+10, boxes[1]+40), font, fontScale = font_scale, color = (0,255,0), thickness = 3 )

            img2 = Image.fromarray(img_array2, 'RGB')
            img2.show()
            img_buffer = io.BytesIO()
            img2.save(img_buffer, format='JPEG')
            img_buffer.seek(0)

    return send_file(img_buffer, mimetype='image/jpeg', as_attachment=True, download_name='your_image.jpg')


if __name__ == "__main__":
    app.run(debug=True)