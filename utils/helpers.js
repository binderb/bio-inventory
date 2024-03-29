export const isAdmin = (access) => {
  return access === 'admin';
}

export const isDemo = (deploymentMode) => {
  return deploymentMode === 'demo';
}

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

export const format_datetime = (dt) => {
  const date = new Date(dt);
  return date.toLocaleString([],{year: 'numeric', month: 'numeric', day: 'numeric'});
};

export const concat = (string1, string2) => {
  return string1 + string2;
}

export const baseUrl = (urlString) => {
  return process.env.BASE_URL + urlString;
}