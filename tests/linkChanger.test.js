import { assert } from 'chai';
import linkChanger from '../public/assets/linkChanger.js';

describe('Функция оборота ссылок в тег <a>', function () {
  it('Одна ссылка', function () {
    const expectedResult = "Мой гитхаб: <a href='www.github.com/burtovoy'>www.github.com/burtovoy</a>";
    const result = linkChanger('Мой гитхаб: www.github.com/burtovoy');
    assert.equal(expectedResult, result);
  });

  it('Одна ссылка с поддоменом', function () {
    const expectedResult = "Заходите на мой сайт <a href='https://www.vk.com/ankord'>www.vk.com/ankord</a>";
    const result = linkChanger('Заходите на мой сайт https://www.vk.com/ankord');
    assert.equal(expectedResult, result);
  });

  it('Ссылки без протокола', function () {
    const expectedResult = "<a href='twitter.org/assets/main/index.txt'>twitter.org/assets/main/index.txt</a> - это то, над чем я работаю.";
    const result = linkChanger('twitter.org/assets/main/index.txt - это то, над чем я работаю.');
    assert.equal(expectedResult, result);
  });

  it('Две ссылки', function () {
    const expectedResult = "Мои соцсети - <a href='http://eva.paragramm.org/killua'>eva.paragramm.org/killua</a> и <a href='outfit.net/kill_u_a'>outfit.net/kill_u_a</a>";
    const result = linkChanger('Мои соцсети - http://eva.paragramm.org/killua и outfit.net/kill_u_a');
    assert.equal(expectedResult, result);
  });

  it('3 разные ссылки', function () {
    const expectedResult = "На этом сайте я делаю посты: <a href='https://molotowa'>molotowa</a> , а на этом выкладываю видео: <a href='www.yotebu.cn/video/loved'>www.yotebu.cn/video/loved</a> . И этот так, в придачу <a href='footnotebook.uk/books'>footnotebook.uk/books</a>";
    const result = linkChanger('На этом сайте я делаю посты: https://molotowa , а на этом выкладываю видео: www.yotebu.cn/video/loved . И этот так, в придачу footnotebook.uk/books');
    assert.equal(expectedResult, result);
  });

  it('Без ссылок', function () {
    const expectedResult = 'Это обычный пост без сыылок. Тут несколько предложений.';
    const result = linkChanger('Это обычный пост без сыылок. Тут несколько предложений.');
    assert.equal(expectedResult, result);
  });

  it('Сломанная ссылка', function () {
    const expectedResult = 'Мне кажется или моя ссылка немного сломана? Вот она http//shtoto.nastrannom.ran';
    const result = linkChanger('Мне кажется или моя ссылка немного сломана? Вот она http//shtoto.nastrannom.ran');
    assert.equal(expectedResult, result);
  });

  it('Одна сломанная и одна правильная ссылки', function () {
    const expectedResult = "У меня есть две ссылки, но одна из них не рабочаяю Угадай какая? <a href='www.edu.klakmenshtrax.fr/boo'>www.edu.klakmenshtrax.fr/boo</a> или way.etosupersilka.omg/suda";
    const result = linkChanger('У меня есть две ссылки, но одна из них не рабочаяю Угадай какая? www.edu.klakmenshtrax.fr/boo или way.etosupersilka.omg/suda');
    assert.equal(expectedResult, result);
  });
});
