
import Vue from "vue";
import accounting from "accounting-js";

Vue.filter("capitalize", function(value) {
  if (!value) return "";
  value = value.toString();
  let arr = value.split(" ");
  let capitalized_array = [];
  arr.forEach((word) => {
    let capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    capitalized_array.push(capitalized);
  });
  return capitalized_array.join(" ");
});

Vue.filter("truncate", function(value, limit) {
  if (value.length >= limit) return `${value.substring(0, limit)}...`;
  return value;
});

Vue.filter("tailing", function(value, tail) {
  return value + tail;
});

Vue.filter("time", function(value, is24HrFormat = false) {
  if (value) {
    const date = new Date(Date.parse(value));
    let hours = date.getHours();
    const min = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    if (!is24HrFormat) {
      const time = hours > 12 ? "AM" : "PM";
      hours = hours % 12 || 12;
      return hours + ":" + min + " " + time;
    }
    return hours + ":" + min;
  }
});

Vue.filter("date", function(value, fullDate = false) {
  const date = value.slice(8, 10).trim();
  const month = value.slice(5, 7).trim();
  const year = value.slice(0, 4);
  if (!fullDate) return date + " - " + month + " - " + year;
  else return date + " - " + month + " - " + year;
});

Vue.filter("csv", function(value) {
  return value.join(", ");
});

Vue.filter("filter_tags", function(value) {
  return value.replace(/<\/?[^>]+(>|$)/g, "");
});

Vue.filter("k_formatter", function(num) {
  return num > 999 ? (num / 1000).toFixed(1) + "k" : num;
});

Vue.filter("currency", function(val) {
  return accounting.formatMoney(val, {
    symbol: "₦",
  });
});


Vue.filter("formatCurrency", function(val) {
  // let num = Number.parseInt(val);
  return new Intl.NumberFormat().format(val);
});

Vue.filter("limitArray", function(arr, length) {
  if (arr && arr.length) {
    if (length == -1) {
      return arr;
    }
    if (length > arr.length) {
      return arr;
    }
    return arr.slice(0, length);
  }
  return null;
});

Vue.filter("formatArr", function(val) {
  if(val.length === 0) {
    return 'N/A'
  } else {
    return val[0].unitOfPurchase
  }
});


Vue.filter("formatCat", function(val) {
  if(val === null) {
    return 'N/A'
  } else {
    return val.name
  }
});




Vue.filter("formatRole", function(val) {
  if(val.length === 0) {
    return 'Nill'
  } else {
    return val[0].name
  }
});



Vue.filter("filterLoyalty", function(val) {
  if(val === null) {
    return 'N/A'
  } else {
    return val.loyaltyCategory
  }
});



Vue.filter("filterKoboToNaira", function(val) {
   let amount  = val/100
   new Intl.NumberFormat().format(amount);
   return accounting.formatMoney(amount, {
    symbol: "₦",
  });
});







