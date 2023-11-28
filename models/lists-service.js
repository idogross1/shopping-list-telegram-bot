const currentList = {
    name: 'shopping list',
    id: 123,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    items: [],
    current: true
};

const emptyItem = {
    name: '',
}

function addItemsToList(message) {
    console.log("🚀 ~ message:", message);
    const items = message.text.split(/\n/);
    currentList.items.push(...items);
    console.log('currentList:', JSON.stringify(currentList));
}

function showLists(message) {

}

function getCurrentList() { 
    return currentList.name;
}

module.exports = {
    addItemsToList,
    getCurrentList,
}