const ymArry = () => { 
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  var result = [];
  try {
    for (let i = 2021; i <= 2099 && i <= year; i++){
      for (let j = 1; j <= 12  && (i < year || j <= month); j++) {
        result.push(
          ['' + i + (j < 10 ?"0":"") + j,
          '' + i + '/' + (j < 10 ?"0":"") + j
          ]
        );
      }
    }
    return result;
  } catch (error) {
    return [];
  } finally {
  }
};

const diffOfMonth = (from, to) => { 
  return 1 + 12 * (parseInt(to.substring(0, 4)) - parseInt(from.substring(0, 4))) + parseInt(to.substring(4, 6)) - parseInt(from.substring(4, 6));
};
   
const betweenMonth = (from, to) => { 

  var dateFrom = new Date(parseInt(from.substring(0, 4)), parseInt(from.substring(4, 6)) - 1, 1);
  var dateTo = new Date(parseInt(to.substring(0, 4)), parseInt(to.substring(4, 6)) - 1, 1);

  var result=[];
  while (dateFrom <= dateTo) {
    result.push("" + (dateFrom.getFullYear()) + ((dateFrom.getMonth() + 1) < 10? ("0"+(dateFrom.getMonth() + 1)) : (dateFrom.getMonth() + 1)));

    dateFrom.setMonth(dateFrom.getMonth() + 1);
  }

  return result;
};


exports.ymArry = ymArry;  
exports.diffOfMonth = diffOfMonth;  
exports.betweenMonth = betweenMonth;  
