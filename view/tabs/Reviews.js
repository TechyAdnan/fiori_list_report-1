sap.ui.define(["sap/ui/core/library", 'sap/uxap/BlockBase'], function (coreLibrary, BlockBase) {
	"use strict";

	var ViewType = coreLibrary.mvc.ViewType;

	var Reviews = BlockBase.extend("node.view.tabs.Reviews", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "node.view.tabs.Reviews",
					type: ViewType.XML
				},
				Expanded: {
					viewName: "node.view.tabs.Reviews",
					type: ViewType.XML
				}
			}
		}
	});
	return Reviews;
});
