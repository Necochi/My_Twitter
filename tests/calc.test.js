import { assert } from 'chai';
import postSize from '../src/assets/post_size.js';

describe('Функция проверки расчета размера поста', function () {
  it('без ссылок', function () {
    const expectedResult = 12;
    const result = postSize('Всем привет!');
    assert.equal(expectedResult, result);
  });

  it('одна ссылка', function () {
    const expectetResult = 24;
    const result = postSize('Заходите на мой канала: www.youtube.com');
    assert.equal(expectetResult, result);
  });

  it('две одинаковых ссылки', function () {
    const expectetResult = 25;
    const result = postSize('Заходите на мой канала: www.youtube.com www.youtube.com');
    assert.equal(expectetResult, result);
  });

  it('две ссылки без пробела', function () {
    const expectetResult = 24;
    const result = postSize('Заходите на мой канала: www.youtube.comwww.youtube.com');
    assert.equal(expectetResult, result);
  });

  it('две разных ссылки', function () {
    const expectetResult = 48;
    const result = postSize('Заходите на мой канала: www.youtube.com, там много интересного!');
    assert.equal(expectetResult, result);
  });

  it('5 ссылок', function () {
    const expectetResult = 4;
    const result = postSize('http://hello.ru www.cloud.net https://kdkjfjhv.info http://ldjdik.org www.ldodnv.uk');
    assert.equal(expectetResult, result);
  });

  it('3 ссылки', function () {
    const expectetResult = 56;
    const result = postSize('Вам стоит посетить эти сайти для сбора информации: www.kfghgr.net, https://jhjtot.xyz, http://kdjvhdj.cn.');
    assert.equal(expectetResult, result);
  });

  it('сообщение с ломаной ссылкой', function () {
    const expectetResult = 47;
    const result = postSize('Добро пожаловать на наш сайт http://skjsksls,ru');
    assert.equal(expectetResult, result);
  });

  it('одна целая и две ломанные ссылки', function () {
    const expectetResult = 11;
    const result = postSize('http://hello.ru www.cloud https//kdkjfjhv.info');
    assert.equal(expectetResult, result);
  });

  it('все варанты ссылок', function () {
    const expectetResult = 9;
    const result = postSize('http://hello.org https://hello.com www.hello.ru http://hello.net https://hello.xyz www.hello.info http://hello.de https://hello.cn www.hello.uk http://hello.fr');
    assert.equal(expectetResult, result);
  });
});
