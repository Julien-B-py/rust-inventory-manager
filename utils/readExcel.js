import path from 'path';

import { readFile, utils } from 'xlsx';

export const readExcelData = () => {
    // Find the absolute path of the xlsm file
    const jsonDirectory = path.join(process.cwd(), '..', process.env.EXCEL_FILE_PATH);

    // Read the file and turns data to json (array of objects)
    const wb = readFile(jsonDirectory);
    const ws = wb.Sheets['Global'];
    const data = utils.sheet_to_json(ws);

    const filteredArray = [];
    // Keep only not sold items
    for (const [key, value] of Object.entries(data)) {
        if (!value.saleDate && value.name) filteredArray.push(value)
    }

    const groupedArray = [];
    for (const item of filteredArray) {

        // Check if item already exist
        const foundItem = groupedArray.find(storedItem => storedItem.name.trim() === item.name.trim());

        // Create a copy of the current item
        const itemAsStack = { ...item }

        if (!foundItem) {
            // New object that will contain name as key and stacks as array to store all
            const newItem = { name: item.name.trim(), stacks: [] }

            // Remove the name
            delete itemAsStack.name
            // Push it to stack
            newItem.stacks.push(itemAsStack)
            // Push the object to the global array
            groupedArray.push(newItem)

        } else {

            const index = groupedArray.findIndex(x => x.name.trim() === item.name.trim());

            // Remove the name
            delete itemAsStack.name

            groupedArray[index].stacks.push(itemAsStack)

        }

    }

    return groupedArray;

}