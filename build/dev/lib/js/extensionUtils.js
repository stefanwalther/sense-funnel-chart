/*!

* sense-funnel-chart - Funnel Chart for Qlik Sense.
*
* @version v1.3.13
* @link https://github.com/stefanwalther/sense-funnel-chart
* @author Stefan Walther
* @license MIT
*/


define( [
	'jquery',
	'underscore'
], function ( $ /*, _*/ ) {
	'use strict';

	return {

		/**
		 * Add a style to the document's header.
		 * @param cssContent (String)
		 */
		addStyleToHeader: function ( cssContent ) {
			$( "<style>" ).html( cssContent ).appendTo( "head" );
		}

	};

} );
