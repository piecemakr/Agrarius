function updateValues() {

// Get all output values
var currentRev = $('#currentRevenueOutput');
var newRev = $('#newRevenueOutput');
var a1 = $('#currentTotal');
var a2 = $('#currentYields');
var a3 = $('#currentFertilizerCost');
var b1 = $('#newTotal');
var b2 = $('#newYields');
var b3 = $('#newFertilizerCost');
var c1 = $('#ROITotal');
var c2 = $('#ROIYields');
var c3 = $('#ROIFertilizerCost');
var percentIncrease = $('#ROIPercentIncrease');
var cropName = $('#ROICropName');
var ROI = $('#ROIVal');
var ROIFertilizer = $('#fertilizerReductionVal');
var percentDecrease = $('#ROIPercentDecrease');
var linkOutput = $('#linkOutput');


// ::calc functions vals
var cropNameVal = $('#cropInput').find('option:selected').text();
var cropNameDec = (Number($('#cropInput').val())); 
var cropVal = Math.ceil(cropNameDec / 0.01) * 0.01;
var landVal = Number($('#landInput').val());
var yieldVal = Number($('#yieldInput').val());
var revenueVal = Number($('#revenueInput').val());
var fertilizerCostVal = Number($('#fertilizerCostInput').val());
var fertilzerReductionVal = Number($('#fertilzerReductionInput').val());
// PRODUCT COST
var units = $('#units').val();
var multiplier = (units ==="Hectares") ? 2.5 : 1 ;
var productCostVal = 24 * multiplier;
var applicationsVal = 2;

// Create a link to save a farms inputs
let link = "https://agrarius.io/resources/roi?val=" + cropNameDec + "&land=" + landVal + "&units=" + units + "&yield=" + yieldVal + "&revenue=" + revenueVal + "&fertilizerCost=" + fertilizerCostVal;
console.log(link);
linkOutput.text(link)

function copyToClipboard(link) {
  	navigator.clipboard.writeText(link).then(function() {
    console.log("Link copied to clipboard: " + link);
  }, function(err) {
    console.error("Failed to copy save link to your clipboard: " + err);
  });
}

$('#copyToClipboard').click(function() {
  copyToClipboard(link);
});

// Update all output values
// Main ROI Values
currentRev.text(calcFunction1(landVal, yieldVal, revenueVal, fertilizerCostVal));
newRev.text(calcFunction2(cropVal, landVal, yieldVal, revenueVal, fertilizerCostVal, fertilzerReductionVal, productCostVal, applicationsVal));

// Chart Values
a1.text(calcFunctionA1(yieldVal, landVal)); 																	// Current, Total Yield
a2.text(calcFunctionA2(yieldVal)); 																						// Current, Yield per Acre
a3.text(calcFunctionA3(fertilizerCostVal, landVal)); 													// Current, Fertilizer Cost

b1.text(calcFunctionB1(yieldVal, landVal, cropVal)); 													// Agrarius, Total Yield
b2.text(calcFunctionB2(yieldVal, cropVal)); 																	// Agrarius, Yield per Acre
b3.text(calcFunctionB3(fertilizerCostVal, landVal, fertilzerReductionVal)); 	// Agrarius, Fertilizer Cost Reduction

c1.text(calcFunctionC1(yieldVal, landVal, cropVal)); 													// ROI, A1 - B1
c2.text(calcFunctionC2(yieldVal, cropVal)); 																	// ROI, A2 - B2
c3.text(calcFunctionC3(fertilizerCostVal, landVal, fertilzerReductionVal)); 	// ROI, A3 - B3

// Summary Statement Values
percentIncrease.text(Math.round((cropVal - 1 ) * 100 ));
cropName.text(cropNameVal);
ROI.text(calcFunctionROI1(cropVal, landVal, yieldVal, revenueVal, fertilizerCostVal, fertilzerReductionVal, productCostVal, applicationsVal));
ROIFertilizer.text(calcFunctionC3(fertilizerCostVal, landVal, fertilzerReductionVal));
percentDecrease.text(Math.round(fertilzerReductionVal));
  
}

function calcFunction1(landVal, yieldVal, revenueVal, fertilizerCostVal) {

	let total = Math.round(landVal * yieldVal * revenueVal) - (fertilizerCostVal * landVal);
	let dollarUS = Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	return dollarUS.format(total);
  
}

function calcFunction2(cropVal, landVal, yieldVal, revenueVal, fertilizerCostVal, fertilzerReductionVal, productCostVal, applicationsVal) {																																				

	let total = Math.round(yieldVal * cropVal * landVal * revenueVal) - ((fertilizerCostVal * landVal) - ((fertilizerCostVal * landVal) * (fertilzerReductionVal / 100))) - (productCostVal * applicationsVal * landVal);
	let dollarUS = Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	return dollarUS.format(total);
  
}

function calcFunctionA1(yieldVal, landVal) {

	return Math.round(landVal * yieldVal);

}

function calcFunctionA2(yieldVal) {

	return Math.round(yieldVal);

}

function calcFunctionA3(fertilizerCostVal, landVal) {

	let total = Math.ceil(fertilizerCostVal * landVal);
	let dollarUS = Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	return dollarUS.format(total);

}

function calcFunctionB1(yieldVal, landVal, cropVal) {

	return Math.round(landVal * yieldVal * cropVal);

}

function calcFunctionB2(yieldVal, cropVal) {

	return Math.round(yieldVal * cropVal);

}

function calcFunctionB3(fertilizerCostVal, landVal, fertilzerReductionVal) {

	let total = Math.ceil((fertilizerCostVal * landVal) - ((fertilizerCostVal * landVal) * (fertilzerReductionVal / 100 )));
	let dollarUS = Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	return dollarUS.format(total);
  
}

function calcFunctionC1(yieldVal, landVal, cropVal) {

	return Math.round((landVal * yieldVal * cropVal) - (landVal * yieldVal));

}

function calcFunctionC2(yieldVal, cropVal) {

	return Math.round((yieldVal * cropVal) - (yieldVal));

}

function calcFunctionC3(fertilizerCostVal, landVal, fertilzerReductionVal) {

	let total = Math.ceil((fertilizerCostVal * landVal) - ((fertilizerCostVal * landVal) * (fertilzerReductionVal / 100 )) - (fertilizerCostVal * landVal));
	let dollarUS = Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	return dollarUS.format(-1 * total);

}

function calcFunctionROI1(cropVal, landVal, yieldVal, revenueVal, fertilizerCostVal, fertilzerReductionVal, productCostVal, applicationsVal) {

	let revenueCurrent = Math.round(landVal * yieldVal * revenueVal) - (fertilizerCostVal * landVal);
	let revenueNew = Math.round(yieldVal * cropVal * landVal * revenueVal) - ((fertilizerCostVal * landVal) - ((fertilizerCostVal * landVal) * (fertilzerReductionVal / 100))) - (productCostVal * applicationsVal * landVal);

	let total = (revenueNew - revenueCurrent);
	let dollarUS = Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	return dollarUS.format(total);

}



// Perform ROI calculation when DOM is loaded for case studies
$(window).on('load', function() {
	updateValues();
});

// Perform ROI calculation when an input is updated
$('#cropInput').on('change', function() {
	updateValues();
});
$('#units').on('change', function() {
	updateValues();
});
$('#landInput').on('input', function() {
	updateValues();
});
$('#yieldInput').on('input',function() {
	updateValues();
});
$('#revenueInput').on('input', function() {
	updateValues();
});
$('#fertilizerCostInput').on('input', function() {
	updateValues();
});
$('#fertilzerReductionInput').on('change', function() {
	updateValues();
});
