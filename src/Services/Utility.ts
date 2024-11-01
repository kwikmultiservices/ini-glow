import { TimestampDate } from "timestamp-date";

const coverter = new TimestampDate();

export const formatNumber = (num:any) => {
  const n = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
  });

  return n.format(num);
};

export const timestampConverter = coverter;
export const timeStamptoDate = (data:any) => {
  return coverter.parseTimestampToDate(data);
};

export const getRandomString = (size = 50, chars:any) => {
  const result = [];
  const possibleCharacters =
    chars || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charSize = possibleCharacters.length;

  for (let i = 0; i < size; i++) {
    result.push(
      possibleCharacters.charAt(Math.floor(Math.random() * charSize))
    );
  }

  return result.join("");
};

export function createBaitElement() {
  const bait = document.createElement("div");
  bait.setAttribute(
    "class",
    "pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links advertisement ad-text adSense adBlock adContent adBanner"
  );
  bait.setAttribute(
    "style",
    "width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;"
  );
  return bait;
}

export function doesElementIsBlocked(elem:any) {
  if (
    elem.offsetParent === null ||
    elem.offsetHeight === 0 ||
    elem.offsetLeft === 0 ||
    elem.offsetTop === 0 ||
    elem.offsetWidth === 0 ||
    elem.clientHeight === 0 ||
    elem.clientWidth === 0
  ) {
    return true;
  }
  if (window.getComputedStyle !== undefined) {
    const elemCS = window.getComputedStyle(elem, null);
    if (
      elemCS &&
      (elemCS.getPropertyValue("display") === "none" ||
        elemCS.getPropertyValue("visibility") === "hidden")
    ) {
      return true;
    }
  }
  return false;
}

export default function detectDomAdblocker() {
  // that's a legacy Ad Block Plus check I suppose ?
  // I don't think this attribute is set anymore, but I am keeping it anyway
  if (window.document.body.getAttribute("abp") !== null) {
    return true;
  }
  // try to lure adblockers into a trap
  const bait = createBaitElement();
  window.document.body.appendChild(bait);
  const detected = doesElementIsBlocked(bait);
  window.document.body.removeChild(bait);
  return detected;
}


export const getTimeAgo = (isoDate: string | Date): string => {
    const date = new Date(isoDate);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffMinutes = Math.round(diff / (1000 * 60));
    const diffHours = Math.round(diff / (1000 * 60 * 60));
    const diffDays = Math.round(diff / (1000 * 60 * 60 * 24));
  
    if (diffMinutes < 1) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} ${diffMinutes > 1 ? 'mins ago' : 'min ago'}`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours > 1 ? 'hours ago' : 'hour ago'}`;
    } else if (diffDays < 30) {
      return `${diffDays} ${diffDays > 1 ? 'days ago' : 'day ago'}`;
    } else {
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      return `${formattedDate}`;
    }
  };
  
  export const getDiffMonths = (date1: Date, date2: Date): number => {
    const months = (date2.getFullYear() - date1.getFullYear()) * 12;
    return months + date2.getMonth() - date1.getMonth();
  };
  




 export const convertHtmlToText = (htmlString: string): string => {
    const div = document.createElement("div");
    div.innerHTML = htmlString;
    return div.textContent || div.innerText || "";
  };
  