import { describe, it, expect } from 'vitest';
import { parseMinute, parseHour, parseDay, parseMonth, parseWeekday, parseCron } from './cronParser';

describe('CronParser - 分フィールド', () => {
  it('数値の分を日本語に変換する', () => {
    expect(parseMinute('0')).toBe('0分');
    expect(parseMinute('30')).toBe('30分');
    expect(parseMinute('59')).toBe('59分');
  });
});

describe('CronParser - 時フィールド', () => {
  it('数値の時を日本語に変換する', () => {
    expect(parseHour('0')).toBe('0時');
    expect(parseHour('9')).toBe('9時');
    expect(parseHour('23')).toBe('23時');
  });
});

describe('CronParser - 日フィールド', () => {
  it('数値の日を日本語に変換する', () => {
    expect(parseDay('1')).toBe('1日');
    expect(parseDay('15')).toBe('15日');
    expect(parseDay('31')).toBe('31日');
  });
});

describe('CronParser - 月フィールド', () => {
  it('数値の月を日本語に変換する', () => {
    expect(parseMonth('1')).toBe('1月');
    expect(parseMonth('6')).toBe('6月');
    expect(parseMonth('12')).toBe('12月');
  });
});

describe('CronParser - 曜日フィールド', () => {
  it('数値の曜日を日本語に変換する', () => {
    expect(parseWeekday('0')).toBe('日曜日');
    expect(parseWeekday('1')).toBe('月曜日');
    expect(parseWeekday('6')).toBe('土曜日');
  });
});

describe('CronParser - アスタリスク記号', () => {
  it('アスタリスクを適切に日本語に変換する', () => {
    expect(parseMinute('*')).toBe('毎分');
    expect(parseHour('*')).toBe('毎時');
    expect(parseDay('*')).toBe('毎日');
    expect(parseMonth('*')).toBe('毎月');
    expect(parseWeekday('*')).toBe('毎日');
  });
});

describe('CronParser - 範囲記号', () => {
  it('範囲を適切に日本語に変換する', () => {
    expect(parseMinute('0-30')).toBe('0分から30分まで');
    expect(parseHour('9-17')).toBe('9時から17時まで');
    expect(parseDay('1-15')).toBe('1日から15日まで');
    expect(parseMonth('6-8')).toBe('6月から8月まで');
    expect(parseWeekday('0-6')).toBe('日曜日から土曜日まで');
  });
});

describe('CronParser - リスト記号', () => {
  it('リストを適切に日本語に変換する', () => {
    expect(parseMinute('0,15,30')).toBe('0分、15分、30分');
    expect(parseHour('9,12,18')).toBe('9時、12時、18時');
    expect(parseDay('1,15,31')).toBe('1日、15日、31日');
    expect(parseMonth('3,6,9,12')).toBe('3月、6月、9月、12月');
    expect(parseWeekday('1,3,5')).toBe('月曜日、水曜日、金曜日');
  });
});

describe('CronParser - 間隔記号', () => {
  it('間隔を適切に日本語に変換する', () => {
    expect(parseMinute('*/15')).toBe('15分おき');
    expect(parseHour('*/6')).toBe('6時間おき');
    expect(parseDay('*/7')).toBe('7日おき');
    expect(parseMonth('*/3')).toBe('3か月おき');
  });
});

describe('CronParser - 統合テスト', () => {
  it('完全なcron式を日本語に変換する', () => {
    expect(parseCron('0 9 * * 1-5')).toBe('平日の9時0分');
    expect(parseCron('*/15 * * * *')).toBe('15分おきに毎時毎日毎月');
    expect(parseCron('0 0 1 1 *')).toBe('1月1日の0時0分');
    expect(parseCron('30 18 * * 0')).toBe('日曜日の18時30分');
    expect(parseCron('0 12 1,15 * *')).toBe('1日、15日の12時0分');
  });
});