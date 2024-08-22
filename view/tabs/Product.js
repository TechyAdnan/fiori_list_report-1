sap.ui.define(["sap/ui/core/library", 'sap/uxap/BlockBase'], function (coreLibrary, BlockBase) {
	"use strict";

	var ViewType = coreLibrary.mvc.ViewType;

	var Product = BlockBase.extend("node.view.tabs.Product", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "node.view.tabs.Product",
					type: ViewType.XML
				},
				Expanded: {
					viewName: "node.view.tabs.Product",
					type: ViewType.XML
				}
			}
		}
	});
	return Product;
});
