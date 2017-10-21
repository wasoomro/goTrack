/*
<!--  
 * Copyright 2017 Waryam Soomro
 * Licensed under MIT 
-->
*/

const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron")
const path = require("path")
const url = require("url")
const fs = require("fs")

//Global Window Reference

let win

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        minWidth: 784,
        minHeight: 588,
        title: "goTrack - Gene Ontology Browser",
        fullscreenable: false,
        webPreferences : {
            devTools : false,
            webgl : false,
            webaudio: false
        }

    })

    // load download page if no db else load index page

    if (fs.existsSync("db/go.json")) {
        win.loadURL(url.format({
                pathname: path.join(__dirname, "pages/index.html"),
                protocol: 'file:',
                slashes: true
            })
        )
        /*
        win.on('resize', () => {
            if ( document.getElementById(
                "mainsection").style.display == "none" ) {
                $("#termwell").css("height",
                win.getContentSize()[1] * (0.7)
            )}
        });*/

    } else {

        win.loadURL(url.format({
            pathname: path.join(__dirname, "pages/download.html"),
            protocol: 'file:',
            slashes: true
        }))

        ipcMain.once('db-complete', (event, arg) => {
            
                if (fs.existsSync("go.json")) {
                    
                    if (!fs.existsSync("db")) {
                        fs.mkdirSync("db")
                    }
                    fs.renameSync("go.json", "db/go.json")
                
                }
              })
    
        }


    win.on('closed', () => {

        win = null

    })
}






app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})


