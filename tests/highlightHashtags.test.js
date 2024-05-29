import { assert } from 'chai';
import highlightHashtags from '../public/assets/highlightHashtags.js';

describe('Функция подсветки и поиска по хештегу', function () {
  it('Добро пожаловать в #нашСладкийМир', function () {
    const expectedResult = 'Добро пожаловать в <a href="/search?tag=нашСладкийМир">#нашСладкийМир</a>';
    const result = highlightHashtags('Добро пожаловать в #нашСладкийМир');
    assert.equal(expectedResult, result);
  });

  it('А вы уже узнали последние #новости ?', function () {
    const expectedResult = 'А вы уже узнали последние <a href="/search?tag=новости">#новости</a> ?';
    const result = highlightHashtags('А вы уже узнали последние #новости ?');
    assert.equal(expectedResult, result);
  });

  it('Как думаете я попаду в вечернюю программу? #волнуюсь #добавьтеМеняВВечернююПрограмму', function () {
    const expectedResult = 'Как думаете я попаду в вечернюю программу? <a href="/search?tag=волнуюсь">#волнуюсь</a> <a href="/search?tag=добавьтеМеняВВечернююПрограмму">#добавьтеМеняВВечернююПрограмму</a>';
    const result = highlightHashtags('Как думаете я попаду в вечернюю программу? #волнуюсь #добавьтеМеняВВечернююПрограмму');
    assert.equal(expectedResult, result);
  });

  it('Ребята, у меня у одной проблемы с хештегами? :< "#хештегРаботай"', function () {
    const expectedResult = 'Ребята, у меня у одной проблемы с хештегами? :< "#хештегРаботай"';
    const result = highlightHashtags('Ребята, у меня у одной проблемы с хештегами? :< "#хештегРаботай"');
    assert.equal(expectedResult, result);
  });

  it('#Всем #привет!', function () {
    const expectedResult = '<a href="/search?tag=Всем">#Всем</a> <a href="/search?tag=привет!">#привет!</a>';
    const result = highlightHashtags('#Всем #привет!');
    assert.equal(expectedResult, result);
  });

  it('Как же я устал работать #сверхурочка #хочудомой #спасите', function () {
    const expectedResult = 'Как же я устал работать <a href="/search?tag=сверхурочка">#сверхурочка</a> <a href="/search?tag=хочудомой">#хочудомой</a> <a href="/search?tag=спасите">#спасите</a>';
    const result = highlightHashtags('Как же я устал работать #сверхурочка #хочудомой #спасите');
    assert.equal(expectedResult, result);
  });

  it('А вы уже знаете, как искать по хештегам?', function () {
    const expectedResult = 'А вы уже знаете, как искать по хештегам?';
    const result = highlightHashtags('А вы уже знаете, как искать по хештегам?');
    assert.equal(expectedResult, result);
  });
});
