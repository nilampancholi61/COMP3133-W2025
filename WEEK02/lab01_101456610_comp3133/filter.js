const fs = require('fs');
const path = require('path');

const inputFile = 'input_countries.csv';


const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

function deleteFileIfExists(filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted: ${filePath}`);
    }
}

function filterDataByCountry(country, outputFile) {
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err.message}`);
            return;
        }

        const lines = data.split('\n');
        const headers = lines[0]; // First line contains the headers
        const filteredData = lines.filter(line => line.includes(country));

        if (filteredData.length > 0) {
            const outputData = [headers, ...filteredData].join('\n');
            fs.writeFile(outputFile, outputData, 'utf8', (err) => {
                if (err) {
                    console.error(`Error writing to file: ${err.message}`);
                } else {
                    console.log(`Filtered data written to: ${outputFile}`);
                }
            });
        } else {
            console.log(`No data found for ${country}`);
        }
    });
}

// Delete files if they already exist
deleteFileIfExists(canadaFile);
deleteFileIfExists(usaFile);

// Filter and write data
filterDataByCountry('Canada', canadaFile);
filterDataByCountry('United States', usaFile);