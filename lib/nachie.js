/*
 * nachie
 * https://github.com/yawetse/nachie
 *
 * Copyright (c) 2014 Yaw Joseph Etse. All rights reserved.
 */
'use strict';

var extend = require('util-extend'),
	classie = require('classie'),
	events = require('events'),
	util = require('util'),
	detectCSS = require('detectcss'),
	support,
	support3d,
	animEndEventNames = {
		'MozAnimation': 'animationend',
		'WebkitAnimation': 'webkitAnimationEnd',
		'OAnimation': 'oAnimationEnd',
		'msAnimation': 'MSAnimationEnd',
		'animation': 'animationend'
	},
	animEndEventName;

/**
 * A module that represents a StylieNotifications object, a componentTab is a page composition tool.
 * @{@link https://github.com/yawetse/nachie}
 * @author Yaw Joseph Etse
 * @copyright Copyright (c) 2014 Typesettin. All rights reserved.
 * @license MIT
 * @constructor StylieNotifications
 * @requires module:util-extent
 * @requires module:util
 * @requires module:events
 * @param {object} el element of tab container
 * @param {object} options configuration options
 */
var StylieNotifications = function (options) {
	events.EventEmitter.call(this);

	// this.el = el;
	this.options = extend(this.options, options);
	// console.log(this.options);
	this._init();
	this.show = this._show;
	this.dismiss = this._dismiss;
};

util.inherits(StylieNotifications, events.EventEmitter);

/** module default configuration */
StylieNotifications.prototype.options = {
	// element to which the notification will be appended
	// defaults to the document.body
	wrapper: document.querySelector('body'),
	// the message
	message: 'yo!',
	// layout type: growl|attached|bar|other
	layout: 'growl',
	// effects for the specified layout:
	// for bar: slidetop|slide|exploader
	// for growl layout: scale|slide|genie|jelly
	// for attached layout: flip|bouncyflip
	// for other layout: boxspinner|cornerexpand|loadingcircle|thumbslider
	// ...
	effect: 'slide',
	// notice, warning, error, success
	// will add class ts-ns-type-warning, ts-ns-type-error or ts-ns-type-success
	type: 'error',
	// if the user doesn´t close the notification then we remove it 
	// after the following time
	ttl: 6000,
	// callbacks
	onClose: function () {
		return false;
	},
	onOpen: function () {
		return false;
	}
};
/**
 * initializes notifications and shows current tab.
 * @emits notificationsInitialized
 */
StylieNotifications.prototype._init = function () {
	support = detectCSS.prefixed('animation');
	support3d = detectCSS.prefixed('perspective');
	animEndEventName = animEndEventNames[detectCSS.prefixed('animation')];

	// create HTML structure
	this.ntf = document.createElement('div');
	this.ntf.className = 'ts-ns-box ts-ns-' + this.options.layout + ' ts-ns-effect-' + this.options.effect + ' ts-ns-type-' + this.options.type;
	var strinner = '<div class="ts-ns-box-inner">';
	strinner += this.options.message;
	strinner += '</div>';
	strinner += '<span class="ts-ns-close"></span></div>';
	this.ntf.innerHTML = strinner;
	// console.log(this.options);

	// append to body or the element specified in options.wrapper
	this.options.wrapper = (this.options.wrapper) ? this.options.wrapper : document.querySelector('body');
	this.options.wrapper.insertBefore(this.ntf, this.options.wrapper.firstChild);

	// dismiss after [options.ttl]ms
	var self = this;
	this.dismissttl = (this.options.ttl) ? setTimeout(function () {
		if (self.active) {
			self.dismiss();
		}
	}, this.options.ttl) : false;

	// init events
	this._initEvents();
	this.emit('notificationsInitialized');
};

/**
 * handle tab click events.
 */
StylieNotifications.prototype._initEvents = function () {
	var self = this;
	// dismiss notification
	this.ntf.querySelector('.ts-ns-close').addEventListener('click', function () {
		self.dismiss();
	});
	this.emit('notificationsEventsInitialized');
};

/**
 * Hides a modal component.
 * @param {string} modal name
 * @emits showNotification
 */
StylieNotifications.prototype._dismiss = function () {
	var self = this;
	this.active = false;
	if (this.options.ttl) {
		clearTimeout(this.dismissttl);
	}
	classie.remove(this.ntf, 'ts-ns-show');
	setTimeout(function () {
		classie.add(self.ntf, 'ts-ns-hide');

		// callback
		self.options.onClose();
	}, 25);

	// after animation ends remove ntf from the DOM
	var onEndAnimationFn = function (ev) {
		if (support) {
			if (ev.target !== self.ntf) {
				return false;
			}
			else {
				this.removeEventListener(animEndEventName, onEndAnimationFn);
			}
		}
		self.options.wrapper.removeChild(this);
	};

	if (support) {
		this.ntf.addEventListener(animEndEventName, onEndAnimationFn);
	}
	else {
		onEndAnimationFn();
	}

	this.emit('dismissNotification', this.ntf);
};

/**
 * Shows a modal component.
 * @param {string} modal name
 * @emits showNotification
 */
StylieNotifications.prototype._show = function () {
	this.active = true;
	classie.remove(this.ntf, 'ts-ns-hide');
	classie.add(this.ntf, 'ts-ns-show');
	this.options.onOpen();

	this.emit('showNotification', this.ntf);
};
module.exports = StylieNotifications;
