export default function linkChanger(txt) {
  const domens = [
    '.org',
    '.com',
    '.ru',
    '.net',
    '.xyz',
    '.info',
    '.de',
    '.cn',
    '.uk',
    '.fr',
  ];
  const protocols = ['http://', 'https://'];
  const result = [];
  let prtcl = '';
  let dmn = '';

  function isLink(mainTxt, indexMainTxt) {
    const slicedPart = mainTxt.slice(prtcl.length, mainTxt.length);
    if ((prtcl !== '' && (dmn !== '' || dmn === '')) && !(result[indexMainTxt])) {
      result.push(`<a href='${mainTxt}'>${slicedPart}</a>`);
      prtcl = '';
      dmn = '';
    } else if ((prtcl === '' && dmn !== '') && !(result[indexMainTxt])) {
      result.push(`<a href='${mainTxt}'>${mainTxt}</a>`);
      dmn = '';
    } else if (((prtcl === '' || prtcl !== '') && dmn === '') && !(result[indexMainTxt])) {
      result.push(mainTxt);
      prtcl = '';
    } else {
      prtcl = '';
      dmn = '';
    }
  }

  txt.split(' ').forEach((val, ind) => {
    protocols.forEach((value, index) => {
      if (val.startsWith(value)) {
        prtcl = value;
        domens.forEach((v, i) => {
          if (val.includes(v)) {
            dmn = v;
            isLink(val, ind);
          } else if (i === domens.length - 1 && dmn === ''
          && prtcl !== '') {
            dmn = '';
            isLink(val, ind);
          }
        });
      } else if (!(val.startsWith(value)) && index === protocols.length - 1) {
        domens.forEach((v, i) => {
          if (val.includes(v)) {
            dmn = v;
            isLink(val, ind);
          } else if (!(val.includes(v)) && i === domens.length - 1) {
            isLink(val, ind);
          }
        });
      }
    });
  });
  return result.join(' ');
}
