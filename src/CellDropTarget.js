/*global Ext*/

"use strict";

Ext.define('Rally.ui.cardboard.CellDropTarget', {
	extend: 'Ext.dd.DropTarget',
	requires: [],

	ddGroup: "cardboard",
	dropAllowed: "cardboard",
	dropNotAllowed: "cardboard",

	column: undefined,
	row: undefined,

	constructor: function constructor(dropEl, config) {
		this.initConfig(config);
		this.callParent(arguments);
	},

	dropNotify: function dropNotify(source, e, data) {
		var allowDrop = true;


		return allowDrop;
	}
});