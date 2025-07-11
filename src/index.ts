#!/usr/bin/env node
export {
	parseCron,
	parseMinute,
	parseHour,
	parseDay,
	parseMonth,
	parseWeekday,
} from "./cronParser";

import { parseCron } from "./cronParser";

const cronExpression = process.argv[2];
if (!cronExpression) {
	console.log('使用方法: npm start "0 9 * * 1-5"');
	process.exit(1);
}

console.log(parseCron(cronExpression));
