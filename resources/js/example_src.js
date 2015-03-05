'use strict';

var achFile,
	achFileOutput,
	achForbject,
	classie = require('classie'),
	expandButton,
	forbject = require('forbject'),
	tsACHFileContainer,
	moment = require('moment'),
	nach = require('nach'),
	optionalButton,
	optionalInputs,
	utils = nach.Utils;

var showOptionalInput = function () {

	if (classie.has(optionalButton, 'showing-optional')) {
		classie.remove(optionalButton, 'showing-optional');
		optionalButton.innerHTML = 'show optional';
		for (var x = 0; x < optionalInputs.length; x++) {
			classie.remove(optionalInputs[x], 'ts-show-optional');
		}
	}
	else {
		classie.add(optionalButton, 'showing-optional');
		optionalButton.innerHTML = 'hide optional';
		for (var y = 0; y < optionalInputs.length; y++) {
			classie.add(optionalInputs[y], 'ts-show-optional');
		}
	}
};

var expandACHOutput = function () {
	if (classie.has(tsACHFileContainer, 'expanded')) {
		classie.remove(tsACHFileContainer, 'expanded');
		expandButton.innerHTML = 'expand';
	}
	else {
		classie.add(tsACHFileContainer, 'expanded');
		expandButton.innerHTML = 'collapse';
	}
};

var updateNach = function (data) {

	// // Create the entries
	// var firstCreditTransaction = new nach.Entry({
	// 	receivingDFI: '081000210',
	// 	DFIAccount: '12345678901234567',
	// 	amount: '35.21',
	// 	idNumber: 'RAj##23920rjf31',
	// 	individualName: 'Glen Selle',
	// 	discretionaryData: 'A1',
	// 	transactionCode: '22'
	// });

	// var secondCreditTransaction = new nach.Entry({
	// 	receivingDFI: '081000210',
	// 	DFIAccount: '5654221',
	// 	amount: '23',
	// 	idNumber: 'RAj##32b1kn1bb3',
	// 	individualName: 'Melanie Gibson',
	// 	discretionaryData: 'A1',
	// 	transactionCode: '22'
	// });
	// var routingNumber = '281073555'; // Pulaski routing number

	// var companyName = 'Zipline Labs Inc';
	// var companyIdentification = '471934319';
	// var transactionDiscription = 'test transactionDiscription';
	// var transactionDiscription = 'Zip Transfer';

	// // Create the batches
	// var creditLow = new nach.Batch({
	// 	serviceClassCode: '220',
	// 	companyName: companyName,
	// 	standardEntryClassCode: 'WEB',
	// 	companyIdentification: companyIdentification,
	// 	companyEntryDescription: transactionDiscription,
	// 	companyDescriptiveDate: moment(utils.computeBusinessDay(1)).format('MMM D'),
	// 	effectiveEntryDate: utils.computeBusinessDay(1),
	// 	originatingDFI: routingNumber
	// });
	// creditLow.addEntry(firstCreditTransaction);
	// creditLow.addEntry(secondCreditTransaction);


	achFile = new nach.File({
		immediateDestination: data.immediateDestination, //'281073555', // 281074114
		immediateOrigin: data.immediateOrigin, //471934319',
		immediateDestinationName: data.immediateDestinationName, //Pulaski Bank',
		immediateOriginName: data.immediateOriginName, //Zipline Labs Inc.',
		referenceCode: data.referenceCode, //#A000001',
	});

	// Add the batches to the file
	// achFile.addBatch(creditLow);

	achFile.generateFile(function (fileString) {
		achFileOutput.innerHTML = fileString;
	});
};

var initDefaultValues = function () {
	document.querySelector('#fileCreationDate').value = utils.formatDate(new Date());
	document.querySelector('#fileCreationTime').value = utils.formatTime(new Date());
};

window.addEventListener('load', function () {
	achFileOutput = document.querySelector('#ach-file-output');
	achForbject = new forbject('#ach', {
		autorefresh: true
	});
	achForbject.on('refresh', updateNach);
	expandButton = document.querySelector('#expand-button');
	expandButton.addEventListener('click', expandACHOutput, false);
	optionalButton = document.querySelector('#optional-button');
	optionalButton.addEventListener('click', showOptionalInput, false);
	optionalInputs = document.querySelectorAll('.ts-form-optional');
	tsACHFileContainer = document.querySelector('#ts-ach-file-container');
	initDefaultValues();
	window.achForbject = achForbject;
}, false);
