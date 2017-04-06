define( [], function () {
	'use strict';

	// ****************************************************************************************
	// Dimensions & Measures
	// ****************************************************************************************
	var dimensions = {
		uses: "dimensions",
		min: 1,
		max: 1
	};

	var measures = {
		uses: "measures",
		min: 1,
		max: 1
	};

	var sorting = {
		uses: "sorting"
	};

	// ****************************************************************************************
	// Presentation Settings
	// ****************************************************************************************

	var chartInverted = {
		ref: "props.chartInverted",
		type: "boolean",
		component: "switch",
		label: "Inverted",
		options: [
			{
				value: true,
				label: "On"
			},
			{
				value: false,
				label: "Off"
			}
		],
		defaultValue: false
	};

	var chartCurved = {
		ref: "props.chartCurved",
		type: "boolean",
		component: "switch",
		label: "Curved layout",
		options: [
			{
				value: true,
				label: "On"
			},
			{
				value: false,
				label: "Off"
			}
		],
		defaultValue: false
	};
	
	var chartDynamicArea = {
		ref: "props.chartDynamicArea",
		type: "boolean",
		component: "switch",
		label: "Dynamic Area",
				options: [
			{
				value: true,
				label: "On"
			},
			{
				value: false,
				label: "Off"
			}
		],
		defaultValue: false
	};
	
	var chartBottomPinch = {
		ref: "props.chartBottomPinch",
		type: "number",
		component: "slider",
		label: "Bottom pinch",
		min: 0,
		max: 10,
		step: 1,
		defaultValue: 0
	};
	
	// ****************************************************************************************
	// Property Panel Definition
	// ****************************************************************************************

	// Appearance Panel
	var appearancePanel = {
		uses: "settings",
		items: {
			settings: {
				type: "items",
				label: "Presentation",
				items: {
					chartInverted: chartInverted,
					chartCurved: chartCurved,
					chartDynamicArea: chartDynamicArea,
					chartBottomPinch: chartBottomPinch
				}
			}
		}
	};

	// Return values
	return {
		type: "items",
		component: "accordion",
		items: {
			dimensions: dimensions,
			measures: measures,
			sorting: sorting,
			appearance: appearancePanel

		}
	};

} );
