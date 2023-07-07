document.getElementById('calculatorForm').addEventListener('submit', calculateSavings);

function calculateSavings(event) {
  event.preventDefault();

  var fullName = document.getElementById('fullName').value;
  var age = parseFloat(document.getElementById('age').value);
  var income = parseFloat(document.getElementById('income').value);
  var monthlySaving = parseFloat(document.getElementById('monthlySaving').value);
  var remainingIncome = income - monthlySaving;
  var totalYears = parseFloat(document.getElementById('totalYears').value);
  var yearStartSaving = parseFloat(document.getElementById('yearStartSaving').value);
  var yearEndSaving = yearStartSaving + totalYears;
  var dividendRate = parseFloat(document.querySelector('input[name="dividendRate"]:checked').value);
  var totalSavings = calculateTotalSavings(monthlySaving, dividendRate, totalYears);
  var dividendTotal = calculateDividendTotal(monthlySaving, dividendRate, totalYears);
  var targetTotalSaving = parseFloat(document.getElementById('targetTotalSaving').value);
  var remainingTotalSaving = targetTotalSaving - totalSavings;
  var achievedOrNot =
    remainingTotalSaving > 0
      ? "You need RM" + remainingTotalSaving.toFixed(2) + " more to achieve your target"
      : "You have already achieved your target total saving";

  var outputList = [
    { label: "Name", value: fullName },
    { label: "Age", value: age },
    { label: "Income", value: "RM" + income.toFixed(2) },
    { label: "Monthly Saving", value: "RM" + monthlySaving.toFixed(2) },
    { label: "Remaining Income", value: "RM" + remainingIncome.toFixed(2) },
    { label: "Total Years of Saving", value: totalYears },
    { label: "Year Start Saving", value: yearStartSaving },
    { label: "Year End Saving", value: yearEndSaving },
    { label: "Dividend Rate", value: dividendRate.toFixed(2) + "%" },
    { label: "Dividend Total", value: "RM" + dividendTotal.toFixed(2) },
    { label: "Total Savings", value: "RM" + totalSavings.toFixed(2) },
    { label: "Target Total Saving", value: "RM" + targetTotalSaving.toFixed(2) },
    { label: "Remaining Target Total Saving", value: "RM" + remainingTotalSaving.toFixed(2) },
    { label: "Achievement Status", value: achievedOrNot }
  ];

  var resultHTML = "<h3>Calculator Result</h3>";
  resultHTML += "<ul>";
  for (var i = 0; i < outputList.length; i++) {
    resultHTML += "<strong>" + outputList[i].label + ":</strong> " + outputList[i].value + "<br>";
  }
  resultHTML += "</ul>";

  document.getElementById('result').innerHTML = resultHTML;
  var element = document.getElementById("result");
  element.style.display = "inline";
}

function calculateTotalSavings(monthlySaving, dividendRate, totalYears) {
  var totalAmount = 0;

  for (var i = 0; i < totalYears; i++) {
    var dividend = (totalAmount + monthlySaving * 12 * totalYears) * (dividendRate / 100);
    totalAmount += monthlySaving * 12 * totalYears + dividend;
  }

  return totalAmount;
}

function calculateDividendTotal(monthlySaving, dividendRate, totalYears) {
  var dividend = (monthlySaving * 12 * totalYears * dividendRate) / 100;
  return dividend;
}
