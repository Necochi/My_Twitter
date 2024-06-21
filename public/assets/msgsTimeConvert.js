import convertTime from './convertTime.js';

export default async function msgTimeAPI() {
  const divMsgs = document.querySelector('.last_msgs');
  let msgsDate = await fetch('https://burtovoy.github.io/messages.json');
  msgsDate = await msgsDate.json();
  msgsDate = msgsDate.messages;
  let timeArr = [];
  const timeArray = [];
  const convertedTime = [];
  let aTime = '';
  let timeDiv;

  // ----- converting Time from the API --------

  msgsDate.forEach((val) => {
    val.date.split('').forEach((v, i) => {
      if (!(Number.isNaN(Number(v))) && v !== ' ' && i !== val.date.length - 1) {
        aTime += v;
      } else if (i === val.date.length - 1) {
        aTime += v;
        timeArr.push(Number(aTime));
        timeArr[1] -= 1;
        convertedTime.push(new Date(timeArr[2], timeArr[1], timeArr[0], timeArr[3], timeArr[4]));
        aTime = '';
        timeArr = [];
      } else if (aTime.length < 2) {
        aTime = `0${aTime}`;
        timeArr.push(Number(aTime));
        aTime = '';
      } else {
        timeArr.push(Number(aTime));
        aTime = '';
      }
    });
  });

  // ---- Getting Appeared DOM elements and importing Function -------

  const observe = new MutationObserver((mutRec) => {
    mutRec.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE && node.isConnected === true) {
            timeDiv = node.querySelectorAll('.time');
            if (timeDiv && timeDiv.length > 0) {
              timeArray.push(timeDiv[0].children[0]);
              timeArray.forEach((v, i) => {
                convertedTime.forEach((value, index) => {
                  const aVal = v;
                  if (i === index) {
                    const whatTime = () => convertTime(value, new Date());
                    aVal.innerHTML = whatTime();
                    setInterval(() => {
                      aVal.innerHTML = whatTime();
                    }, 60000);
                  }
                });
              });
            }
          }
        });
      }
    });
  });

  observe.observe(divMsgs, {
    childList: true,
  });
}
