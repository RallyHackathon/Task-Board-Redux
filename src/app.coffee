"use strict"

createCard = (taskRecord) ->
	{
		xtype: 'rallyartifactcard',
		record: taskRecord
		#cls: 'story'
		#title: 'Hello',
		#html: taskRecord.data.Name,
		#height: 50,
		#draggable: true
	}

createRow = (story, taskRecords) ->
	items = []
	cols = []

	ret = {
		xtype: 'panel',
		layout: {
			type: 'hbox'
			align: 'stretch'
		},
		height: 0,
		items: cols
	}

	cols.push {
		xtype: 'panel',
		#height: 100,
		width: 200,
		cls: 'cardContainer',
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		flex: 1,
		items: [{
			xtype: 'panel',
			title: 'Hello',
			html: story.data.Name,
			height: 50
		}]
	}

	states = { "Defined": [], "In-Progress": [], "Completed": [] }
	states[rec.data.State].push(rec) for rec in taskRecords

	for i in ["Defined", "In-Progress", "Completed"]
		items = []
		cols.push {
			xtype: 'panel',
			#height: 100,
			width: 200,
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			listeners: {
				render: () ->

			}
			flex: 1,
			items: items
		}
		items.push(createCard(task)) for task in states[i]
		ret.height = items.length * 55 if items.length * 55 > ret.height


	return ret

Ext.define 'rally.TaskBoardRedux',
	extend: 'Rally.app.App'

	layout: {
		type: 'fit'
	},
	###
	autoScroll: true,
	scroll: false,
	viewConfig: {
		style: { overflow: 'auto', overflowX: 'hidden' }
	},
	###

	launch: () ->
		@taskStore = Ext.create 'Rally.data.WsapiDataStore', {
			model: 'Task',
			fetch: true,
			autoLoad: false,
			filters: [
				{
					property: 'Iteration.State',
					operator: '=',
					value: 'Committed'
				}
			]
		}

		@storyStore = Ext.create 'Rally.data.WsapiDataStore', {
			model: 'Story',
			fetch: true,
			autoLoad: false,
			filters: [
				{
					property: 'Iteration.State',
					operator: '=',
					value: 'Committed'
				}
			]
		}

		
		@storyStore.load((storyRecords) =>
			@taskStore.load((taskRecords) =>

				rows = []
				storiesTaskMap = {}

				for rec in storyRecords
					storiesTaskMap[rec.data._ref] ?= []

				for rec in taskRecords
					storiesTaskMap[rec.data.WorkProduct._ref]?.push(rec)

				console.log storiesTaskMap

				
				for rec in storyRecords
					rows.push(createRow(rec, storiesTaskMap[rec.data._ref]))
				

				@add {
					xtype: 'panel',
					scroll: false,
					cls: 'cardboard',
					defaults: {
						viewConfig: {
							style: { overflow: 'auto', overflowX: 'hidden' }
						},
						frame: true
					},
					layout: {
						type: 'vbox',
						align: 'stretch',
						pack: 'start'
					},
					items: rows
				}

				# Take that Ext scrolling
				Ext.query(".x-box-inner")?[0]?.style.overflow = "auto"

			)
		)


Rally.launchApp 'rally.TaskBoardRedux', {
	name: 'Task Board Redux'
}
