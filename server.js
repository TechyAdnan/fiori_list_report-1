const express = require('express')
const app = express()
const port = 3001

app.use(express.static('C:/Users/mafzaal/OneDrive - Capgemini/Documents/SAPUI5/fiori_list_report 1'));


app.listen(port)