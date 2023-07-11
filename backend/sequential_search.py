import time
import os
import numpy
import face_recognition
from queue import PriorityQueue 

def range_search(file_name, radius, cwd, block_dictionary):
    #image_path = cwd + '/test_images/' + file_name
    image_path = cwd + '/instance/uploads/' + file_name
    radius = 0.5
    if not os.path.exists(image_path):
        print("No path")
        return []
    else:
        face = face_recognition.load_image_file(image_path)
        face_encoding = face_recognition.face_encodings(face) # calculating the image encoding
        if len(face_encoding) == 0:
            print("no face founnd")
            return []
        else:
            new_face_encoding = tuple(face_encoding)
            result = []
            #gather info
            info = []
            print("searching...")
            time1 = time.time()
            # for i in range(total):
            for path in block_dictionary:
                first = numpy.array(list(map(float, block_dictionary[path].strip("()").split(', '))))
                second = numpy.array(list(map(float, new_face_encoding[0])))
                distance = numpy.linalg.norm(first - second)
                if distance < radius:
                    result.append((path, distance))
                    person = path
                    info.append((person, round(distance,3)))
            time2 = time.time()
            print("reange_search took " + str(round((time2 - time1) * 1000)) + " ms.")
            print("displaying results:")
            return info

def knn_search(file_name, k, cwd, block_dictionary):
    pq = PriorityQueue(False)
    #image_path = cwd + '/test_images/' + file_name
    image_path = cwd + '/instance/uploads/' + file_name
    if not os.path.exists(image_path):
        print("No path")
        return []
    else:
        face = face_recognition.load_image_file(image_path)
        face_encoding = face_recognition.face_encodings(face) # calculating the image encoding
        if len(face_encoding) == 0:
            print("no face found")
            return []
        else:
            new_face_encoding = tuple(face_encoding)
            result = []
            #gather info
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
