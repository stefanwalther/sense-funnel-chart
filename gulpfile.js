'use strict';
var gulp = require( 'gulp' );
var senseGo = require( 'sense-go' );

var userConfig = senseGo.loadYml( './sense-go.yml');

senseGo.init( gulp, userConfig, function () {

} );
