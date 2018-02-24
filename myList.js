function twoLinkedList(){
    if (arguments.length === 0) {
        this.head = undefined;
        this.tail = undefined;
    }
    else {
        fillList(this, arguments);
    }
    this.length = arguments.length;
};

function listNode(value){
    this.value = value;
    this.prev = arguments[1];
    this.next = arguments[2];
};

function fillList(obj, mas){
    if (mas.length === 1) {
        obj.head = new listNode(mas[0]);
        obj.tail = obj.head;
    }
    else {
        let newNode;
        let currentNode;
        for (let i = 0; i < mas.length; i++){
            if ((i !== 0) && (i !== mas.length - 1)){
                newNode = new listNode(mas[i],currentNode);
                currentNode.next = newNode;
                currentNode = newNode;
            }
            else if (i === 0){
                obj.head = new listNode(mas[i]);
                currentNode = obj.head;
            }
            else{
                obj.tail = new listNode(mas[mas.length-1],currentNode);
                currentNode.next = obj.tail;
            }
        }
    }
}

function findNode(index,obj){
    if ((index < obj.length) && (index >= 0)) {
        let delimiter = Math.floor(obj.length / 2);
        let currentNode;
        let i;
        if (index <= delimiter) {
            currentNode = obj.head;
            i = 0;
            while (index !== i)
            {
                currentNode = currentNode.next;
                i++;
            }
            return currentNode;
        }
        else {
            currentNode = obj.tail;
            i = obj.length - 1;
            while (index !== i)
            {
                currentNode = currentNode.prev;
                i--;
            }
            return currentNode;
        }
    }
    else{
        console.log("An item with this index does not exist")
    }
}

twoLinkedList.prototype.get = function(index){
   let foundNode = findNode(index,this);
   return foundNode.value;
};

twoLinkedList.prototype.forEach = function(callback){
    let currentNode = this.head;
    while (currentNode){
        callback(currentNode);
        currentNode = currentNode.next;
    }
}

twoLinkedList.prototype.set = function(index, value){
    let foundNode = findNode(index, this);
    foundNode.value = value;
}

twoLinkedList.prototype.push = function(value){
    if (arguments.length > 0){
        if (this.length > 0){
            if (arguments.length > 1){
                for (let i = 0; i < arguments.length;i++){
                    this.push(arguments[i]);
                    this.length -= 1;
                }
            }
            else
            {
                let newNode = new listNode(value,this.tail);
                this.tail.next = newNode;
                this.tail = newNode;
            }
        }
        else{
            fillList(this,arguments);
        }
        this.length += arguments.length;
    }
    else{
        console.log("Function must contain an argument");
    }
}

twoLinkedList.prototype.unshift = function(value){
    if (arguments.length > 0){
        if (this.length > 0){
            if (arguments.length > 1){
                for (let i = arguments.length-1; i >= 0;i--){
                    this.unshift(arguments[i]);
                    this.length -= 1;
                }
            }
            else
            {
                let newNode = new listNode(value,undefined,this.head);
                this.head.prev = newNode;
                this.head = newNode;
            }
        }
        else{
            fillList(this,arguments);
        }
        this.length += arguments.length;
    }
    else{
        console.log("Function must contain an argument");
    }
}

twoLinkedList.prototype.pop = function(){
    if (this.length > 0) {
        let deletedNode = this.tail;
        if (this.length > 1) {
            this.tail = deletedNode.prev;
            this.tail.next = undefined;
        }
        else {
            this.head = this.tail = undefined;
        }
        this.length--;
        return deletedNode.value;
    }
    else{
        console.log("List is empty");
    }
};

twoLinkedList.prototype.shift = function(){
    if (this.length > 0) {
        let deletedNode = this.head;
        if (this.length > 1) {
            this.head = deletedNode.next;
            this.head.prev = undefined;
        }
        else{
            this.tail = this.head = undefined;
        }
        this.length--;
        return deletedNode.value;
    }
    else{
        console.log("List is empty");
    }
}

twoLinkedList.prototype.contains = function(value){
    if (arguments.length !== 0) {
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.value === value) {
                return true;
            }
            currentNode = currentNode.next;
        }
        return false;
    }
    else{
        console.log("Function must contain an argument");
    }
}

twoLinkedList.prototype.toString = function(){
    let stringArr = [];
    let i = 0;
    let currentNode = this.head;
    while (currentNode) {
        stringArr[i] = JSON.stringify(currentNode.value);
        i++;
        currentNode = currentNode.next;
    }
    return '['+stringArr.toString()+']';
}

twoLinkedList.prototype.reverse = function(){
    let newList = this;
    let numberOfPairs = Math.floor(this.length / 2);
    let i = 1;
    let leftNode = newList.head;
    let rightNode = newList.tail;
    let temp;
    while (i <= numberOfPairs){
        temp = leftNode.value;
        leftNode.value = rightNode.value;
        rightNode.value = temp;
        leftNode = leftNode.next;
        rightNode = rightNode.prev;
        i++;
    }
    return newList;
}

twoLinkedList.prototype[Symbol.iterator] = function(){
    let currentNode = new listNode(undefined,undefined,this.head);
    return{
        next(){
            if (currentNode.next){
                return{
                    done: false,
                    value: currentNode = currentNode.next
                }
            }
            else{
                return {
                    done: true
                }
            }
        }
    }
}

module.exports = twoLinkedList;