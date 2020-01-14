
/* 
IMPORTANT NOTE TO THE READER:
I comment AFTER lines of code. I know this goes against standard practice.
I don't intend to change this, as this is how I've been writing code since
high school. Comments usually come after functions and after lines of code,
and unless specified otherwise, they refer to the previous immediate line.
*/


window.onload=function(){ // triggered after window is fully loaded.

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
} // button click elt 1


function renderTwo(){
  var eltIn = document.getElementById("elt2in");
  var eltOut = document.getElementById("elt2out");
  var elt = eltIn.value;
  console.log(elt);
  eltOut.value = "Input was " + elt;
} // button click elt 2

console.log("Javascript test of Thompson F element operation");

class caretNode {
    constructor(input) {
        this.left = null;
        this.right = null;
        this.parent = input;
    }
} // simple tree node in the usual structure. Could be edited to combine nodes (,) instead of two fields as the trees are perfect

class eltF {
    constructor(inA, inB) {
        this.a = inA;
        this.b = inB;
        this.leafA = []; // this holds the tree's leaves in preorder form. 
        this.leafB = [];
    }
} // element of vagabond F. Pair of binary trees and two arrays for leaf preorder

function generatePreorder(node, outputArray) {
  if (node.left == null) {
    outputArray.push(node);
  } else {
    generatePreorder(node.left, outputArray);
    generatePreorder(node.right, outputArray);
  }
} // does what it says on the can. takes leaf nodes and sorts into a preorder array. 

function getPreorderIndex(node, preorder) {
  return preorder.indexOf(node);
  for (leaf in preorder) {
    if (node === leaf) { return preorder.indexOf(node); }
  } 
} // this entire function is INCREDIBLY unnecessary but i'm keeping it as an omen of things to come LOL


/* the following section hardcodes the two generating elements for F. */
var x0 = new eltF(new caretNode(null), new caretNode(null));
x0.a.left = new caretNode(x0.a);
x0.a.right = new caretNode(x0.a);
x0.a.left.left = new caretNode(x0.a.left);
x0.a.left.right = new caretNode(x0.a.left);
x0.b.right = new caretNode(x0.b);
x0.b.left = new caretNode(x0.b);
x0.b.right.left = new caretNode(x0.b.right);
x0.b.right.right = new caretNode(x0.b.right);
generatePreorder(x0.a, x0.leafA);
generatePreorder(x0.b, x0.leafB);

console.log("The first generating element:", x0);
console.log("A preorder on the references to leaves is included. Examples:")
console.log("The preorder index of x0.a.left.left is " + x0.leafA.indexOf(x0.a.left.left));
console.log("The preorder index of x0.a.left.right is " + x0.leafA.indexOf(x0.a.left.right));

var x1 = new eltF(new caretNode(null), new caretNode(null));
x1.a.left = new caretNode(x1.a);
x1.a.right = new caretNode(x1.a);
x1.a.right.left = new caretNode(x1.a.right);
x1.a.right.left.left = new caretNode(x1.a.right.left);
x1.a.right.left.right = new caretNode(x1.a.right.left);
x1.a.right.right = new caretNode(x1.a.right);
x1.b.left = new caretNode(x1.b);
x1.b.right = new caretNode(x1.b);
x1.b.right.left = new caretNode(x1.b.right);
x1.b.right.right = new caretNode(x1.b.right);
x1.b.right.right.left = new caretNode(x1.b.right.right);
x1.b.right.right.right = new caretNode(x1.b.right.right);
generatePreorder(x1.a, x1.leafA);
generatePreorder(x1.b, x1.leafB);

console.log("The second generating element:", x1);

var x0inv = new eltF(x0.b, x0.a);
generatePreorder(x0inv.a, x0inv.leafA);
generatePreorder(x0inv.b, x0inv.leafB);
var x1inv = new eltF(x1.b, x1.a);
generatePreorder(x1inv.a, x1inv.leafA);
generatePreorder(x1inv.b, x1inv.leafB);

console.log("The inverses of x0 and x1: ", x0inv, x1inv);


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
} // see https://stackoverflow.com/questions/11616630/how-can-i-print-a-circular-structure-in-a-json-like-format

function findFirst(node1, node2) {
  if (node2.left == null) {
    return null; 
  }
  if (node1.left == null) {
    if (node2.left == null) {
      return null;
    } else {
      return [node1, node2];
    }
  } else {
    if (findFirst(node1.left, node2.left) != null) {
      return findFirst(node1.left, node2.left);
    } else {
      return findFirst(node1.right, node2.right);
    }
  }
} // returns an array [a,b], where b should now overwrite a.
// POA: get index of a and write b to the node where a's tree's partner is. 


function fOp(first, second) {
    var out1array = [];
    var out2array = [];
    var hold1array = [];
    var hold2array = [];

    var out1 = copyNode(first.a);
    var out2 = copyNode(second.b);

    generatePreorder(out1, out1array);
    generatePreorder(out2, out2array);

    var hold1 = copyNode(first.b);
    var hold2 = copyNode(second.a);

    generatePreorder(hold1, hold1array);
    generatePreorder(hold2, hold2array);

    var tempArray = [];
    var index = 0;

    if (findFirst(hold1, hold2)!=null) {
      console.log("non null triggered");
      tempArray = findFirst(hold1, hold2); 
      // find the next node in the left element to be 'superimposed'
      index = hold1array.indexOf(tempArray[0]);
      console.log("index of swap node is " + index);
      console.log("test for reference.. ", out1array[0] == out1.left.left);
      // get index of hold1's node to be replaced
      console.log("node to be copied", tempArray[1]);
      tempArray[0].left = copyNode(tempArray[1].left); // NEEDS TO COPY PARENT
      tempArray[0].right = copyNode(tempArray[1].right);
      // make hold1 into hold2 as usual
      console.log("out1",out1);
      out1array[index].left = copyNode(tempArray[1].left); // NEEDS TO COPY PARENT
      out1array[index].right = copyNode(tempArray[1].right);
      console.log("out1",out1);
      // add to the partner tree
      out1array = [];
      hold1array = []; // reset preorder
      generatePreorder(out1, out1array);
      generatePreorder(hold1, hold1array);
      tempArray = []; // cleanup
    }

    if (findFirst(hold2, hold1)!=null) {
      tempArray = findFirst(hold2, hold1); 
      // find the next node in the right element to be 'superimposed'
      index = hold2array.indexOf(tempArray[0]);
      console.log("index of swap node is " + index);
      // get index of hold2's node to be replaced
      tempArray[0].left = copyNode(tempArray[1].left); // NEEDS TO COPY PARENT
      tempArray[0].right = copyNode(tempArray[1].right); 
      // make hold1 into hold2 as usual
      out2array[index].left = copyNode(tempArray[1].left); // NEEDS TO COPY PARENT
      out2array[index].right = copyNode(tempArray[1].right);
      // add to the partner tree
      out2array = [];
      hold2array = []; // reset preorder
      generatePreorder(out2, out2array);
      generatePreorder(hold2, hold2array);
      tempArray = []; // cleanup
    }
    
    var output = new eltF(out1, out2);
    output.leafA = out1array;
    output.leafB = out2array;
    return output;
 
}

console.log("Output of x0*x0: ", fOp(x0, x0));
console.log("Output of x0*x1: ", fOp(x0, x1));
console.log("Output of x0*x0inv: ", fOp(x0, x0inv));

console.log("Output of x0inv*x1: ", fOp(x0inv, x1));


function inv(elt) { // inverts element given
  var out1 = copyNode(elt.a);
  var out2 = copyNode(elt.b);

  var outelt = new eltF(out2, out1);
  generatePreorder(outelt.a, outelt.leafA);
  generatePreorder(outelt.b, outelt.leafB)

  return outelt;
} // clearly composition tells one that the inverse just 'flips' the element.

function xi(n) { // generates i'th element of the generating set.
  if (n == 0) {
    return x0;
  } else if (n == 1) {
    return x1;
  } else {
    return fOp(
            fOp(
              (inv(xi(n-2))),
              xi(n-1)),
            xi(n-2)); // x_n = x_(n-2)^-1 * x_(n-1) * x_(n-2). 
  }
}

console.log("The generating element x_10 is: ", xi(10));

function parse(inputString) {
  // probably fill this in with regexp stuff. 
}