const dateForm = document.getElementById('date-form');
const results = document.getElementById('results');


dateForm.addEventListener('submit', function(e) {

  try {
    e.preventDefault();
    results.style.display = 'none';
  
    const dateField = document.getElementById('date');
  
    if (dateField.value === '') {
      throw "Invalid Date";
    }
  
    const date = new Date(dateField.value);

    if (date.getUTCFullYear() < 950) {
      throw "That date is in the Ancient times!";
    }
  
    const weekday = calculateWeekday(date);
    const year = calculateYear(date);
    const moon = calculateMoon(date);
    const day = calculateDayOfMoon(date);
  
    const dateString = `${weekday}, ${day} ${moon} ${year}`;
    
    const resultsText = document.getElementById("cyrnan-date");
    resultsText.innerText = `The Cyrnan date is ${dateString}`;
    results.style.display = 'block';
  } catch (error) {
    showError(error);
  }

});

function calculateWeekday(date) {
  const weekday = date.getUTCDay();

  switch (weekday) {
    case 0:
      return "Valgrensday";
    case 1:
      return "Meronethsday";
    case 2: 
      return "Kyrizziansday";
    case 3: 
      return "Nahiirasday";
    case 4:
      return "Kassoriasday";
    case 5:
      return "Zekadorsday";
    case 6: 
      return "Natlantisday";
    default:
      throw "Invalid date"
  }
}

function calculateYear(date) {
  const year = date.getUTCFullYear();

  const subtrahend = 950;
  const divisor = 7;

  const godcycle = Math.floor((year - subtrahend) / divisor);

  const newYears = new Date(year, 0, 0);
  let startDay = newYears.getUTCDay();
  
  const skip = isSkip(year);

  if (skip) {
    if (startDay < 6) {
      startDay += 1;
    } else {
      startDay = 0;
    }
  }

  let god;

  switch(startDay) {
    case 0:
      god = "Kyrizzian";
      break;
    case 1:
      god = "Nahiira";
      break;
    case 2:
      god = "Kassoria";
      break;
    case 3:
      god = "Zekador";
      break;
    case 4:
      god = "Natlanti";
      break;
    case 5: 
      god = "Valgren";
      break;
    case 6:
      god = "Meroneth";
      break;
    default:
      throw "invalid date";
  }

  if (skip) {
    god = `Skip ${god}`
  }

  return `${godcycle} ${god}`
}

function calculateMoon(date) {
  const day = calculateDayOfYear(date);

  const skip = isSkip(date.getUTCFullYear());

  if (day <= 53) {
    return "Spalina";
  } else if ((!skip && day <= 104) || (skip && day <= 105)) {
    return "Redanza";
  } else if ((!skip && day <= 158) || (skip && day <= 159)) {
    return "Niran";
  } else if ((!skip && day <= 211) || (skip && day <= 212)) {
    return "Toria";
  } else if ((!skip && day <= 261) || (skip && day <= 262)) {
    return "Sia";
  } else if ((!skip && day <= 312) || (skip && day <= 313)) {
    return "Zai";
  } else {
    return "Kaza";
  }
}

function calculateDayOfMoon(date) {
  moon = calculateMoon(date);
  const dayOfYear = calculateDayOfYear(date);
  const skip = isSkip(date.getUTCFullYear());

  // skip is 60

  switch(moon) {
    case "Spalina":
      return dayOfYear;
    case "Redanza":
      if (skip && dayOfYear == 60) {
        return "Skip Day";
      } else if (skip) {
        return dayOfYear - 54;
      } else {
        return dayOfYear - 53;
      }
    case "Niran":
      return dayOfYear - (skip ? 105 : 104);
    case "Toria":
      return dayOfYear - (skip ? 159 : 158);
    case "Sia":
      return dayOfYear - (skip ? 212: 211);
    case "Zai":
      return dayOfYear - (skip ? 262 : 261);
    case "Kaza":
      return dayOfYear - (skip ? 313 : 312);
    default:
      throw "Invalid Date";
  }

}

function isSkip(year) {
  if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
    return true;
  } else {
    return false;
  }
}

function calculateDayOfYear(date) {
  const newYears = new Date(date.getUTCFullYear(), 0, 0);
  const diff = date - newYears;
  const oneDay = 1000*60*60*24;
  return Math.floor(diff / oneDay) + 1;
}

function showError(error) {
  document.getElementById('results').style.display = 'none';

  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}