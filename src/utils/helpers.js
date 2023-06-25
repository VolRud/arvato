export const getMaxValueOfPropInArray = (array, property) => {
    return array.reduce((max, current) => {
        return current[property] > max ? current[property] : max;
    }, -Infinity);
}

export const getMinValueOfPropInArray = (array, property) => {
    return array.reduce((min, current) => {
        return current[property] < min ? current[property] : min;
    }, Infinity);
}

export const updateObjectArray = (obj, array) => {
    const foundIndex = array.findIndex(item => item.id === obj.id);

    if (foundIndex !== -1) {
      array[foundIndex].amount += 1;
    } else {
      array.push(obj);
    }
    return array;
  }
  