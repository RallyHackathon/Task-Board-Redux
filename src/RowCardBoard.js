/*global Ext*/

"use strict";

require('./HeaderRow');
require('./CardRow');

Ext.define("Rally.ui.cardboard.RowCardBoard", {
	extend: 'Ext.container.Container',

	alias: 'widget.rallyrowcardboard',
	alternateClassName: 'Rally.ui.RowCardBoard',

	requires: [
		'Ext.Array',
		'Ext.Object',
		'Rally.ui.cardboard.Row',
		'Rally.util.Ref',
		'Rally.data.QueryFilter',
		'Rally.data.WsapiDataStore'
	],
/*
	mixins: {
		recordable: 'Rally.clientmetrics.ClientMetricsRecordable'
	},
*/
	/**
	 * @property {String} layout Controls the arrangement of items for this container
	 */
	layout: {
		type: "vbox",
		align: "stretch"
	},

	/**
	 * @property {Object} defaults An object hash containing default item values.
	 */
	defaults: {
		flex: 1
	},
	/**
	 * @property {String} cls The base class applied to this object's element
	 */
	cls: "cardboard",

	constructor: function constructor(config) {
		this.initConfig(config);
		this.callParent(arguments);
	},

	initComponent: function initComponent() {
		
	}
});