export const count = (array) => {
  return array.length;
}

export const inc = (value) => {
  return value+1;
}

export const isFirst = (value) => {
  return value == 0;
}

export const equals = (value1, value2) => {
  return value1 == value2;
}

export const percentage = (value) => {
  return `${parseFloat(value)*100}%`;
}