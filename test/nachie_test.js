/*
 * nachie
 * https://github.com/yawetse/nachie
 *
 * Copyright (c) 2013 Condé Nast. All rights reserved.
 */

'use strict';

var should = require('chai').should();
// var component_navigation_header = require('../lib/nachie');

describe('nachie', function () {
	describe('#indexOf()', function () {
		it('should return -1 when the value is not present', function () {
			should.equal(-1, [1, 2, 3].indexOf(5));
			should.equal(-1, [1, 2, 3].indexOf(0));
		});
	});
});
