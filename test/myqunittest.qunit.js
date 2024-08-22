/*global QUnit */
sap.ui.require( function() {
    "use strict";

    QUnit.module("Module A"); 

     QUnit.test("1. a basic test example", 2, function (assert) {
             assert.ok(true, "this test is fine"); 
             var value = "hello1"; 
             assert.equal(value, "hello1", "We expect value to be 'hello1'"); 
     });

});