define( [
		'qlik',
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
	function ( qlik, $, _, props, initProps, extensionUtils, cssContent, colorbrewer ) {
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

			var options = {
				width: $elem.width(),
				height: $elem.height(),
				isInverted: layout.props.chartInverted,
				isCurved: layout.props.chartCurved,
				bottomPinch: layout.props.chartBottomPinch,
				hoverEffects: true,
				//bottomWidth: 1 / 2,
				label: {
					fontsize: '10px'
				},
				onItemClick: funnel_onItemClick
			};

			var funnelChart = new D3Funnel( '#chart_' + layout.qInfo.qId );
			var data = transformData( layout );
			funnelChart.draw( data, options );

			function funnel_onItemClick ( d, i ) {
				//console.info( 'ONCLICK' )
				//console.log( '--prototyped funnel', d, i );
				//console.log( '--layout', layout );

				var fld = layout.qHyperCube.qDimensionInfo[0].qGroupFieldDefs[0];
				var app = qlik.currApp();
				app.field( fld ).selectValues( [d.label], true, false );
			}

		}

		/**
		 * Transforms the data from the hypercube to the format d3-funnel is expecting.
		 * @param layout
		 * @returns {*}
		 */
		function transformData ( layout ) {

			//console.log( 'hc', layout.qHyperCube );

			var data = null;
			if ( layout.qHyperCube && layout.qHyperCube.qDataPages[0].qMatrix ) {

				var data = [];

				var i = 0;
				var l = layout.qHyperCube.qDataPages[0].qMatrix.length;
				_.each( layout.qHyperCube.qDataPages[0].qMatrix, function ( row ) {

					//console.log( 'data >>', row[1] );
					var rowVals = [];
					rowVals.push( row[0].qText );
					rowVals.push( [
						row[1].qNum,
						row[1].qText
					] );
					if ( l >= 3 ) { //colorbrewer doesn't have definition for 1 or 2 values, so let d3-funnel do the work
						rowVals.push( colorbrewer.Paired[l][i] );
					}
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
