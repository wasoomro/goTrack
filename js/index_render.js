/*
<!--  
 * Copyright 2017 Waryam Soomro
 * Licensed under MIT 
-->
*/

//const fs = require("fs")
const Datastore = require("nedb")
const {remote} = require('electron')
const electronRemote = remote
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


const go_db = (new Datastore({ filename: 'db/go.json', autoload: true }))



const pageCount = 


module.exports = {
    db:go_db,
    remote: electronRemote,
    currentWindow : thisWindow,
    wa:"was"
};