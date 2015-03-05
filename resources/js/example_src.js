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
	moment = require('moment'),
	nach = require('nach'),
	newACHBatch,
	newACHEntry,
	notification,
	optionalButton,
	optionalInputs,
	StylieNotification = require('stylie.notifications'),
	utils = nach.Utils;

ejs.delimiter = '?';

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
	achForbject.refresh();
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
};

var updateNach = function (data) {
	try {
		achFile = new nach.File(data.file);

		if (data.batch) {
			for (var z in data.batch) {
				// console.log(data.batch[z]);
				data.batch[z].effectiveEntryDate = moment(data.batch[z].effectiveEntryDate, 'YYMMDD').toDate();
				newACHBatch = new nach.Batch(data.batch[z]);

				if (data.batch[z].entries) {
					// console.log('data.batch[z].entries', data.batch[z].entries);
					for (var y in data.batch[z].entries) {
						newACHEntry = new nach.Entry(data.batch[z].entries[y]);
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
	else if (classie.has(clickTarget, 'add-batch-entry-button')) {
		batchIndex = clickTarget.getAttribute('data-batchIndex');
		batchElement = document.querySelector('#ach-batch-' + batchIndex);
		// console.log('batchElement', batchElement);
		elementsInBatch = batchElement.querySelectorAll('.ach-batchentry');
		// entryIndex = (elementsInBatch.length > 0) ? (elementsInBatch.length - 1) : 0;
		entryIndex = elementsInBatch.length;
		entryhtml = ejs.render(batchEntryTemplate, {
			batchIndex: batchIndex,
			entryIndex: entryIndex
		});
		entryHtmlElement.setAttribute('class', 'ach-batchentry ts-form-row');
		entryHtmlElement.setAttribute('id', 'ach-batchentry-' + batchIndex + '-' + entryIndex);
		entryHtmlElement.setAttribute('data-batchIndex', batchIndex);
		entryHtmlElement.setAttribute('data-entryIndex', entryIndex);
		//id="ach-batchentry-<?-batchIndex?>-<?-entryIndex?>"
		entryHtmlElement.innerHTML = entryhtml;
		document.querySelector('#ach-batch-entrycontainer-' + batchIndex).appendChild(entryHtmlElement);
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
	initDefaultValues();
	window.achForbject = achForbject;
	// try {

	// }
	// catch (e) {
	// 	showNotification(e);
	// }
}, false);
