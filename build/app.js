(function() {
  "use strict";

  var createCard, createRow;

  require('./RowCardBoard');

  createCard = function(taskRecord) {
    return {
      xtype: 'rallyartifactcard',
      record: taskRecord
    };
  };

  createRow = function(story, taskRecords) {
    var cols, i, items, rec, ret, states, task, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
    items = [];
    cols = [];
    ret = {
      xtype: 'panel',
      layout: {
        type: 'hbox',
        align: 'stretch'
      },
      height: 0,
      items: cols
    };
    cols.push({
      xtype: 'panel',
      width: 200,
      cls: 'cardContainer',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      flex: 1,
      items: [
        {
          xtype: 'panel',
          title: 'Hello',
          html: story.data.Name,
          height: 50
        }
      ]
    });
    states = {
      "Defined": [],
      "In-Progress": [],
      "Completed": []
    };
    for (_i = 0, _len = taskRecords.length; _i < _len; _i++) {
      rec = taskRecords[_i];
      states[rec.data.State].push(rec);
    }
    _ref = ["Defined", "In-Progress", "Completed"];
    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
      i = _ref[_j];
      items = [];
      cols.push({
        xtype: 'panel',
        width: 200,
        layout: {
          type: 'vbox',
          align: 'stretch'
        },
        listeners: {
          render: function() {}
        },
        flex: 1,
        items: items
      });
      _ref1 = states[i];
      for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
        task = _ref1[_k];
        items.push(createCard(task));
      }
      if (items.length * 55 > ret.height) ret.height = items.length * 55;
    }
    return ret;
  };

  Ext.define('rally.TaskBoardRedux', {
    extend: 'Rally.app.App',
    layout: {
      type: 'fit'
    },
    /*
    	autoScroll: true,
    	scroll: false,
    	viewConfig: {
    		style: { overflow: 'auto', overflowX: 'hidden' }
    	},
    */

    launch: function() {
      var _this = this;
      this.taskStore = Ext.create('Rally.data.WsapiDataStore', {
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
      });
      this.storyStore = Ext.create('Rally.data.WsapiDataStore', {
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
      });
      return this.storyStore.load(function(storyRecords) {
        return _this.taskStore.load(function(taskRecords) {
          var rec, rows, storiesTaskMap, _i, _j, _k, _len, _len1, _len2, _name, _ref, _ref1, _ref2;
          rows = [];
          storiesTaskMap = {};
          for (_i = 0, _len = storyRecords.length; _i < _len; _i++) {
            rec = storyRecords[_i];
            if (storiesTaskMap[_name = rec.data._ref] == null) {
              storiesTaskMap[_name] = [];
            }
          }
          for (_j = 0, _len1 = taskRecords.length; _j < _len1; _j++) {
            rec = taskRecords[_j];
            if ((_ref = storiesTaskMap[rec.data.WorkProduct._ref]) != null) {
              _ref.push(rec);
            }
          }
          console.log(storiesTaskMap);
          for (_k = 0, _len2 = storyRecords.length; _k < _len2; _k++) {
            rec = storyRecords[_k];
            rows.push(createRow(rec, storiesTaskMap[rec.data._ref]));
          }
          _this.add({
            xtype: 'panel',
            scroll: false,
            cls: 'cardboard',
            defaults: {
              viewConfig: {
                style: {
                  overflow: 'auto',
                  overflowX: 'hidden'
                }
              },
              frame: true
            },
            layout: {
              type: 'vbox',
              align: 'stretch',
              pack: 'start'
            },
            items: rows
          });
          return (_ref1 = Ext.query(".x-box-inner")) != null ? (_ref2 = _ref1[0]) != null ? _ref2.style.overflow = "auto" : void 0 : void 0;
        });
      });
    }
  });

  Rally.launchApp('rally.TaskBoardRedux', {
    name: 'Task Board Redux'
  });

}).call(this);
