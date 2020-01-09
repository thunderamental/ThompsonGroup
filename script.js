
window.onload=function(){

  var input = document.getElementById("elt1in");
  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("button1").click();
    }
  });

  var input = document.getElementById("elt2in");
  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("button2").click();
    }
  });

}


function renderOne(){
  var eltIn = document.getElementById("elt1in");
  var eltOut = document.getElementById("elt1out");
  var elt = eltIn.value;
  console.log(elt);
  eltOut.value = "Input was " + elt;
} 


function renderTwo(){
  var eltIn = document.getElementById("elt2in");
  var eltOut = document.getElementById("elt2out");
  var elt = eltIn.value;
  console.log(elt);
  eltOut.value = "Input was " + elt;
} 
console.log("Javascript test of Thompson F element operation");

class caretNode {
    constructor(value) {
        this.left = null;
        this.right = null;
    }
}

class eltF {
    constructor(inA, inB) {
        this.a = inA;
        this.b = inB;
    }
}

/* the following are the two generating elements for F. */
var gA = new eltF(new caretNode(), new caretNode());
gA.a.left = new caretNode();
gA.b.right = new caretNode();

var gB = new eltF(new caretNode(), new caretNode());
gB.a.left = new caretNode();
gB.a.left.left = new caretNode();
gB.b.right = new caretNode();
gB.b.right.right = new caretNode();

console.log("The first generating element:", gA);

console.log("The second generating element:", gB);

function copyNode(inp) {
    let clone = JSON.parse(JSON.stringify(inp));
    return clone;
}

function fOperation(first, second) {
    var out1 = copyNode(first.a);
    var out2 = copyNode(second.b);

    var hold1 = copyNode(first.b);
    var hold2 = copyNode(second.a);
    var tempNode = new caretNode();
    var compNode = new caretNode();
    var override = new caretNode();

    // left-compare
    tempNode = hold1;
    compNode = hold2;

    while (tempNode.left != null) {
        tempNode = tempNode.left;
        compNode = compNode.left;
    }

    override = compNode.left;
    tempNode = out1;
    while (tempNode.left != null) {
        tempNode = tempNode.left;
    }
    tempNode.left = override;
    
    // right-compare
    tempNode = hold2;
    compNode = hold1;

    while (tempNode.right != null) {
        tempNode = tempNode.right;
        compNode = compNode.right;
    }

    override = compNode.right;
    tempNode = out2;
    while (tempNode.right != null) {
        tempNode = tempNode.right;
    }
    tempNode.right = override;
    
    var output = new eltF(out1, out2);

    return output;

}

console.log("Output of gA*gA: ", fOperation(gA, gA));

// oh my fucking god it works now to parse it all
