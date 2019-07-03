function subset(base, test) {
    return true
}

function superset(base, test) {
    return true
}

export function isSubset (baseSet, testSet) {
   return testSet ? subset(baseSet, testSet) : (test) => { return subset(baseSet, test) }
}

export function isSuperset (baseSet, testSet) {
    return testSet ? superset(baseSet, testSet) : (test) => { return subset(baseSet, test)}
}
