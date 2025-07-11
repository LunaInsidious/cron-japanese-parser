export function parseMinute(minute: string): string {
	if (minute === "*") return "毎分";
	if (minute.startsWith("*/")) {
		const interval = minute.substring(2);
		return `${interval}分おき`;
	}
	if (minute.includes("-")) {
		const [start, end] = minute.split("-");
		return `${start}分から${end}分まで`;
	}
	if (minute.includes(",")) {
		const values = minute.split(",");
		return values.map((v) => `${v}分`).join("、");
	}
	return `${minute}分`;
}

export function parseHour(hour: string): string {
	if (hour === "*") return "毎時";
	if (hour.startsWith("*/")) {
		const interval = hour.substring(2);
		return `${interval}時間おき`;
	}
	if (hour.includes("-")) {
		const [start, end] = hour.split("-");
		return `${start}時から${end}時まで`;
	}
	if (hour.includes(",")) {
		const values = hour.split(",");
		return values.map((v) => `${v}時`).join("、");
	}
	return `${hour}時`;
}

export function parseDay(day: string): string {
	if (day === "*") return "毎日";
	if (day.startsWith("*/")) {
		const interval = day.substring(2);
		return `${interval}日おき`;
	}
	if (day.includes("-")) {
		const [start, end] = day.split("-");
		return `${start}日から${end}日まで`;
	}
	if (day.includes(",")) {
		const values = day.split(",");
		return values.map((v) => `${v}日`).join("、");
	}
	return `${day}日`;
}

export function parseMonth(month: string): string {
	if (month === "*") return "毎月";
	if (month.startsWith("*/")) {
		const interval = month.substring(2);
		return `${interval}か月おき`;
	}
	if (month.includes("-")) {
		const [start, end] = month.split("-");
		return `${start}月から${end}月まで`;
	}
	if (month.includes(",")) {
		const values = month.split(",");
		return values.map((v) => `${v}月`).join("、");
	}
	return `${month}月`;
}

export function parseWeekday(weekday: string): string {
	if (weekday === "*") return "毎日";
	const weekdays = [
		"日曜日",
		"月曜日",
		"火曜日",
		"水曜日",
		"木曜日",
		"金曜日",
		"土曜日",
	];
	if (weekday.includes("-")) {
		const parts = weekday.split("-");
		const start = parts[0];
		const end = parts[1];
		if (start === "1" && end === "5") return "平日";
		if (start && end) {
			return `${weekdays[Number.parseInt(start)]}から${weekdays[Number.parseInt(end)]}まで`;
		}
	}
	if (weekday.includes(",")) {
		const values = weekday.split(",");
		return values
			.map((v) => {
				const day = weekdays[Number.parseInt(v)];
				return day || "";
			})
			.filter(Boolean)
			.join("、");
	}
	const day = weekdays[Number.parseInt(weekday)];
	return day || "";
}

export function parseCron(cronExpression: string): string {
	const parts = cronExpression.split(" ");
	if (parts.length !== 5) {
		throw new Error("Invalid cron expression");
	}

	const minute = parts[0];
	const hour = parts[1];
	const day = parts[2];
	const month = parts[3];
	const weekday = parts[4];

	const minutePart = parseMinute(minute);
	const hourPart = parseHour(hour);
	const dayPart = parseDay(day);
	const monthPart = parseMonth(month);
	const weekdayPart = parseWeekday(weekday);

	if (minute.startsWith("*/")) {
		return `${minutePart}に${hourPart}${dayPart}${monthPart}`;
	}

	if (weekday !== "*") {
		if (month !== "*") {
			return `${monthPart}${dayPart}の${weekdayPart}の${hourPart}${minutePart}`;
		}
		return `${weekdayPart}の${hourPart}${minutePart}`;
	}

	if (month !== "*" && day !== "*") {
		return `${monthPart}${dayPart}の${hourPart}${minutePart}`;
	}

	if (day !== "*") {
		return `${dayPart}の${hourPart}${minutePart}`;
	}

	return `${hourPart}${minutePart}`;
}
