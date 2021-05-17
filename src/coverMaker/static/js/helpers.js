// Various functions used on this project


// Removes an element
function remove(el) {
    el.parentNode.removeChild(el);
}

// Insert newNode after existingNode
function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
