# Base de Datos Multimedia - BD2

Proyecto de Base de Datos 2 : Base de Datos Multimedia

## Integrantes:
    - Canto Vidal, Harold Alexis
    - Gutierrez Soto, Brhandon Luis
    - Rincón Espinoza, Alberto Domenic


# Tabla de contenido
- [Objetivo](#Objetivo)
- [Cuadro de Actividades](#Cuadro-de-Actividades)
- [Librerías utilizadas](#Librerías-utilizadas)
  * [Face Recognition](#Face-Recognition)
- [Implementaciones](#Implementaciones)
  * [KNN Search](#KNN-Search)
  * [Range Search](#Range-Search)
- [Análisis de la maldición de la dimensionalidad y como mitigarlo](#Análisis-de-la-maldición-de-la-dimensionalidad-y-como-mitigarlo)
- [Experimentación](#Experimentación)
  * [Tablas y gráficos de los resultados](#Tablas-y-gráficos-de-los-resultados)
  * [Análisis y discusión](#Análisis-y-discusión)

## Objetivo
  Entender y aplicar los algoritmos de búsqueda y recuperación de la información basado en el contenido.
  
  Este proyecto está enfocado al uso una estructura multidimensional para dar soporte a las búsqueda y
  recuperación eficiente de imágenes en un servicio web de reconocimiento facial.

## Cuadro de Actividades

En la seccion de Projects

## Librerías utilizadas

### Face-Recognition

La libreria "face_recognition" es una herramienta de procesamiento de imágenes que se utiliza para reconocer y analizar caras en
fotografías y videos. Su característica principal es la extracción de vectores característicos.

Un vector característico es una representación numérica de una cara que captura características únicas y distintivas de esa persona.
La librería utiliza algoritmos de aprendizaje automático para calcular estos vectores a partir de imágenes faciales. Estos vectores 
son esencialmente puntos en un espacio multidimensional que representan las características faciales, como la forma de los ojos, la 
nariz y la boca.

## Implementaciones

### KNN Search

- Se crea una **´PriorityQueue´** con orden descendente para almacenar los vecinos más cercanos en función de la distancia.
- Se carga la imagen de la cara utilizando **face_recognition.load_image_file** y se calcula su codificación de reconocimiento facial utilizando **face_recognition.face_encodings**.
- Si se encuentra al menos una cara en la imagen, se guarda su codificación en new_face_encoding.
- Se itera sobre el diccionario de bloques (block_dictionary) que contiene las codificaciones de las caras almacenadas previamente.
- Para cada bloque, se convierte su codificación de cadena a un array numpy (first) y se calcula la distancia entre la nueva codificación de la cara (second) y el bloque utilizando la norma euclidiana (numpy.linalg.norm).
- Después de calcular las distancias para todos los bloques, se obtienen los k vecinos más cercanos de la cola de prioridad y se almacenan en result.

### Range Search

## Análisis de la maldición de la dimensionalidad y como mitigarlo


## Experimentación

### Tablas y gráficos de los resultados

### Análisis y discusión
