# ExcaliDraw
Project given by EntHire

**#Deploying in your machine:**
- Clone this repository
- open [excali-draw](https://github.com/PendelaNeelesh/ExcaliDraw/tree/main/excali-proj) folder in your localmachine
- run `npm install` to download all the dependencies **install npm prior to run this statment**
- now run `npm start` which automatically runs `cd src && npx nodemon start.js`
- 
**#Make Sure:**
- to change database connection details's in [start.js](https://github.com/PendelaNeelesh/ExcaliDraw/blob/main/excali-proj/src/start.js).
- that all privilege are given to the user.
- to create a table in database using `CREATE TABLE svg_data (filename VARCHAR(20), version VARCHAR(20), svgData MEDIUMTEXT, PRIMARY KEY (filename,version));`
