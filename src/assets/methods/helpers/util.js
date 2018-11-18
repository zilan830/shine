function findIndex(ary, fn) {
  if (ary.findIndex) {
    return ary.findIndex(fn);
  }
  /* istanbul ignore next */
  let index = -1;
  /* istanbul ignore next */
  ary.some((item, i, ary) => {
    const ret = fn.call(this, item, i, ary);
    if (ret) {
      index = i;
      return ret;
    }
  });
  /* istanbul ignore next */
  return index;
}

export { findIndex };
