define( [
		'qlik',
		'jquery',
		'core.utils/theme',
		'./properties',
		'./initialproperties',
		'./lib/js/extensionUtils',
		'text!./lib/css/main.css',

		// no return value
		'./lib/external/d3/d3.min',
		'./lib/external/d3-funnel/d3-funnel'
	],
	function ( qlik, $, Theme, props, initProps, extensionUtils, cssContent ) {
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
				
				///////////////// Colors /////////////////
				
				var maxDim = layout.qHyperCube.qDimensionInfo[0].qCardinal;
				
				// use the Qlik Sense Theme.colorSchemes
				var colorScale;
				switch(maxDim){
					case 1: colorScale = Theme.colorSchemes.qualitativeScales[0].scale[0];
					break;
					case 2: colorScale = Theme.colorSchemes.qualitativeScales[0].scale[1];
					break;
					case 3: colorScale = Theme.colorSchemes.qualitativeScales[0].scale[2];
					break;
					case 4: colorScale = Theme.colorSchemes.qualitativeScales[0].scale[3];
					break;
					case 5: colorScale = Theme.colorSchemes.qualitativeScales[0].scale[4];
					break;
					case 6: colorScale = Theme.colorSchemes.qualitativeScales[0].scale[5];
					break;
					case 7: colorScale = Theme.colorSchemes.qualitativeScales[0].scale[6];
					break;
					case 8: colorScale = Theme.colorSchemes.qualitativeScales[0].scale[7];
					break;
					default : colorScale = Theme.colorSchemes.qualitativeScales[1].scale;
				}
				
				///////////////// Colors /////////////////
				
				layout.qHyperCube.qDataPages[0].qMatrix.forEach( function ( row ) {

					//console.log( 'data >>', row[1] );
					var rowVals = [];
					rowVals.push( row[0].qText );
					rowVals.push( [
						row[1].qNum,
						row[1].qText
					] );
					
					// persistent color
					if(layout.props.chartPersistentColor)
						rowVals.push( colorScale[row[0].qElemNumber] );
					else{
						rowVals.push( colorScale[i] );
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
