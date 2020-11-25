

module.exports = {
    getDataSlice: getDataSlice,
}


function getDataSlice(count, index, ary) {
    let result = {};
    result.slice = ary.slice(index, index + count);
    result.post = index + count < ary.length ? true : false;
    result.pre = index > 0 ? true : false;
    return result;
  }
