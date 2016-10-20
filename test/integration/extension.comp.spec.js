/*global browser, protractor, $, expect*/

describe( "Extension rendering", function () {
	var EC = protractor.ExpectedConditions;
	var timeoutTime = 60000;

	//Should be fixed in default conf file
	browser.baseUrl = browser.getProcessedConfig().value_.baseUrl;

	//Selectors
	var renderedSelector = element( by.css( ".rendered" ) );
	var graphItem = element(by.cssContainingText("svg g", "Glenn Rhee: 28"));

	before( function () {
		// Loading login page and waiting for Url to change
		browser.get( "/index.html" );
		waitForUrlToChangeTo( /main/ );
		browser.wait( EC.visibilityOf( renderedSelector ), timeoutTime );
		browser.executeScript("app.clearAll()");
	} );

	beforeEach( function () {
		// Open fixture page and wait until rendring is done
		browser.get( "/main.html"  );
		browser.wait( EC.visibilityOf( renderedSelector ), timeoutTime );
	} );

	it( "should render default settings correctly", function() {
		return expect( browser.takeImageOf( {selector: ".rendered"} ) ).to.eventually.matchImageOf( "default" );
	} );

	it( "should render changed chartCurved layout correctly", function() {
		browser.executeScript("$('#extension').scope().model.layout.props.chartCurved=true; window.dispatchEvent(new Event('resize'));");
		browser.sleep(500);
		return expect( browser.takeImageOf( {selector: ".rendered"} ) ).to.eventually.matchImageOf( "chartCurved" );
	} );

	it( "should render changed chartBottomPinch layout correctly", function() {
		browser.executeScript("$('#extension').scope().model.layout.props.chartBottomPinch=3; window.dispatchEvent(new Event('resize'));");
		browser.sleep(500);
		return expect( browser.takeImageOf( {selector: ".rendered"} ) ).to.eventually.matchImageOf( "chartBottomPinch" );
	} );

	it( "should render changed chartInverted layout correctly", function() {
		browser.executeScript("$('#extension').scope().model.layout.props.chartInverted=true; window.dispatchEvent(new Event('resize'));");
		browser.sleep(500);
		return expect( browser.takeImageOf( {selector: ".rendered"} ) ).to.eventually.matchImageOf( "chartInverted" );
	} );

	it( "should render selections correctly", function() {
		browser.executeScript("app.clearAll()");
		graphItem.click();
		browser.sleep(500);
		return expect( browser.takeImageOf( {selector: ".rendered"} ) ).to.eventually.matchImageOf( "selected" );
	} );

} );

function waitForUrlToChangeTo(urlRegex) {
	var currentUrl;

	return browser.getCurrentUrl().then(function storeCurrentUrl(url) {
			currentUrl = url;
		}
	).then(function waitForUrlToChangeTo() {
			return browser.wait(function waitForUrlToChangeTo() {
				return browser.getCurrentUrl().then(function compareCurrentUrl( url ) {
					return urlRegex.test( url );
				});
			});
		}
	);
}
