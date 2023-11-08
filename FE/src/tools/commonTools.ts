export function isNullOrEmpty(v: any) {
  return v === null || v === undefined || v === "";
}

export function isNull(v: any) {
  return v === null || v === undefined;
}

export function isNumber(value: string | number): boolean {
  return value !== undefined && value !== null && value !== "" && !isNaN(Number(value.toString()));
}

export function getYYYYMMDDFormat(date: Date, option?: string, isTime?: boolean) {
  const year = date.getFullYear().toString();
  const month = 1 + date.getMonth();
  const monthStr = `0${month}`.slice(-2);
  const day = date.getDate();
  const dayStr = `0${day}`.slice(-2);

  const hour = date.getHours();
  const hourStr = `0${hour}`.slice(-2);

  const min = date.getMinutes();
  const minStr = `0${min}`.slice(-2);

  const sec = date.getSeconds();
  const secStr = `0${sec}`.slice(-2);

  if (isTime) {
    if (option === "slash") return `${year}/${monthStr}/${dayStr} ${hourStr}:${minStr}`;
    else if (option === "hyphen") return `${year}-${monthStr}-${dayStr} ${hourStr}:${minStr}`;
    else return `${year}${monthStr}${dayStr}${hourStr}${minStr}`;
  } else {
    if (option === "slash") return `${year}/${monthStr}/${dayStr}`;
    else if (option === "hyphen") return `${year}-${monthStr}-${dayStr}`;
    else return `${year}${monthStr}${dayStr}`;
  }
}

export function getDateDiff(_date1: Date, _date2: Date) {
  const diffDate_1 = new Date(_date1.getTime());
  const diffDate_2 = new Date(_date2.getTime());

  const diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());

  const year = Math.floor(diff / (1000 * 3600 * 24 * 30 * 12));

  const month = Math.floor(diff / (1000 * 3600 * 24 * 30));

  const week = Math.floor(diff / (1000 * 3600 * 24 * 7));

  const day = Math.floor(diff / (1000 * 3600 * 24));

  const nHour = diff % (1000 * 3600 * 24);
  const hour = Math.floor(nHour / (1000 * 3600));

  const nMin = nHour % (1000 * 3600);
  const min = Math.floor(nMin / (1000 * 60));

  if (year >= 1) return `${year}년 전`;
  else {
    if (month >= 1) return `${month}달 전`;
    else {
      if (week >= 1) return `${week}주 전`;
      else {
        if (day >= 1) return `${day}일 전`;
        else {
          if (hour >= 1) return `${hour}시간 전`;
          else {
            if (min >= 5) return `${min}분 전`;
            else return `방금 전`;
          }
        }
      }
    }
  }
}
