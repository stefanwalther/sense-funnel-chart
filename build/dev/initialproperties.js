/*!

* sense-funnel-chart - Funnel Chart for Qlik Sense.
*
* @version v1.3.13
* @link https://github.com/stefanwalther/sense-funnel-chart
* @author Stefan Walther
* @license MIT
*/


/*global define*/
define( [], function () {
	'use strict';
	return {
		qHyperCubeDef: {
			qDimensions: [],
			qMeasures: [],

			qInitialDataFetch: [
				{
					qWidth: 3,
					qHeight: 100
				}
			]
		}
	};
} );
