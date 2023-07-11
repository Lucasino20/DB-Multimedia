import face_recognition
import numpy
import random
import linecache as lc
import io
import shutil
import os
import json

N = 5000
BLOCK_SIZE = 1000
cwd = os.getcwd() 
processed_images_path = cwd + "/processed_dataset"
filename = "processed_images.json"
path_to_clean_1 = processed_images_path


def process_dataset(limit):

    total = 0 
    if not os.path.exists(processed_images_path):
        os.makedirs(processed_images_path)
    FACTOR = 1
    counter = 0
    block_dictionary = {}
    encodings = {}
    dataset_directory_path = cwd + "/dataset" 
    dataset_subdirectories_list = os.listdir(dataset_directory_path) 
    for subdirectory in dataset_subdirectories_list: 
        if(total >= limit):
            load_to_memory(block_dictionary)
            return total, encodings

        subdirectory_path = dataset_directory_path + "/" + subdirectory
        for image in os.listdir(subdirectory_path): 
            if(total >= limit):
                load_to_memory(block_dictionary)
                return total, encodings

            image_path = subdirectory_path + "/" + image
            key = subdirectory + '/' + image
            face = face_recognition.load_image_file(image_path)
            face_encoding = face_recognition.face_encodings(face) 
            
            if len(face_encoding) != 0:
                new_face_encoding = tuple(face_encoding[0])
                if new_face_encoding not in block_dictionary:
                    block_dictionary[key] = str(new_face_encoding)
                    encodings[key] = str(new_face_encoding)
                    total += 1
                    print(counter)
                    counter += 1
                    if counter > BLOCK_SIZE*FACTOR:
                        print("counter")
                        FACTOR += 1
                        load_to_memory(block_dictionary)
                else:
                    block_dictionary[key] += str(new_face_encoding)
                    encodings[key] = str(new_face_encoding)
                    total += 1
                    print(counter)
                    counter += 1
                    if counter > BLOCK_SIZE*FACTOR:
                        print("counter")
                        FACTOR += 1
                        load_to_memory(block_dictionary)
                
            else: 
                print("no face found in: " + str(image_path))
    load_to_memory(block_dictionary)
    return total, encodings


def load_to_memory(block_dictionary):
    try:
        path = processed_images_path + '/' + filename
        with open(path, 'a', encoding="utf-8") as file: 
            print("data is: [face_image_path] -> face encoding")
            print("loading data into new directory file...")
            for keyword in block_dictionary:
                file.write(json.dumps({keyword: block_dictionary[keyword]}, ensure_ascii=False))
                file.write("\n")
            file.close()
            print("data successfully uploaded!")
        block_dictionary.clear()
        return 1
    except IOError:
        print("Problem reading: " + str(path) + " path.")
        return 0


def genDist(N, distribution):
    result = []
    
    for i in range(1, N):
        aux = () 
        aux = random.sample(range(0, len(distribution)), 2)
        first = numpy.array(distribution[aux[0]])
        second = numpy.array(distribution[aux[1]])
        result.append(numpy.linalg.norm(first - second))
    return result


def clear_processed_processes_directory():
    if os.path.exists(path_to_clean_1):
        shutil.rmtree(path_to_clean_1)
    else:
        print("files not found")

def load_block_dictionary(block_dictionary, total):
    for i in range(1, total):
        PATH = cwd + "/processed_dataset/processed_images.json"
        try:
            aux = lc.getline(PATH, i).rstrip()
            if aux != "":
                json_object = json.load(io.StringIO(aux))
                key = list(json_object.keys())
                value = tuple(json_object.values())
                block_dictionary[key[0]] = value[0]
        except:
            print("There are no processed images")
            return 0
    return block_dictionary


