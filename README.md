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
  * [R-Tree Python](#R-Tree-Python)
  * [KD-Tree](#KD-Tree)
- [Implementaciones](#Implementaciones)
  * [KNN Search](#KNN-Search)
- [Análisis de la maldición de la dimensionalidad](#Análisis-de-la-maldición-de-la-dimensionalidad)
- [Experimentación](#Experimentación)
  * [Gráficos de los resultados](#Gráficos-de-los-resultados)
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

### R-Tree Python

La biblioteca RTree en Python proporciona una serie de funciones avanzadas de indexación espacial, que incluyen búsqueda de vecino más cercano, búsqueda de intersección, índices multidimensionales, índices agrupados, carga masiva, eliminación, serialización de disco e implementación de almacenamiento personalizado.

RTree es un índice espacial basado en árboles que utiliza una partición recursiva del espacio para almacenar datos espaciales. El árbol se divide en una jerarquía de nodos, cada uno de los cuales almacena un cuadro delimitador que representa la extensión espacial de los datos que contiene. Los nodos se organizan de manera que se garantice que los cuadros delimitadores de dos nodos cualesquiera que sean adyacentes en el árbol no se superpongan.

### KD-Tree 

KD-Tree es una técnica de indexación popular para datos espaciales porque se pueden usar para responder de manera eficiente a una variedad de consultas espaciales, como la búsqueda del vecino más cercano, la búsqueda de rango y las consultas de conectividad.

La técnica de indexación de un KD-Tree es la siguiente:

- Los puntos en el conjunto de datos se ordenan primero a lo largo de una sola dimensión.
- Luego, los puntos ordenados se dividen recursivamente en dos mitades a lo largo de la misma dimensión.
- El proceso se repite para cada una de las dimensiones restantes.
- El árbol resultante es un KD-Tree .


## Implementaciones

### KNN Search

- Se crea una `PriorityQueue` con orden descendente para almacenar los vecinos más cercanos en función de la distancia.
- Se carga la imagen de la cara utilizando `face_recognition.load_image_file` y se calcula su codificación de reconocimiento facial utilizando `face_recognition.face_encodings`.
- Si se encuentra al menos una cara en la imagen, se guarda su codificación en new_face_encoding.
- Se itera sobre el diccionario de bloques `block_dictionary` que contiene las codificaciones de las caras almacenadas previamente.
- Para cada bloque, se convierte su codificación de cadena a un array numpy `first` y se calcula la distancia entre la nueva codificación de la cara `second` y el bloque utilizando la norma euclidiana `numpy.linalg.norm`.
- Después de calcular las distancias para todos los bloques, se obtienen los k vecinos más cercanos de la cola de prioridad y se almacenan en `result`.

## Análisis de la maldición de la dimensionalidad

Estas son algunas de las formas en que la maldición de la dimensionalidad puede afectar el rendimiento de las técnicas de indexación espacial:

- El volumen del conjunto de datos aumenta exponencialmente con el número de dimensiones, lo que dificulta el almacenamiento y el procesamiento de los datos.
- La selectividad de las consultas espaciales disminuye a medida que aumenta la dimensionalidad, lo que significa que es necesario escanear más datos para responder una consulta.

El artículo "An Index Structure for High-Dimensional Data" de Berchtold, Keim y Kriegel analiza cómo la maldición de la dimensionalidad puede afectar el rendimiento de las técnicas de indexación espacial. Proponen una nueva estructura de índice llamada X-tree, que está diseñada para abordar los desafíos que plantean los datos de alta dimensión.

<img height="300" src= X-tree.JPG>

Se ha demostrado que el árbol X es eficaz para abordar los desafíos que plantean los datos de alta dimensión. En sus experimentos, Berchtold, Keim y Kriegel demostraron que el árbol X supera a otras técnicas de indexación espacial en conjuntos de datos de alta dimensión.


## Experimentación

Para la experimentación se uso la imagen de Cillian Murphy : 

<img height="300" src= Cillian_Murphy.webp>

Para un k = 8 , se experimento con datasets de tamaño n ( 100 , 200 , 400 , 800 , 1600 , 3200 , 6400 , 12800).

### Gráficos de los resultados

<img height="400" src= grafico.png>


### Análisis y discusión

Se puede observar en la grafica :

- KNN-Secuencial es de fácil implementación ,pero puede ser lento en un conjunto de datos grande.
- KNN-RTree tendrá un tiempo de ejecución un poco más alto que  KNN-HighD . Eficiente en conjuntos de datos con alta dimensionalidad. Requiere más espacio de almacenamiento que el KNN secuencial.
