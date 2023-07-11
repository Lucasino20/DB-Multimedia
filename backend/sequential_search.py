import time
import os
import numpy
import face_recognition
from queue import PriorityQueue 

def knn_search(file_name, k, cwd, block_dictionary):
    pq = PriorityQueue(False)
    image_path = cwd + '/instance/uploads/' + file_name
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
            new_face_encoding = tuple(face_encoding)
            result = []
            info = []
            print("searching...")
            time1 = time.time()
            for path in block_dictionary:
                first = numpy.array(list(map(float, block_dictionary[path].strip("()").split(', '))))
                second = numpy.array(list(map(float, new_face_encoding[0])))
                distance = numpy.linalg.norm(first - second)
                person = path
                pq.put((round(distance,3), person))
                info.append((round(distance,3),person))
            for i in range(k):
                result.append(pq.get())
            time2 = time.time()
            tiempo = str(round((time2 - time1) * 1000))
            print("knn_search took " + tiempo + " ms.")
            print("displaying results:")
            return result, tiempo
