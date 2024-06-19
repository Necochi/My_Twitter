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
    const msgsJSON = await fetch('https://burtovoy.github.io/messages.json');
    const avatarsJSON = await fetch('https://burtovoy.github.io/pictures.json');
    let msgsJS = await msgsJSON.json();
    msgsJS = msgsJS.messages;
    let avatarsJS = await avatarsJSON.json();
    avatarsJS = avatarsJS.pictures;

    // ------ DOM vars -----
    const allMsgs = document.querySelector('.last_msgs');

    msgsJS.forEach((val, index) => {
      if (!val.img_message) {
        allMsgs.innerHTML += `
        <div class="msg${index + 1} msg">
          <div class="icon">
        </div>
        <div class="info">
          <div class="name_time">
            <div class="name_div">
              <p class="name">${val.name}</p>
              <p>${val.mail}</p>
            </div>
            <div class="time">
              <p>${val.date}</p>
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
        </div>
        <div class="info">
          <div class="name_time">
            <div class="name_div">
              <p class="name">${val.name}</p>
              <p>${val.mail}</p>
            </div>
            <div class="time">
              <p>${val.date}</p>
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

    avatarsJS.forEach((val, index) => {
      allMsgs.querySelector(`.msg${index + 1}`).firstElementChild.innerHTML += `
      <img src=${val.url} alt="icon">
      `;
    });
  }

  statisticAPI();
  mesgsAPI();
}
