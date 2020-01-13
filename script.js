
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
    constructor(input) {
        this.left = null;
        this.right = null;
        this.parent = input;
    }
}

class eltF {
    constructor(inA, inB) {
        this.a = inA;
        this.b = inB;
        this.leafA = []; // this holds the tree's leaves in preorder form. 
        this.leafB = [];
    }
}

function generatePreorder(node, outputArray) {
  if (node.left == null) {
    outputArray.push(node);
  } else {
    generatePreorder(node.left, outputArray);
    generatePreorder(node.right, outputArray);
  }
}

function getPreorderIndex(node, preorder) {
  return preorder.indexOf(node);

  for (leaf in preorder) {
    if (node === leaf) { return preorder.indexOf(node); }
  } // this entire function is INCREDIBLY unnecessary but i'm keeping it as a sign LOL
}

/* the following hardcodes the two generating elements for F. */
var gA = new eltF(new caretNode(null), new caretNode(null));
gA.a.left = new caretNode(gA.a);
gA.a.right = new caretNode(gA.a);
gA.a.left.left = new caretNode(gA.a.left);
gA.a.left.right = new caretNode(gA.a.left);
gA.b.right = new caretNode(gA.b);
gA.b.left = new caretNode(gA.b);
gA.b.right.left = new caretNode(gA.b.right);
gA.b.right.right = new caretNode(gA.b.right);
generatePreorder(gA.a, gA.leafA);
generatePreorder(gA.b, gA.leafB);

console.log("The first generating element:", gA);
console.log("A preorder on the references to leaves is included:")
console.log("The preorder index of gA.a.left.left is " + gA.leafA.indexOf(gA.a.left.left));
console.log("The preorder index of gA.a.left.right is " + gA.leafA.indexOf(gA.a.left.right));

var gB = new eltF(new caretNode(null), new caretNode(null));
gB.a.left = new caretNode(gB.a);
gB.a.right = new caretNode(gB.a);
gB.a.right.left = new caretNode(gB.a.right);
gB.a.right.left.left = new caretNode(gB.a.right.left);
gB.a.right.left.right = new caretNode(gB.a.right.left);
gB.a.right.right = new caretNode(gB.a.right);
gB.b.left = new caretNode(gB.b);
gB.b.right = new caretNode(gB.b);
gB.b.right.left = new caretNode(gB.b.right);
gB.b.right.right = new caretNode(gB.b.right);
gB.b.right.right.left = new caretNode(gB.b.right.right);
gB.b.right.right.right = new caretNode(gB.b.right.right);
generatePreorder(gB.a, gB.leafA);
generatePreorder(gB.b, gB.leafB);


console.log("The second generating element:", gB);

function copyNode(inp) {
  var cache = [];
    let clone = JSON.parse(JSON.stringify(inp, function(key, value) {
      if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) {
              // Duplicate reference found, discard key
              return;
          }
          // Store value in our collection
          cache.push(value);
      }
      return value;
  }));
  cache = null;
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
