/*global Ext*/
"use strict";

require('./CellDropTarget');

/**
 *   The default column type for a {@link Rally.ui.cardboard.CardBoard} Cardboard. In general, this class will not be created directly.
 */
Ext.define('Rally.ui.cardboard.Row', {
	requires: [
		'Rally.ui.cardboard.CellDropTarget',
		'Ext.dd.DragSource',
		'Ext.dd.StatusProxy',
		'Rally.ui.cardboard.Card',
		'Rally.util.Ref'
	],
	extend: "Ext.Container",
	/**
	 * @property {String} cls The base class applied to this object's element
	 */
	cls: 'row',
	alias: 'widget.rallycardboardrow',

	constructor: function constructor(config) {

	},

	initComponent: function initComponent() {

	}
});
