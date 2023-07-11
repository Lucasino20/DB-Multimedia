import face_recognition
import numpy
import time
import os

def knn_search_rtree(file_name, K, cwd, indexed_dictionary,idx):
      image_path = cwd + '/test_images/' + file_name
      if not os.path.exists(image_path):
            print("No path")
            return []
      else:
        face = face_recognition.load_image_file(image_path)
        face_encoding = face_recognition.face_encodings(face) 
        if len(face_encoding) == 0:
            print("no face found")
            return []
        else:
          new_face_encoding = tuple(face_encoding[0])
          result=[]
          print("searching...")
          start=time.time()
          KNNvalue = list(idx.nearest(coordinates=new_face_encoding, num_results=K))
          end=time.time()     
          counter = 1
          for idx in KNNvalue:
            item = indexed_dictionary[idx]
            path = item[0]
            first = numpy.array(item[1])
            second = numpy.array(new_face_encoding[0])
            distance = numpy.linalg.norm(first - second)
            result.append((round(distance, 3), path))
            if counter > K:
              break
            counter += 1
          tiempo = str(round((end-start)*1000))
          print("knn search rtree search took " + tiempo + " ms.")
          print("displaying results:")
          return result, tiempo
