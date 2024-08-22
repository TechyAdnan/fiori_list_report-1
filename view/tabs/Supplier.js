sap.ui.define(["sap/ui/core/library", 'sap/uxap/BlockBase'], function (coreLibrary, BlockBase) {
	"use strict";

	var ViewType = coreLibrary.mvc.ViewType;

	var Supplier = BlockBase.extend("node.view.tabs.Supplier", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "node.view.tabs.Supplier",
					type: ViewType.XML
				},
				Expanded: {
					viewName: "node.view.tabs.Supplier",
					type: ViewType.XML
				}
			}
		}
	});
	return Supplier;
});
