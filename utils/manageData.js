export const saveInventoryData = (data) => {
    localStorage.setItem("inventoryData", JSON.stringify(data));
}

export const loadInventoryData = () => {
        const storedInventory = JSON.parse(localStorage.getItem("inventoryData"))
        // console.log(storedInventory)
        return storedInventory;
}