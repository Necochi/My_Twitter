import convertTime from './convertTime.js';

export default function mainPageAPI() {
  async function statisticAPI() {
    const statJSON = await fetch('https://burtovoy.github.io/statistic.json');
    let statJS = await statJSON.json();
    statJS = statJS.statistic;

    // ------ DOM vars -----
    const statRegs = document.querySelector('.registers').firstElementChild;
    const statMsgs = document.querySelector('.msg').firstElementChild;
    const statTodayMsgs = document.querySelector('.today_msg').firstElementChild;

    // ----- conecting API to the DOM ------
    statRegs.innerHTML = statJS.usersRegistr;
    statMsgs.innerHTML = statJS.writMessages;
    statTodayMsgs.innerHTML = statJS.writToday;
  }

  async function mesgsAPI() {
    const msgsApi = 'https://burtovoy.github.io/messages.json';
    const picturesApi = 'https://burtovoy.github.io/pictures.json';
    const preloadDiv = document.querySelector('.preload_div');
    const allMsgs = document.querySelector('.last_msgs');
    let msgsJS;
    let avatarsJS;
    let timeArr = [];
    const convertedTime = [];
    let aTime = '';
    let newTime;
    const whatTime = (date) => convertTime(date, new Date());

    // --------------

    function convertDate(date) {
      date.forEach((val) => {
        val.date.split('').forEach((v, i) => {
          if (
            !Number.isNaN(Number(v))
            && v !== ' '
            && i !== val.date.length - 1
          ) {
            aTime += v;
          } else if (i === val.date.length - 1) {
            aTime += v;
            timeArr.push(Number(aTime));
            timeArr[1] -= 1;
            convertedTime.push(
              new Date(
                timeArr[2],
                timeArr[1],
                timeArr[0],
                timeArr[3],
                timeArr[4],
              ),
            );
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
    }
    // --------------

    fetch(picturesApi)
      .then((response) => {
        let respJSON;
        if (response.ok) respJSON = response.json();
        return respJSON;
      })
      .then((data) => {
        avatarsJS = data.pictures;
      });

    // ----------------

    fetch(msgsApi)
      .then((response) => {
        if (response.ok) preloadDiv.classList.add('hidden');
        return response.json();
      })
      .then((data) => {
        msgsJS = data.messages;
        convertDate(msgsJS);
      })
      .then(() => {
        msgsJS.forEach((val, index) => {
          newTime = whatTime(convertedTime[index]);
          if (!val.img_message) {
            allMsgs.innerHTML += `
            <div class="msg${index + 1} msg">
              <div class="icon">
              <img src=${avatarsJS[index].url} alt="icon">
            </div>
            <div class="info">
              <div class="name_time">
                <div class="name_div">
                  <p class="name">${val.name}</p>
                  <p>${val.mail}</p>
                </div>
                <div class="time">
                  <p>${newTime}</p>
                </div>
              </div>
              <div class="text">
                <p>${val.message}</p>
              </div>
              <div class="send_like_dwld">
                <div class="send">
                  <img src="assets/imgs/send.svg" alt="send">
                  <p>${val.quantityReposts}</p>
                </div>
                <div class="like">
                  <img src="assets/imgs/like.svg" alt="like">
                  <p>${val.quantityLike}</p>
                </div>
                <div class="dwld">
                  <img src="assets/imgs/dwld.svg" alt="download">
                  <p>${val.quantityShare}</p>
                </div>
              </div>
            </div>
          </div>
      
          <div class="line"></div>
          `;
          } else {
            allMsgs.innerHTML += `
          <div class="msg${index + 1} msg">
            <div class="icon">
            <img src=${avatarsJS[index].url} alt="icon">
            </div>
            <div class="info">
              <div class="name_time">
                <div class="name_div">
                  <p class="name">${val.name}</p>
                  <p>${val.mail}</p>
                </div>
                <div class="time">
                  <p>${newTime}</p>
                </div>
              </div>
              <div class="text">
                <p>${val.message}</p>
                <img class="added_img" src=${val.img_message}>
              </div>
              <div class="send_like_dwld">
                <div class="send">
                  <img src="assets/imgs/send.svg" alt="send">
                  <p>${val.quantityReposts}</p>
                </div>
                <div class="like">
                  <img src="assets/imgs/like.svg" alt="like">
                  <p>${val.quantityLike}</p>
                </div>
                <div class="dwld">
                  <img src="assets/imgs/dwld.svg" alt="download">
                  <p>${val.quantityShare}</p>
                </div>
              </div>
            </div>
          </div>
      
          <div class="line"></div>
          `;
          }
        });
      })
      .then(() => {
        const timeDiv = document.querySelectorAll('.time');
        setInterval(() => {
          convertedTime.forEach((v, i) => {
            newTime = whatTime(v);
            timeDiv.forEach((val, ind) => {
              if (i === ind) {
                const newVal = val;
                newVal.firstElementChild.innerHTML = newTime;
              }
            });
          });
        }, 60000);
      });
  }
  statisticAPI();
  mesgsAPI();
}
