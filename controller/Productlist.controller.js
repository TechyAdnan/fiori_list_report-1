sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    'sap/ui/export/Spreadsheet'
],function(Controller, MessageToast, JSONModel, Filter, FilterOperator, Fragment,MessageBox, Spreadsheet){

    
    return Controller.extend("node.controller.Productlist",{

           /* onInit: function(){
             
            },*/

            //Routing for Detail Product View   
            onPress: function(oEvent){
                var oItem = oEvent.getSource().oBindingContexts.ProductSet.sPath.substr(11);
               
                sap.ui.core.UIComponent.getRouterFor(this).navTo("productdetail",{
                    itemNumber : oItem
                });
               },

               onSelectVariant:function(oEvent){
                    console.log(oEvent);
               },

            //Search in Product Table
            onSearch: function (oEvent) {
                // add filter for search
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var filter1 = new Filter("Name", FilterOperator.Contains, sQuery);
                    var filter2 = new Filter("SupplierName", FilterOperator.Contains, sQuery);
                    var allfilter = new Filter([filter1, filter2], false)
                    aFilters.push(allfilter);
                }
    
                // update list binding
                var oTable = this.byId("table");
                var oBinding = oTable.getBinding("items");
                oBinding.filter(aFilters, "Application");
            },

            //Filters
            onGo: function(){
               console.log(this.getView().getModel("ProductSet"));
                var aFilters = [];
                var sQuery1 = this.byId("filter_cat").getValue();
                var sQuery2 = this.byId("filter_supplier").getValue();
                var filter1 = new Filter("Category", FilterOperator.Contains, sQuery1);
                var filter2 = new Filter("SupplierName", FilterOperator.Contains, sQuery2);
                var allfilter = new Filter([filter1, filter2], true)
                 aFilters.push(allfilter);
              
    
                // update list binding
                var oTable = this.byId("table");
                var oBinding = oTable.getBinding("items");
                oBinding.filter(aFilters, "Application");
              
            },

            onValueHelpSupplier: function(oEvent){
                oView = this.getView();

                if (!this.SupplierVHDialog) {
                    this.SupplierVHDialog = Fragment.load({
                                                    id: oView.getId(),
                                                    name: "node.view.dialog.SupplierVHDialog",
                                                    controller: this
                                                    }).then(function (oSupplierVHDialog) {
                                                            oView.addDependent(oSupplierVHDialog);
                                                            return oSupplierVHDialog;
                                                            });
                                            }
                                
                     this.SupplierVHDialog.then(function (oSupplierVHDialog){
                                                oSupplierVHDialog.open();
                                            });
            },
            onVHSelectSupplier: function(oEvent){
                var oSelectedItem = oEvent.getParameter("selectedItem");
                this.byId("filter_supplier").setValue(oSelectedItem.getDescription());
            },

            //Clear Filter
            onClear: function(){
                
                this.byId("filter_cat").setValue(null);
                var aFilters = [];
                var oTable = this.byId("table");
                var oBinding = oTable.getBinding("items");
                oBinding.filter(aFilters,"Application");
                
            },

            //Create New Product Records
            onCreate : function(oEvent) {
				oView = this.getView();

			if (!this.CreateDialog) {
				this.CreateDialog = Fragment.load({
												id: oView.getId(),
												name: "node.view.dialog.CreateDialog",
												controller: this
												}).then(function (oCreateDialog) {
														oView.addDependent(oCreateDialog);
														return oCreateDialog;
														});
										}
                            
                 this.CreateDialog.then(function (oCreateDialog){
                                            oCreateDialog.open();
                                        });
                
                },

        //Wizard Next Action
         onNextCreate : function(){
            this._oWizard = this.byId( "CreateProductWizard");
            this._oWizard.nextStep();
            /*if (this._oWizard.getProgressStep().getValidated()) {
				
			}*/
           },

           //Wizard Button Visibility Handling
           handleButton : function(){
            this.byId("next_btn").setProperty("visible",true);
            this.byId("save_btn").setProperty("visible",false);
           }
           ,
           DimensionDetailsActivate: function(){
                this.byId("next_btn").setProperty("visible",false);
                this.byId("review_btn").setProperty("visible",true);
                
           },
           ReviewDetailsActivate: function(){
            this.byId("review_btn").setProperty("visible",false);
            this.byId("save_btn").setProperty("visible",true);
       },

       //Wizard Review Product Details
       onReviewCreate : function(){
        this.byId("review_create_productid").setProperty("text",this.byId("create_productid").getValue());
        this.byId("review_create_name").setProperty("text",this.byId("create_name").getValue());
        this.byId("review_create_cat").setProperty("value",this.byId("create_cat").getValue());
        this.byId("review_create_Description").setProperty("value",this.byId("create_Description").getValue());
        this.byId("review_create_supplierid").setProperty("text",this.byId("create_supplierid").getValue());
        this.byId("review_create_supplier_name").setProperty("text",this.byId("create_supplier_name").getValue());
        this.byId("review_create_typecode").setProperty("text",this.byId("create_typecode").getValue()),
        this.byId("review_create_weight_measure").setProperty("text",this.byId("create_weight_measure").getValue());
        this.byId("review_create_weight_unit").setProperty("value",this.byId("create_weight_unit").getValue());
        this.byId("review_create_price").setProperty("text",this.byId("create_price").getValue());
        this.byId("review_create_currencycode").setProperty("value",this.byId("create_currencycode").getValue());
        this.byId("review_create_width").setProperty("text",this.byId("create_width").getValue());
        this.byId("review_create_depth").setProperty("text",this.byId("create_depth").getValue());
        this.byId("review_create_Height").setProperty("text",this.byId("create_Height").getValue());
        this.byId("review_create_dim_unit").setProperty("value", this.byId("create_dim_unit").getValue());
        this._oWizard = this.byId( "CreateProductWizard");
        this._oWizard.nextStep();
                },
    

    //Wizard Save New Product
     onSaveCreate : function(){
        var oModel = this.getView().getModel("ProductSet"),
        oData = oModel.getData(),
        oTemplateEntry = oData.d.results[0];
     
    // Add new template entry to the beginning
    
    oData.d.results.unshift({
        "ProductID": this.byId("create_productid").getValue() ,
        "Name": this.byId("create_name").getValue() ,
        "Category":this.byId("create_cat").getValue(),
        "Description":this.byId("create_Description").getValue(),
        "SupplierID": this.byId("create_supplierid").getValue(),
        "SupplierName":  this.byId("create_supplier_name").getValue(),
        "TypeCode":this.byId("create_typecode").getValue(),
        "WeightMeasure":this.byId("create_weight_measure").getValue() ,
        "WeightUnit":this.byId("create_weight_unit").getValue() ,
        "Price": this.byId("create_price").getValue(),
        "CurrencyCode": this.byId("create_currencycode").getValue(),
        "Widht": this.byId("create_width").getValue() ,
        "Depth": this.byId("create_depth").getValue(),
        "Height": this.byId("create_Height").getValue(),
        "DimUnit": this.byId("create_dim_unit").getValue()
    });

    oModel.setData(oData);
    this._oWizard.discardProgress(this._oWizard.getSteps()[0]);
    this.handleButton();
    this.resetWizard();
    this.onCloseCreate();
    MessageBox.success("Product have been created ",{
        actions: [ MessageBox.Action.OK]
    });
                },

            //Wizard Reset after closing
            resetWizard: function(){

                        this.byId("create_productid").setProperty("value",null);
                        this.byId("create_name").setProperty("value",null);
                        this.byId("create_cat").setProperty("value",null);
                        this.byId("create_Description").setProperty("value",null);
                        this.byId("create_supplierid").setProperty("value",null);
                        this.byId("create_supplier_name").setProperty("value",null);
                        this.byId("create_typecode").setProperty("value",null);
                        this.byId("create_weight_measure").setProperty("value",null);
                        this.byId("create_weight_unit").setProperty("value",null);
                        this.byId("create_price").setProperty("value",null);
                        this.byId("create_currencycode").setProperty("value",null);
                        this.byId("create_width").setProperty("value",null);
                        this.byId("create_depth").setProperty("value",null);
                        this.byId("create_Height").setProperty("value",null);
                        this.byId("create_dim_unit").setProperty("value",null);
                        this.byId("review_create_productid").setProperty("text",null);
                        this.byId("review_create_name").setProperty("text",null);
                        this.byId("review_create_cat").setProperty("value",null);
                        this.byId("review_create_Description").setProperty("value",null);
                        this.byId("review_create_supplierid").setProperty("text",null);
                        this.byId("review_create_supplier_name").setProperty("text",null);
                        this.byId("review_create_typecode").setProperty("text",null);
                        this.byId("review_create_weight_measure").setProperty("text",null);
                        this.byId("review_create_weight_unit").setProperty("value",null);
                        this.byId("review_create_price").setProperty("text",null);
                        this.byId("review_create_currencycode").setProperty("value",null);
                        this.byId("review_create_width").setProperty("text",null);
                        this.byId("review_create_depth").setProperty("text",null);
                        this.byId("review_create_Height").setProperty("text",null);
                        this.byId("review_create_dim_unit").setProperty("value",null);


                    },

            //Wizard Close
            onCloseCreate : function(){
                this.resetWizard();
                this.byId("CreateProduct").close();
                                            
            },
            

            //Modify Product Dialog
            onModify : function(oEvent) {
				oView = this.getView();

			if (!this.ModifyDialog) {
				this.ModifyDialog = Fragment.load({
												id: oView.getId(),
												name: "node.view.dialog.ModifyDialog",
												controller: this
												}).then(function (oModifyDialog) {
														oView.addDependent(oModifyDialog);
                                                        var tb = oView.byId("table");
                                                        var rowid = tb.getSelectedItem().oBindingContexts.ProductSet.sPath.substr(11);
                                                        oModifyDialog.bindElement("ProductSet>/d/results/"+rowid);
                                                        console.log(oModifyDialog);
														return oModifyDialog;
														});
										}
                            
                 this.ModifyDialog.then(function (oModifyDialog){
                                            oModifyDialog.open();
                                        });
                
                },

                //Modify Save
                onSaveModify : function(){
                    var tb = this.getView().byId("table");
                    var rowid = tb.indexOfItem(tb.getSelectedItem());
                    var sPath = "/d/results/"+rowid;
                    this.getView().getModel("ProductSet").setProperty(sPath +"/ProductID", this.byId("modify_productid").getValue());
                    this.getView().getModel("ProductSet").setProperty(sPath +"/Name", this.byId("modify_name").getValue());
                    this.getView().getModel("ProductSet").setProperty(sPath +"/Category", this.byId("modify_cat").getValue());
                    this.getView().getModel("ProductSet").setProperty(sPath +"/Description", this.byId("modify_Description").getValue());
                    this.getView().getModel("ProductSet").setProperty(sPath +"/SupplierID", this.byId("modify_supplierid").getValue());
                    this.getView().getModel("ProductSet").setProperty(sPath +"/SupplierName", this.byId("modify_supplier_name").getValue());
                    this.getView().getModel("ProductSet").setProperty(sPath +"/TypeCode", this.byId("modify_typecode").getValue());
                    this.getView().getModel("ProductSet").setProperty(sPath +"/WeightMeasure", this.byId("modify_weight_measure").getValue());
                    this.getView().getModel("ProductSet").setProperty(sPath +"/WeightUnit", this.byId("modify_weight_unit").getValue());
                    this.getView().getModel("ProductSet").setProperty(sPath +"/Price", this.byId("modify_price").getValue());
                    this.getView().getModel("ProductSet").setProperty(sPath +"/CurrencyCode", this.byId("modify_currencycode").getValue());
                    this.getView().getModel("ProductSet").setProperty(sPath +"/Width", this.byId("modify_width").getValue());
                    this.getView().getModel("ProductSet").setProperty(sPath +"/Depth", this.byId("modify_depth").getValue());
                    this.getView().getModel("ProductSet").setProperty(sPath +"/Height", this.byId("modify_Height").getValue());
                    this.getView().getModel("ProductSet").setProperty(sPath +"/DimUnit", this.byId("modify_dim_unit").getValue());
                   
                    this.byId("ModifyProduct").close();
                    MessageBox.success("Product have been Modified ",{
                        actions: [ MessageBox.Action.OK]
                    });
                },

               

            //Modify Close
            onCloseModify : function(){
                    
                     this.byId("ModifyProduct").close();
            },

            //Settings Dialog
            onSettings : function(oEvent) {
				oView = this.getView();

			if (!this.SettingsDialog) {
				this.SettingsDialog = Fragment.load({
												id: oView.getId(),
												name: "node.view.dialog.SettingsDialog",
												controller: this
												}).then(function (oSettingsDialog) {
														oView.addDependent(oSettingsDialog);
														return oSettingsDialog;
														});
										}
                            
                 this.SettingsDialog.then(function (oSettingsDialog){
                                                                         
                                            oSettingsDialog.open();
                                        });
                 
                },

                //Settings Dialog Close
                    onCloseSettings : function(){   
                    this.byId("settings").close();
                },

                //Settings Apply Changes
                onApplySettings: function(){
                  
                    var columnstrue = [];
                    columnstrue = this.byId("columslist").getItems(true);
                    for(var i=0; i<12 ; i++){
                            this.getView().getModel("Columns").setProperty("/Items/"+i+"/visible",columnstrue[i].mProperties.selected );
                    }
                    var theme = this.byId("theme_btn").mAssociations.selectedItem.substr(12);
                    if(theme==="light_theme"){
                        sap.ui.getCore().applyTheme("sap_fiori_3");
                    }
                    else if(theme==="dark_theme"){
                        sap.ui.getCore().applyTheme("sap_fiori_3_dark");
                    }
                    this.onCloseSettings();
                },
                
            //Settings Dialog Master Navigation
           onNav01: function(){
            this.byId("SplitAppSettings").to(this.createId("columns_page01"));
           },
           onNav02: function(){
            this.byId("SplitAppSettings").to(this.createId("columns_page02"));
           },
           onNav03: function(){
            this.byId("SplitAppSettings").to(this.createId("columns_page03"));
           },
           
           //Delete Row
           onDelete: function () {
                var tb = this.getView().byId("table");
                var rowid = tb.getSelectedItem().oBindingContexts.ProductSet.sPath.substr(11);
                var productid = tb.getSelectedItem().mAggregations.cells[0].mProperties.text;

                var productname = tb.getSelectedItem().mAggregations.cells[1].mProperties.text;
                MessageBox.warning("Delete Product "+productid+": "+productname,{
                    actions: ["Delete", MessageBox.Action.CANCEL],
                    onClose: function (oAction) {
                        if (oAction === "Delete") {
                            var oModel = this.getView().getModel("ProductSet"),
                                oData = oModel.getData()
                                oData.d.results.splice(rowid,1);
                                oModel.setData(oData);
                            this.byId("table").removeSelections(true);
                            this.byId("CreateButton").setProperty("enabled",true);
                            this.byId("ModifyButton").setProperty("enabled",false);
                            this.byId("DeleteButton").setProperty("enabled",false);
                            this.byId("SettingsButton").setProperty("enabled",true);
                            this.byId("MenuButton").setProperty("enabled",true);
                        }
                    }.bind(this)
                });
            },

            //Row Selection based UI Changes
            onselectionChange : function(oEvent) {
                if (oEvent.getParameter("selected") == true) {
                   this.byId("CreateButton").setProperty("enabled",false);
                   this.byId("ModifyButton").setProperty("enabled",true);
                   this.byId("DeleteButton").setProperty("enabled",true);
                   this.byId("SettingsButton").setProperty("enabled",false);
                   this.byId("MenuButton").setProperty("enabled",false);
                } else {
                    this.byId("CreateButton").setProperty("enabled",true);
                    this.byId("ModifyButton").setProperty("enabled",false);
                    this.byId("DeleteButton").setProperty("enabled",false);
                    this.byId("SettingsButton").setProperty("enabled",true);
                    this.byId("MenuButton").setProperty("enabled",true);
                }
            },

            //Export xls metedata
            createColumnConfig: function() {
                var aCols = [];
    
                aCols.push({
                    label: 'Product ID',
                    property: 'ProductID',
                    type: 'sap.ui.model.type.String'
                });
    
                aCols.push({
                    label: 'Product Name',
                    type: 'sap.ui.model.type.String',
                    property: 'Name',
                    scale: 0
                });
    
                aCols.push({
                    label:"Category",
                    property: 'Category',
                    type: 'sap.ui.model.type.String'
                });
    
                aCols.push({
                    label:"Description",
                    property: 'Description',
                    type: 'sap.ui.model.type.String'
                });
    
                aCols.push({
                    label:"Supplier ID",
                    property: 'SupplierID',
                    type: 'sap.ui.model.type.String'
                });
    
                aCols.push({
                    label:"Supplier Name",
                    property: 'SupplierName',
                    type: 'sap.ui.model.type.String'
                });
    
                aCols.push({
                    label:"Type Code",
                    property: 'TypeCode',
                    type: 'sap.ui.model.type.String'
                });

                aCols.push({
                    label:"Weight",
                    property: ['WeightMeasure','WeightUnit'],
                    type: 'sap.ui.model.type.Unit',
                    template: '{0},{1}'
                });

                aCols.push({
                    label:"Price",
                    property: ['Price','CurrencyCode'],
                    type: 'sap.ui.model.type.Currency',
                    template:'{0},{1}'
                });

                aCols.push({
                    label:"Currency",
                    property: 'CurrencyCode',
                    type: 'sap.ui.model.type.String'
                });


                aCols.push({
                    label:"Width",
                    property: ['Width','DimUnit'],
                    type: 'sap.ui.model.type.Unit',
                    template:'{0},{1}'
                });
    
                aCols.push({
                    label:"Depth",
                    property: ['Depth','DimUnit'],
                    type: 'sap.ui.model.type.Unit',
                    template:'{0},{1}'
                });

                aCols.push({
                    label:"Height",
                    property: ['Height','DimUnit'],
                    type: 'sap.ui.model.type.Unit',
                    template:'{0},{1}'
                });
    
                return aCols;
            },
    

            //Export xls
            onExport: function() {
                var aCols, oRowBinding, oSettings, oSheet, oTable;
    
                if (!this._oTable) {
                    this._oTable = this.byId('table');
                }
    
                oTable = this._oTable;
                oRowBinding = oTable.getBinding('items');
                aCols = this.createColumnConfig();
    
                oSettings = {
                    workbook: {
                        columns: aCols,
                        hierarchyLevel: 'Level'
                    },
                    dataSource: oRowBinding,
                    fileName: 'Product List.xlsx',
                    worker: false // We need to disable worker because we are using a MockServer as OData Service
                };
    
                oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function() {
                    oSheet.destroy();
                });
            }
            
        
           

    });

});