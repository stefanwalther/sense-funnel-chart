define( [
		'jquery',
		'underscore',
		'./properties',
		'./initialproperties',
		'./lib/js/extensionUtils',
		'text!./lib/css/style.css',
		'./lib/external/colorbrewer/colorbrewer',

		// no return value
		'./lib/external/d3/d3.min',
		'./lib/external/d3-funnel/d3-funnel'
	],
	function ( $, _, props, initProps, extensionUtils, cssContent, colorbrewer ) {
		'use strict';
		extensionUtils.addStyleToHeader( cssContent );

		function ensureTarget ( $elem, layout ) {
			$elem.addClass( 'container' );
			$elem.empty();
			var $target = $( document.createElement( 'div' ) );
			$target.attr( 'id', 'chart_' + layout.qInfo.qId );
			$target.addClass( 'chart' );
			$elem.append( $target );
		}

		function render ( $elem, layout ) {
			ensureTarget( $elem, layout );

			//console.info( 'layout', layout );

			var options = {
				width: $elem.width(),
				height: $elem.height(),
				isInverted: layout.props.chartInverted,
				isCurved: layout.props.chartCurved,
				bottomPinch: layout.props.chartBottomPinch,
				//bottomWidth: 1 / 2,
				label: {
					fontsize: '10px'
				}
			};

			var chart = new D3Funnel( '#chart_' + layout.qInfo.qId );
			var data = getData( layout );
			chart.draw( data, options );
		}

		function getData ( layout ) {

			var data = null;
			if ( layout.qHyperCube && layout.qHyperCube.qDataPages[0].qMatrix ) {

				var data = [];

				var i = 0;
				var l = layout.qHyperCube.qDataPages[0].qMatrix.length;
				_.each( layout.qHyperCube.qDataPages[0].qMatrix, function ( row ) {

					var rowVals = [];
					rowVals.push( row[0].qText );
					rowVals.push( row[1].qNum );
					rowVals.push( colorbrewer.Paired[l][i] );
					data.push( rowVals );
					i++;
				} );
			}
			return data;
		}

		return {

			definition: props,
			initialProperties: initProps,
			snapshot: {canTakeSnapshot: true},
			resize: function ( $element, layout ) {
				render( $element, layout );
			},
			paint: function ( $element, layout ) {
				render( $element, layout );
			}
		};

	} );
