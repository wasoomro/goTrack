## GoTrack - Gene Ontology Browser

Gene Ontology defines functional definitions for gene products. It is divided into three sub-ontologies namely molecular_functions, biological_process.

GoTrack is application that let's you browser Gene-Ontology Easily

**Features:**
* Parses Gene Ontology Entirely
* Let's User Browse Individual Term
* Provides Term Index
* Generates Ancestor Chart for each Term
* Search Auto-Complete

**Screenshots:**
![screenshot](https://user-images.githubusercontent.com/22234795/31851076-59ba1e66-b613-11e7-8945-677d27455723.png)
![screenshot](https://user-images.githubusercontent.com/22234795/31851077-59ec90bc-b613-11e7-9c10-b01d48d1b614.png)
![screenshot](https://user-images.githubusercontent.com/22234795/31851072-58e8aa20-b613-11e7-9f3f-71d72f6f1893.png)
![screenshot](https://user-images.githubusercontent.com/22234795/31851073-5920743c-b613-11e7-8f44-9088298cb12e.png)
![screenshot](https://user-images.githubusercontent.com/22234795/31851074-5956c848-b613-11e7-91bc-86e92da111c5.png)
![screenshot](https://user-images.githubusercontent.com/22234795/31851075-59883e64-b613-11e7-8746-8800cf3ddbe1.png)

**How to Install:**
Go to [Releases](https://github.com/wasoomro/goTrack/releases/) and download it for you system

Or

Clone this repo, and do following (assumes you have nodejs installed):
```html
npm install
npm start
```

**Known Problems:**
Application uses vis.js for chart generation, it uses a algorithms for layout determination. For some large graphs, application would generate confusing graphs.


**Info:**

App is build using electron, which lets one use web technologies to build desktop app, this app using following libraries and frameworks:
```list
AngularJs (For Ui Control)
Vis (For Graph Generation)
Electron (For Desktop App Creation)
Nedb (For Database)
Bootstrap (for Ui Design)
Jquery (For Autocomplete and Bootstrap)
```


**License:**
This App is licensed under Mit.