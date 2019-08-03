from network import Network
import sys, json, os, math
import numpy as np

def getNetwork():
    n = Network([28*28, 16, 10])
    path = os.path.abspath('network_scripts/network-prod2.npy')
    arc = Network.load(path)
    n.weights = arc[0]
    n.biases = arc[1]
    return n

def scaleData(data):
    scaledData = [int(data[i] / 255) for i in range(len(data))]
    return scaledData

def makeSimple(data):
    simpleData = []
    for i in range(len(data)):
        simpleData.append(data[i][0])
    return simpleData

def formatGuess(result_vector):
    percentages = []
    for index in range(len(result_vector)):
        p = result_vector[index]
        percentages.append(round(p[0] * 100, 2))
    return percentages

def whitePadding(origData):
    width = 28
    height = 28
    padding = 4
    paddedData = [0 for i in range(width * height)]
    for j in range(len(origData)):
        x = j % 20
        y = int(j / 20)
        paddedX = x + 4
        paddedY = y + 4
        realIndex = paddedY * width + paddedX
        paddedData[realIndex] = origData[j]
    return paddedData

def main():
    inData = sys.argv[1];
    parsedData = json.loads(inData)
    # parsedData = [255 for i in range(400)]
    scaledData = scaleData(parsedData)
    realData = whitePadding(scaledData)
    # test = np.array(realData).reshape(28, 28);
    # print(test)
    imgData = np.array([realData]).reshape(28 * 28, 1)
    net = getNetwork()
    guess = net.feed_forward(imgData)[0][-1]
    fg = formatGuess(guess)
    print(json.dumps(fg))
    sys.stdout.flush()
main()
