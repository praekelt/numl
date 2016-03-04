var dedent = require('dedent-js');
var reverse = require('../numl').reverse;


function str(s) {
	return dedent(s) + '\n';
}


describe("numl.reverse", function() {
	it("should parse dialogue titles", function() {
		reverse({
			title: 'foo',
			sequences: []
		})
		.should.equal(str`
		# foo
		`);
	});

	it("should parse sequence titles", function() {
		reverse({
			title: '_',
			sequences: [{
				title: 'foo',
				blocks: []
			}, {
				title: 'bar',
				blocks: []
			}]
		})
		.should.equal(str`
		# _

		## foo

		## bar
		`);
	});

	it("should parse block titles", function() {
		reverse({
			title: '_',
			sequences: [{
				title: '_',
				blocks: [{
					title: 'foo'
				}, {
					title: 'bar'
				}]
			}]
		})
		.should.equal(str`
		# _

		## _

		### foo

		### bar
		`);
	});
});
