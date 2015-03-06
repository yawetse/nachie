'use strict';

var achBatchCount = 0,
	achBatchContainer,
	addBatchButton,
	achBindie,
	achFile,
	achFileOutput,
	achForbject,
	batchEntryTemplate,
	Bindie = require('bindie'),
	classie = require('classie'),
	expandButton,
	ejs = require('ejs'),
	forbject = require('forbject'),
	tsACHFileContainer,
	tsACHFileContainerTopPos,
	moment = require('moment'),
	nach = require('nach'),
	newACHBatch,
	newACHEntry,
	notification,
	optionalButton,
	optionalInputs,
	saveAs = require('filesaver.js'),
	StylieNotification = require('stylie.notifications'),
	utils = nach.Utils;

ejs.delimiter = '?';

var downloadACH = function () {
	var blob = new Blob([achFileOutput.innerHTML], {
		type: 'text/plain;charset=utf-8'
	});
	saveAs(blob, 'nACHa.txt');
	showNotification({
		type: 'File Saved',
		message: 'nACHa file saved'
	});
};
var saveACH = function () {
	var blob = new Blob([JSON.stringify(achForbject.getObject(), null, ' ')], {
		type: 'application/json;charset=utf-8'
	});
	saveAs(blob, 'nachie.json');
	showNotification({
		type: 'File Saved',
		message: 'Nachie file saved'
	});
};

var showNotification = function (e) {
	notification = new StylieNotification({
		wrapper: document.querySelector('#ach'),
		message: e.type + ': ' + e.message,
		ttl: 6000,
		layout: 'growl',
		effect: 'jelly',
		type: 'notice'
	});
	notification.show();
};

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

var addACHBatch = function () {
	console.log('before achBatchCount on addACHBatch', achBatchCount);
	// achForbject.refresh();
	achBindie.update({
		data: {
			achBatchCount: {
				batchIndex: achBatchCount,
				forbjectData: {
					formdata: achForbject.getObject()
				}
			},
			// forbjectData: achForbject.getObject()
		}
	});
	achBatchCount++;
	console.log('after achBatchCount on addACHBatch', achBatchCount);
};

var updateNach = function (data) {
	try {
		achFile = new nach.File(data.file);

		if (data.batches) {
			for (var z in data.batches) {
				// console.log(data.batches[z]);
				data.batches[z].effectiveEntryDate = moment(data.batches[z].effectiveEntryDate, 'YYMMDD').toDate();
				newACHBatch = new nach.Batch(data.batches[z]);

				if (data.batches[z].entries) {
					// console.log('data.batches[z].entries', data.batches[z].entries);
					for (var y in data.batches[z].entries) {
						newACHEntry = new nach.Entry(data.batches[z].entries[y]);
						newACHBatch.addEntry(newACHEntry);
					}
				}
				achFile.addBatch(newACHBatch);
			}
		}

		achFile.generateFile(function (fileString) {
			achFileOutput.innerHTML = fileString;
		});
	}
	catch (e) {
		showNotification(e);
		console.error(e);
	}
};

var initDefaultValues = function () {
	document.querySelector('#fileCreationDate').value = utils.formatDate(new Date());
	document.querySelector('#fileCreationTime').value = utils.formatTime(new Date());
};

var updateOptionalInputs = function () {
	optionalInputs = document.querySelectorAll('.ts-form-optional');
};

var achBatchContainerClickHandler = function (e) {
	var clickTarget = e.target,
		batchIndex, entryIndex, entryhtml, batchElement, elementsInBatch, entryHtmlElement = document.createElement('section');

	if (classie.has(clickTarget, 'remove-batch-button')) {
		batchIndex = clickTarget.getAttribute('data-batchIndex');
		achBatchContainer.removeChild(document.querySelector('#ach-batch-' + batchIndex));
		achBatchCount--;
		achForbject.refresh();
	}
	else if (classie.has(clickTarget, 'remove-batchentry-button')) {
		batchIndex = clickTarget.getAttribute('data-batchIndex');
		entryIndex = clickTarget.getAttribute('data-entryIndex');
		document.querySelector('#ach-batch-entrycontainer-' + batchIndex).removeChild(document.querySelector('#ach-batchentry-' + batchIndex + '-' + entryIndex));
		achForbject.refresh();
	}
	else if (classie.has(clickTarget, 'add-batch-entry-button')) {
		batchIndex = clickTarget.getAttribute('data-batchIndex');
		batchElement = document.querySelector('#ach-batch-' + batchIndex);
		// console.log('batchElement', batchElement);
		elementsInBatch = batchElement.querySelectorAll('.ach-batchentry');
		// entryIndex = (elementsInBatch.length > 0) ? (elementsInBatch.length - 1) : 0;
		entryIndex = elementsInBatch.length;
		console.log('entryIndex', entryIndex);
		console.log('elementsInBatch', elementsInBatch);
		console.log('elementsInBatch.length', elementsInBatch.length);
		entryhtml = ejs.render(batchEntryTemplate, {
			batchIndex: batchIndex,
			entryIndex: entryIndex,
			entriesCount: elementsInBatch.length + 1,
			forbjectData: {
				formdata: achForbject.getObject()
			}
		});
		entryHtmlElement.setAttribute('class', 'ach-batchentry ts-form-row');
		entryHtmlElement.setAttribute('id', 'ach-batchentry-' + batchIndex + '-' + entryIndex);
		entryHtmlElement.setAttribute('data-batchIndex', batchIndex);
		entryHtmlElement.setAttribute('data-entryIndex', entryIndex);
		//id="ach-batchentry-<?-batchIndex?>-<?-entryIndex?>"
		entryHtmlElement.innerHTML = entryhtml;
		// document.querySelector('#ach-batch-entrycontainer-' + batchIndex).appendChild(entryHtmlElement);
		document.querySelector('#ach-batch-entrycontainer-' + batchIndex).innerHTML = '<section class="ach-batchentry ts-form-row" id="ach-batchentry-' + batchIndex + '-' + entryIndex + '" data-batchindex="' + batchIndex + '" data-entryindex="' + entryIndex + '">' + entryhtml + '</section>';
		// achForbject.refresh();
	}
};

var moveACHFileOutput = function () {
	if (window.scrollY > tsACHFileContainerTopPos && !classie.has(tsACHFileContainer, 'ach-fix-top')) {
		classie.add(tsACHFileContainer, 'ach-fix-top');
	}
	else if (window.scrollY < tsACHFileContainerTopPos && classie.has(tsACHFileContainer, 'ach-fix-top')) {
		classie.remove(tsACHFileContainer, 'ach-fix-top');
	}
};

window.addEventListener('load', function () {
	achBindie = new Bindie({
		ejsdelimiter: '?',
		strictbinding: true
	});
	achBindie.addBinder({
		prop: 'achBatchCount',
		elementSelector: '#ach-file-batches',
		binderType: 'template',
		binderTemplate: document.querySelector('#ach-batch-template').innerHTML,
		binderCallback: function ( /*cbdata*/ ) {
			updateOptionalInputs();
			achForbject.refresh();
			// console.log('binderCallback cbdata', cbdata);
		}
	});
	achFileOutput = document.querySelector('#ach-file-output');
	achForbject = new forbject('#ach', {
		autorefresh: true,
		valuefilter: function (val) {
			if (typeof val === 'string') {
				return val.toUpperCase();
			}
			else {
				return val;
			}
		}
	});
	achForbject.on('refresh', updateNach);
	addBatchButton = document.querySelector('#add-batch-button');
	addBatchButton.addEventListener('click', addACHBatch, false);
	achBatchContainer = document.querySelector('#ach-file-batches');
	achBatchContainer.addEventListener('click', achBatchContainerClickHandler, false);
	batchEntryTemplate = document.querySelector('#ach-batch-entrytemplate').innerHTML;
	expandButton = document.querySelector('#expand-button');
	expandButton.addEventListener('click', expandACHOutput, false);
	optionalButton = document.querySelector('#optional-button');
	optionalButton.addEventListener('click', showOptionalInput, false);
	optionalInputs = document.querySelectorAll('.ts-form-optional');
	tsACHFileContainer = document.querySelector('#ts-ach-file-container');
	tsACHFileContainerTopPos = tsACHFileContainer.getBoundingClientRect().top;
	initDefaultValues();
	document.querySelector('#download-button').addEventListener('click', downloadACH, false);
	document.querySelector('#save-button').addEventListener('click', saveACH, false);
	window.achForbject = achForbject;
	window.addEventListener('scroll', moveACHFileOutput, false);
	// try {

	// }
	// catch (e) {
	// 	showNotification(e);
	// }
}, false);
