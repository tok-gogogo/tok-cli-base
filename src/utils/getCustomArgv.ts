function getCustomArgv(list = process.argv) {
  const res = {};

  list.forEach((item) => {
    if (item.startsWith('custom.')) {
      const str = item.replace('custom.', '');
      const strList = str.split('=');
      res[strList[0]] = strList[1];
    }
  });

  return res;
}

export default getCustomArgv;
