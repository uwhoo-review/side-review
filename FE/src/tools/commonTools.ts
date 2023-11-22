import { IMAGE_URL, THUMBNAIL_URL, VIDEO_URL } from "@src/variables/tmdbConstants";

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

export function getCardURL({
  type,
  srcId,
  size,
  autoplay,
}: {
  type: string;
  srcId: string;
  size?: string;
  autoplay?: boolean;
}) {
  const id = srcId?.replaceAll(/^\/|.jpg$/gi, "");
  let res = "";
  if (type === "content") {
    if (size) res = `${IMAGE_URL}/${size}/${id}.jpg`;
    else res = `${IMAGE_URL}/w500/${id}.jpg`;
  } else if (type === "photo") {
    if (size) res = `${IMAGE_URL}/${size}/${id}.jpg`;
    else res = `${IMAGE_URL}/original/${id}.jpg`;
  } else if (type === "trailer") {
    res = `${VIDEO_URL}/${id}?mute=1${autoplay ? "&autoplay=1" : ""}`;
  } else if (type === "thumbnail") {
    if (size) res = `${THUMBNAIL_URL}/${id}/${size}.jpg`;
    else res = `${THUMBNAIL_URL}/${id}/mqdefault.jpg`;
  }

  return res;
}

export function getFilterParams(searchParams: any) {
  const filterList = [];
  if (searchParams.get("genre"))
    filterList.push({
      type: "genre",
      value: [...searchParams.get("genre").split(",")],
    });
  if (searchParams.get("platform"))
    filterList.push({
      type: "platform",
      value: [...searchParams.get("platform").split(",")],
    });
  if (searchParams.get("date"))
    filterList.push({
      type: "date",
      value: [...searchParams.get("date").split(",")],
    });
  if (searchParams.get("rating"))
    filterList.push({
      type: "rating",
      value: [...searchParams.get("rating").split(",")],
    });

  return filterList;
}
