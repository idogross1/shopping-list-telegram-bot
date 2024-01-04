const currentList = {
    name: 'shopping list',
    id: 123,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    items: [
        {
            item: 'one',
            quantity: 33,
            comments: 'kkkddd djdi sjij'
        },
        {
            item: 'two',
            comments: 'this is a comment'
        },
        {
            item: 'three',
            quantity: '9',
        },
        {
            item: 'four'
        }
    ],
    current: true
};

const emptyItem = {
    name: '',
}

function addItemsToList(message) {
    console.log("🚀 ~ addItemsToList ~ message:", message);
    const items = message.text.split(/\n/).map(item => {
        const [name, quantity, comments] = item.split(',');
        return {
            item: name,
            quantity,
            comments
        }
    })
    currentList.items.push(...items);
    console.log('currentList:', JSON.stringify(currentList));
}

function showLists(message) {

}

function getCurrentList(message) {
    const string = currentList.items.map(({ item, quantity, comments }, i) => {
        let str = item;

        if (quantity || comments) {
            str += ': '
        }

        if (quantity) {
            str += quantity
            if (comments) {
                str += ', '
            }
        }

        if (comments) {
            str += comments;
        }

        if (i < currentList.items.length) {
            str += '\n';
        }
        return str;
    }).join('');
    return string;
}

function printItem(item, quantity, comments) {
    let str = item;

    if (quantity || comments) {
        str += ': '
    }

    if (quantity) {
        str += quantity
        if (comments) {
            str += ', '
        }
    }

    if (comments) {
        str += comments;
    }

    return str;
}

function deleteItemFromList(itemToDelete) {
    console.log("🚀 ~ deleteItemFromList ~ currentList.items:", currentList.items);
    console.log("🚀 ~ deleteItemFromList ~ itemToDelete:", itemToDelete);
    if (!currentList.items.length) return;
    // const itemIndex = itemToDelete.match(/[0-9]+/g);
    const itemIndex = currentList.items.findIndex(item => item.item === itemToDelete);
    console.log("🚀 ~ deleteItemFromList ~ itemIndex:", itemIndex);
    currentList.items.splice(itemIndex, 1);
}

function emptyList() {
    currentList.items = [];
}

function getItems() {
    return currentList.items;
}

module.exports = {
    addItemsToList,
    getCurrentList,
    deleteItemFromList,
    emptyList,
    getItems,
    printItem
}