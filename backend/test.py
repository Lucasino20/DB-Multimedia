from main import *

cwd = os.getcwd() # current working directory

 

def test():
    smt = some_class(14000, False)
    # smt.RANGE_SEARCH("Salma_Hayek.jpeg", 0.5)
    # print()
    #res, tiempo = smt.KNN_SEARCH("Salma_Hayek.jpeg", 8)
    #print(res)
    #print(tiempo)
    # smt.RANGE_SEARCH_RTREE("Salma_Hayek.jpeg", 1.21) # que radio usamos?
    #print()
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
    #print()
    #res, tiempo = smt.KDTREE("Salma_Hayek.jpeg", 8)
    #print(tiempo)
test()