import Papa from 'papaparse';

/**
 * Loads and parses a CSV file.
 * @param {string} filePath - The relative path to the CSV file.
 * @returns {Promise<Array>} A promise that resolves to an array of parsed CSV data.
 */
export const loadCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    Papa.parse(filePath, {
      download: true,       // Ensures the file is fetched via HTTP
      header: true,         // Treats the first row as headers
      skipEmptyLines: true, // Skips empty rows
      complete: (results) => {
        resolve(results.data); // Returns parsed data as an array of objects
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
        reject(error);
      },
    });
  });
};
