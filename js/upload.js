/*
<!--  
 * Copyright 2017 Waryam Soomro
 * Licensed under MIT 
-->
*/

const fs = require("fs")
const Datastore = require("nedb")
const {remote,ipcRenderer} = require('electron')
const electronRemote = remote
const dialog = electronRemote.dialog
const {Menu, MenuItem} = electronRemote
const thisWindow = electronRemote.getCurrentWindow()

const menu = new Menu()
menu.append(new MenuItem({
    label: 'File', submenu:[
        new MenuItem({
            label:"Exit",click(){
                thisWindow.close()
            }})                            ]
}))

menu.append(new MenuItem({
    label: 'Help', submenu:[
        new MenuItem({
            label:"About",click(){
                alert("Developed By Waryam Soomro\nEmail: iamwasoomro@gmail.com")
            }})                            ]
}))

Menu.setApplicationMenu(menu)



const noFields = ["comment","consider","subset","xref"]
const singularFields = ["id","name","namespace","def"]


//Regular Expression to get a single field name and value
var fieldReg = /([^:]+):\s+(.+)/i


let termGenerator
let intervalRef
let termIterator
let iterFunc
let db


document.getElementById("uploadButton").onclick = () => {

    const goPath = dialog.showOpenDialog(thisWindow,
        {
            title:"Open Gene Ontology File",
            properties: ['openFile']
        })

    if (goPath){

        
        document.getElementById("uploadsection").style.display="none"
        db = new Datastore({filename:"go.json",autoload:true})
        termIterator = termGenerator( goPath[0] );
        intervalRef = setInterval(iterFunc,20,termIterator)
     
    }
}

const definedValue = (arr , val) => {
    if (typeof arr[val] == "undefined"){
        arr[val] = (val == "relationship")?{}:[]
    }
}


iterFunc = function(){
    var iteratorValue = termIterator.next()

    if(!(iteratorValue.done)){
        
        db.insert(iteratorValue.value)
        
    }
    else{

        db.ensureIndex({ fieldName: 'id' });
        clearInterval(intervalRef)

        setTimeout( () => {
            ipcRenderer.send('db-complete', 'ping')
            alert("Parsing is Complete,Restart Application to Get Started")
        },100)
        
    }

}

termGenerator = function* (goPath) {

        //Get Every Entry
        var goData = fs.readFileSync(goPath).toString()
        const fileProgress = document.getElementById("fileprogress")
        fileProgress.parentElement.parentElement.style.display="block"

        //Regular Expression to get Go Entry
        var entryReg = /id:\sGO:\d+(\n\w|[^\n])+\n\n/gmi
        var databaseEntry, fieldName,
        fieldValue, currentEntry, isObsolute
        const fileLength = 100/goData.length

        //Save eachStorSize Enteries Once
        const eachStoreSize = 30
        var eachStore = []

        while(  ( currentEntry = entryReg.exec(goData) ) !== null){
            
                    //Save Entry only if not obsolute
                
                    currentEntry = currentEntry[0].trim().split("\n")
                    databaseEntry = {}
            
                    for(var i in currentEntry){
            
            
                        i = fieldReg.exec( currentEntry[i] )
                        fieldName = i[1]
                        fieldValue = i[2]
                        i = null
            
                        if (fieldName == "is_obsolete"){
                            databaseEntry = null;
                            break;
                        }
            
                        if ( noFields.indexOf(fieldName)<0 ){
            
                            if (singularFields.indexOf(fieldName)<0){
            
                                //fields with more than one value
                                if (fieldName == "is_a"){
            
                                    definedValue(databaseEntry,"relationship")
                                    definedValue(databaseEntry["relationship"],"is_a")
                                    databaseEntry["relationship"]["is_a"].push(fieldValue.split(" ")[0])
            
                                }
                                else{
                                    definedValue(databaseEntry,fieldName)
                                    if (fieldName == "relationship"){
            
                                        i = fieldValue.split(" ")
                                        definedValue(databaseEntry[fieldName],i[0])
                                        databaseEntry[fieldName][i[0]].push( i[1] )
            
            
                                    }
                                    else{
                                    databaseEntry[fieldName].push(fieldValue)
                                }
                            }
                            }
                        else{
                            databaseEntry[fieldName] = fieldValue
                        }
                    }
            
                        //console.log(entryReg*fileLength) progress
            
                    }
                    if (databaseEntry!==null){
                        eachStore.push(databaseEntry)
                        if (eachStore.length == eachStoreSize){
                            i = parseInt(entryReg.lastIndex*fileLength)
                            fileProgress.innerText = i
                            fileProgress.style.width = i+"%"
                            yield eachStore
                            eachStore = []
                        }

                    }
            
                    
            
                }


                if (eachStore){
                    yield eachStore
                }

                fileProgress.innerText = 100
                fileProgress.style.width = "100%"
                
}
