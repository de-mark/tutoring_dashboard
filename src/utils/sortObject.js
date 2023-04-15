const sortObjects = (dict) => {
    let keys = Object.keys(dict).sort((a, b) => {
      let aDate = new Date(a), bDate = new Date(b);
      
      if (aDate < bDate) {
        return -1;
      } else if (aDate > bDate) {
        return +1;
      } else {
        return 0;
      }
    });

    var res = {};

    for (let i = 0; i < keys.length; i++){
      res[keys[i]] = dict[keys[i]];
      delete dict[keys[i]];
    }

    for (let i = 0; i < keys.length; i++) {
      dict[keys[i]] = res[keys[i]];
    }

    return dict;
  }

export default sortObjects;