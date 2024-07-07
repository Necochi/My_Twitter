import { assert } from 'chai';
import convertTime from '../src/assets/convertTime.js';

describe('Функция перевода секунд в минуты, часы, дни, годы', function () {
  it('час', function () {
    const expectedResult = '1 час назад';
    const result = convertTime(new Date('2022-01-01T12:00:00Z'), new Date('2022-01-01T13:01:00Z'));
    assert.equal(expectedResult, result);
  });

  it('60 минут', function () {
    const expectedResult = '60 минут назад';
    const result = convertTime(new Date('2022-01-01T12:00:00Z'), new Date('2022-01-01T13:00:00Z'));
    assert.equal(expectedResult, result);
  });

  it('5 минут', function () {
    const expectedResult = '5 минут назад';
    const result = convertTime(new Date('2022-01-01T12:00:00Z'), new Date('2022-01-01T12:05:00Z'));
    assert.equal(expectedResult, result);
  });

  it('21 минут', function () {
    const expectedResult = '21 минуту назад';
    const result = convertTime(new Date('2022-01-01T12:00:00Z'), new Date('2022-01-01T12:21:00Z'));
    assert.equal(expectedResult, result);
  });

  it('3 дня', function () {
    const expectedResult = '3 дня назад';
    const result = convertTime(new Date('2022-01-01T00:00:00Z'), new Date('2022-01-04T00:00:00Z'));
    assert.equal(expectedResult, result);
  });

  it('18 дней', function () {
    const expectedResult = '18 дней назад';
    const result = convertTime(new Date('2022-01-01T00:00:00Z'), new Date('2022-01-19T00:00:00Z'));
    assert.equal(expectedResult, result);
  });

  it('174 дня', function () {
    const expectedResult = '174 дня назад';
    const result = convertTime(new Date('2022-01-01T00:00:00Z'), new Date('2022-06-24T00:00:00Z'));
    assert.equal(expectedResult, result);
  });

  it('11 лет', function () {
    const expectedResult = '11 лет назад';
    const result = convertTime(new Date('2021-01-01T00:00:00Z'), new Date('2032-01-01T00:00:00Z'));
    assert.equal(expectedResult, result);
  });

  it('48 лет', function () {
    const expectedResult = '48 лет назад';
    const result = convertTime(new Date('2021-01-01T00:00:00Z'), new Date('2069-01-01T00:00:00Z'));
    assert.equal(expectedResult, result);
  });

  it('121 год', function () {
    const expectedResult = '121 год назад';
    const result = convertTime(new Date('2021-01-01T00:00:00Z'), new Date('2142-01-01T00:00:00Z'));
    assert.equal(expectedResult, result);
  });
});
