from main import *

cwd = os.getcwd() 

 

def test():
    smt = some_class(14000, False)

    res, tiempo = smt.KNN_SEARCH_RTREE("Salma_Hayek.jpeg", 8)
    print(res)
    print(tiempo)
    print()
    res, tiempo = smt.KNN_SEARCH_RTREE("aaron_eckhart.jpeg", 8)
    print(res)
    print(tiempo)
    print()
    res, tiempo = smt.KNN_SEARCH_RTREE("abel_aguilar.jpeg", 8)
    print(res)
    print(tiempo)
    print()
    res, tiempo = smt.KNN_SEARCH_RTREE("el_bicho.jpeg", 8)
    print(res)
    print(tiempo)
    print()
    res, tiempo = smt.KNN_SEARCH_RTREE("tom_cruise.jpeg", 8)
    print(res)
    print(tiempo)


test()