import { assert } from 'chai';
import convertTime from '../public/assets/convertTime.js';

describe('Функция перевода секунд в минуты, часы, дни, годы', function () {
  it('час', function () {
    const expectedResult = '1 час назад';
    const result = convertTime(61);
    assert.equal(expectedResult, result);
  });

  it('60 минут', function () {
    const expectedResult = '60 минут назад';
    const result = convertTime(60);
    assert.equal(expectedResult, result);
  });

  it('5 минут', function () {
    const expectedResult = '5 минут назад';
    const result = convertTime(5);
    assert.equal(expectedResult, result);
  });

  it('21 минут', function () {
    const expectedResult = '21 минуту назад';
    const result = convertTime(21);
    assert.equal(expectedResult, result);
  });

  it('3 дня', function () {
    const expectedResult = '3 дня назад';
    const result = convertTime(4320);
    assert.equal(expectedResult, result);
  });

  it('18 дней', function () {
    const expectedResult = '18 дней назад';
    const result = convertTime(25634);
    assert.equal(expectedResult, result);
  });

  it('174 дня', function () {
    const expectedResult = '174 дня назад';
    const result = convertTime(250364);
    assert.equal(expectedResult, result);
  });

  it('11 лет', function () {
    const expectedResult = '11 лет назад';
    const result = convertTime(5781630);
    assert.equal(expectedResult, result);
  });

  it('48 лет', function () {
    const expectedResult = '48 лет назад';
    const result = convertTime(25346427);
    assert.equal(expectedResult, result);
  });

  it('121 год', function () {
    const expectedResult = '121 год назад';
    const result = convertTime(63597600);
    assert.equal(expectedResult, result);
  });
});
