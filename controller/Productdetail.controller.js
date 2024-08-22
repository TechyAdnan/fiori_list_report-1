sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox"
],function(Controller,MessageToast,Fragment,MessageBox){
    "use strict";
    return Controller.extend("node.controller.Productdetail",{
      
      
        onInit: function () {
		
			sap.ui.core.UIComponent.getRouterFor(this).getRoute("productdetail").attachMatched(this.onRouteMatched,this);

		},
        onRouteMatched: function(oEvent){

            var oArgs, oView;
          
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
            
			oView.bindElement({ 
				path : "ProductSet>/d/results/"+ oArgs.itemNumber +""
			});
	
        }
    });
});