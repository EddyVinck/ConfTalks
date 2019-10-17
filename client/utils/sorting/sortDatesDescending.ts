const sortDatesDescending = (obj, key: string) => {
  let temp = obj;
  try {
    temp.sort((a, b) => {
      const aDate = new Date(a[key]);
      const bDate = new Date(b[key]);
      return bDate.getTime() - aDate.getTime();
    });
  } catch (error) {
    console.error(`could not sort by key \`${key}\``);
    return obj;
  }
  return temp;
};

export { sortDatesDescending };
