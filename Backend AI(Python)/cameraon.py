import cv2 as cv
cap = cv.VideoCapture(0)
if not cap.isOpened():
    cap = cv.VideoCapture(0)
if not cap.isOpened():
    raise IOError("Can't open the video")
while True:
  ret, frame = cap.read()
#     

  cv.imshow("Obj detection", frame)
  if(cv.waitKey(2) & 0xff == ord('q')):
      break
cap.release()
cv.destroyAllWindows()