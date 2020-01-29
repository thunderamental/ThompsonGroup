
/* 
IMPORTANT NOTE TO THE READER:
I comment AFTER lines of code. I know this goes against standard practice.
I don't intend to change this, as this is how I've been writing code since
high school. Comments usually come after functions and after lines of code,
and unless specified otherwise, they refer to the previous immediate line.
*/

window.onload=function(){ // triggered after window is fully loaded. For input.

  var input = document.getElementById("elt1in");
  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { // makes enter button click required button i
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

} // makes enter button click required button instead.

function parseArray(input) { // takes raw input string from form
  var holdArray = input.split(',');
  var inputArray = [];
  var outputElt = null;
  var holdElt = null;

  for (element of holdArray) {
    if (element[0] == ' ') {
      inputArray.push(element.slice(1));
    } else {
      inputArray.push(element);
    }
  } // to fix a bug that didn't like spaces in the input.

  for (element of inputArray) {
    if (outputElt == null) { // for 'first element'. Actually, should combine with the else by initial output == identity.
      if (element[0] != '-') { // check for 'inverse' 
        outputElt = xi(parseInt(element)); 
      } else {
        outputElt = inv(xi(Math.abs(parseInt(element))));
      }
    } else {
      if (element[0] != '-') {
        holdElt = fOp(outputElt, xi(parseInt(element)));
        outputElt = holdElt;
      } else {
        holdElt = fOp(outputElt,inv(xi(Math.abs(parseInt(element)))));
        outputElt = holdElt;
      }
    }
  }
  refreshParents(outputElt.a);
  refreshParents(outputElt.b); 
  /*
  I don't know where I forgot to place the parents. refreshParent does what
  it says on the can. All children get their parents reassigned.
  */
  return outputElt;
} // parses a string in a needed generator format



/*
The following 'reduce' and 'render' buttons just handle the HTML button presses.
Really straightforward and simple. One can make the argument for abstracting it 
into one or two functions, the input being 'reduced or not' or 'where to render 
the tree'. I may come back to this to do exactly that.
*/

function renderOne(){
  var eltFout = null;

  var eltIn = document.getElementById("elt1in");
  var eltOut = document.getElementById("elt1out");
  var elt = eltIn.value;

  try {
    eltFout = parseArray(elt);
    eltOut.value = "(Your input was \"" + elt + "\")" ;
  } catch (err) {
    eltIn.value = "0"; // might need to change in future input updates
    eltOut.innerHTML = "Invalid input. Defaulted to x<sub>0</sub>.";
    eltFout = x0;
  }    

  drawTree(eltFout.a, "in1acontainer");
  drawTree(eltFout.b, "in1bcontainer");
} // button click elt 1

function reduceOne(){
  var eltFout = null;

  var eltIn = document.getElementById("elt1in");
  var eltOut = document.getElementById("elt1out");
  var elt = eltIn.value;

  try {
    eltFout = reduce(parseArray(elt));
    // eltOut.value = "(Input was " + elt + ")" ;
    eltOut.innerHTML = normalize(eltFout);
  } catch (err) {
    eltIn.value = "0"; // might need to change in future input updates
    eltOut.innerHTML = "Invalid input. Defaulted to x<sub>0</sub>.";
    eltFout = x0;
  }    

  drawTree(eltFout.a, "in1acontainer");
  drawTree(eltFout.b, "in1bcontainer");


}

function renderTwo(){
  var eltFout = null;

  var eltIn = document.getElementById("elt2in");
  var eltOut = document.getElementById("elt2out");
  var elt = eltIn.value;

  try {
    eltFout = parseArray(elt);
    eltOut.value = "(Your input was \"" + elt + "\")" ;
  } catch (err) {
    eltIn.value = "0"; // might need to change in future input updates
    eltOut.innerHTML = "Invalid input. Defaulted to x<sub>0</sub>.";
    eltFout = x0;
  } 

  drawTree(eltFout.a, "in2acontainer");
  drawTree(eltFout.b, "in2bcontainer");
} // button click elt 2 DONE

function reduceTwo(){
  var eltFout = null;

  var eltIn = document.getElementById("elt2in");
  var eltOut = document.getElementById("elt2out");
  var elt = eltIn.value;

  try {
    eltFout = reduce(parseArray(elt));
    eltOut.innerHTML = normalize(eltFout);
  } catch (err) {
    eltIn.value = "0"; // might need to change in future input updates
    eltOut.innerHTML = "Invalid input. Defaulted to x<sub>0</sub>.";
    eltFout = x0;
  } 

  drawTree(eltFout.a, "in2acontainer");
  drawTree(eltFout.b, "in2bcontainer");
}

function calcButton() {

  var elt1In = document.getElementById("elt1in");
  var elt2In = document.getElementById("elt2in");
  var elt =  elt1In.value + ', ' + elt2In.value; 

  var eltOut = document.getElementById("outDown"); // put this to use later. Normal Form

  try {
    eltFout = parseArray(elt);
    eltOut.innerHTML = normalize(eltFout);
  } catch (err) {
    eltOut.innerHTML = "Invalid input. Defaulted to x<sub>0</sub>.";
    eltFout = x0;
  } 
  

  drawTree(eltFout.a, "outacontainer");
  drawTree(eltFout.b, "outbcontainer");

} // button click calculate

function reduceButton() {
  var elt1In = document.getElementById("elt1in");
  var elt2In = document.getElementById("elt2in");
  var elt =  elt1In.value + ', ' + elt2In.value;

  var eltOut = document.getElementById("outDown"); // put this to use later. Normal Form

  try {
    eltFout = reduce(parseArray(elt));
    eltOut.innerHTML = normalize(eltFout);
  } catch (err) {
    eltOut.innerHTML = "Invalid input. Defaulted to x<sub>0</sub>.";
    eltFout = x0;
  } 

  drawTree(eltFout.a, "outacontainer");
  drawTree(eltFout.b, "outbcontainer");

}


/*
The following is my implementation of the structures we're using to represent the binary tree
pair / element from Thompson F. They're just trees and nodes. I started off with a home-brewed
type structure (not knowing what graphics library I would be using), and later found that d3 
requires a specific tree structure format. So there's some translation going on in and around,
and I've kept it (as best I can) to the very end / output so the code is still wholly in the
structure I prefer.
*/

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

class node { // JSON-d3 standard. To render trees in d3.js.
  constructor(input) {
    this.name = null;
    this.parent = input;
    this.children = [];
  }
}

function generatePreorder(node, outputArray) {
  if (node.left == null) {
    outputArray.push(node);
  } else {
    generatePreorder(node.left, outputArray);
    generatePreorder(node.right, outputArray);
  }
} // does what it says on the can. takes leaf nodes and sorts into a preorder array. 

function copyNode(inp) { // JSON-stringify-parse with circular dodge
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

function stringifyNode(inp) { // JSON-stringify with circular dodge
  var cache = [];
    let clone = JSON.stringify(inp, function(key, value) {
      if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) {
              // Duplicate reference found, discard key
              return;
          }
          // Store value in our collection
          cache.push(value);
      }
      return value;
  });
  cache = null;
  return clone;
} // returns string instead of the JSON-object.

// console.log("stringified x0.a:", stringifyNode(x0.a)); 
// JSON stringify can be used to deep-equals compare two JSON like objects.



/* 
the following section hardcodes the two generating elements for F, x_0 and x_1. 
There should also be an identity element, but for the elegance of it all i'll 
keep it just to x_0 and x_1-- it's not every day you get an infinite group with a
nice small finite generating set. 
*/
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

// console.log("The first generating element:", x0);
// console.log("A preorder on the references to leaves is included. Examples:")
// console.log("The preorder index of x0.a.left.left is " + x0.leafA.indexOf(x0.a.left.left));
// console.log("The preorder index of x0.a.left.right is " + x0.leafA.indexOf(x0.a.left.right));

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

// console.log("The second generating element:", x1);

var x0inv = new eltF(x0.b, x0.a);
generatePreorder(x0inv.a, x0inv.leafA);
generatePreorder(x0inv.b, x0inv.leafB);
var x1inv = new eltF(x1.b, x1.a);
generatePreorder(x1inv.a, x1inv.leafA);
generatePreorder(x1inv.b, x1inv.leafB);

// console.log("The inverses of x0 and x1: ", x0inv, x1inv);


/*
Here we really get into the math, which is nice. There are some
helper functions, both for the case of the operation and the
reducing. One should be able to see the parallels with this and 
manually performing the group operation
*/

function findFirst(node1, node2) { // identifies first 
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
// 'findfirst' indicates the first found subtree that node1 does not have that node2 does


function fOp(first, second) { // the group operation.
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

    while (findFirst(hold1, hold2)!=null) {
      
      tempArray = findFirst(hold1, hold2); 
      // find the next node in the left element to be 'superimposed'
      index = hold1array.indexOf(tempArray[0]);
      // get index of hold1's node to be replaced
      tempArray[0].left = copyNode(tempArray[1].left); 
      tempArray[0].right = copyNode(tempArray[1].right);
      tempArray[0].left.parent = tempArray[0];
      tempArray[0].right.parent = tempArray[0];
      // make hold1 into hold2 as usual
      out1array[index].left = copyNode(tempArray[1].left);
      out1array[index].right = copyNode(tempArray[1].right);
      out1array[index].left.parent = out1array[index];
      out1array[index].right.parent = out1array[index];
      // add to the partner tree
      out1array = [];
      hold1array = []; // reset preorder
      generatePreorder(out1, out1array);
      generatePreorder(hold1, hold1array);
      tempArray = []; // cleanup
    }

    while (findFirst(hold2, hold1)!=null) { 
      tempArray = findFirst(hold2, hold1); 
      // find the next node in the right element to be 'superimposed'
      index = hold2array.indexOf(tempArray[0]);
      // get index of hold2's node to be replaced
      tempArray[0].left = copyNode(tempArray[1].left); // NEEDS TO COPY PARENT
      tempArray[0].right = copyNode(tempArray[1].right); 
      tempArray[0].left.parent = tempArray[0];
      tempArray[0].right.parent = tempArray[0];
      // make hold1 into hold2 as usual
      out2array[index].left = copyNode(tempArray[1].left); // NEEDS TO COPY PARENT
      out2array[index].right = copyNode(tempArray[1].right);
      out2array[index].left.parent = out2array[index];
      out2array[index].right.parent = out2array[index];
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

// console.log("Output of x0*x0: ", fOp(x0, x0));
// console.log("Output of x0*x1: ", fOp(x0, x1));
// console.log("Output of x0*x0inv: ", fOp(x0, x0inv));
// console.log("Output of x0inv*x1: ", fOp(x0inv, x1));


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
            xi(n-2));  
  }
} // x_n = x_(n-2)^-1 * x_(n-1) * x_(n-2). This is one of the standard relations.

// console.log("The generating element x_10 is: ", xi(10));

function convertStandard(input) { // takes a caretNode and converts it to JSON standard.
  if (input == null) {return null;}
  else {
    var output = new node(null);
    if (input.left != null) {
      output.children = [convertStandard(input.left), convertStandard(input.right)];
      output.children[0].parent = output;
      output.children[1].parent = output;
    }
    return output;
  }
} // Consider porting the calculation code to JSON standard. For now, this works.

// console.log("convert my tree to JSON standard for d3 render: x1-left is: ", convertStandard(x1.a))
// console.log("the JSON, in string form: ", stringifyNode(convertStandard(x0.a)));

function drawTree(root, inputID) { // NOTE. THE eltF TO tree CONVERSION IS DONE IN HERE. ALL math-logic IS IN eltF form!
  var svgHold = d3.select("#"+inputID); 
  svgHold.selectAll("*").remove(); // this is supposed to clear all elt's in svgHold.
  var svgOutL = d3.select("#"+inputID).append("svg")
                  .attr("height","100%")
                  .attr("width","100%");

  var margin = {left:0, right:0, top:50, bottom:0};

  var svgL = 
  svgOutL.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')' );

  var root = d3.hierarchy(convertStandard(root));

  var treeLayout = d3.tree();
  treeLayout.size([200, 150]); // smaller than div by abt 40%. just to fit. 
  treeLayout(root);

  svgL.selectAll("circle")
  .data(root.descendants())
  .enter().append("circle")
    .attr("cx", function(d,i){ return d.x; })
    .attr("cy", function(d,i){ return d.y; })
    .attr("r", "5");  

  svgL.selectAll('link')
    .data(root.links())
    .enter()
    .append('line')
    .classed('link', true)
    .attr('x1', function(d) {return d.source.x;})
    .attr('y1', function(d) {return d.source.y;})
    .attr('x2', function(d) {return d.target.x;})
    .attr('y2', function(d) {return d.target.y;})
    .style("stroke", "black");

  }

function fEquals(first, second) { // verify two eltFs are equal
  if (  (stringifyNode(first.a) == stringifyNode(second.a)) &&
        (stringifyNode(first.b) == stringifyNode(second.b)) ) {
          return true;
        } else { return false; }
}

function eqs(a,b) { // compares 2 roots of a (sub/)tree (a binary tree where all non-leafs have 2 children!)
  if (a.left == null && b.left == null) { return true; } // only need to check 1 child
  else {
    if ((a.left == null && b.left != null) || (a.left != null && b.left == null)) { // XOR
      return false;
    } else {
      return (eqs(a.left, b.left) && eqs(a.right, b.right));
    }
  }
}

function enumF(f, outArray) { // adds all non leaf nodes of a tree to an iterable array.
  if (f.left != null) {
    outArray.push(f);
    enumF(f.left, outArray);
    enumF(f.right, outArray);
  }
}

function firstCommon(a, b) {
  var enumA = [];
  var enumB = [];
  enumF(a, enumA);
  enumF(b, enumB);

  var leafA = [];
  var leafB = [];
  generatePreorder(a, leafA);
  generatePreorder(b, leafB);

  var currTreeA = [];
  var currTreeB = [];
  var check = false;
  
  for (subtree1 of enumA) {
    for (subtree2 of enumB) {
      if (eqs(subtree1, subtree2)) {
        generatePreorder(subtree1, currTreeA);
        generatePreorder(subtree2, currTreeB);
        if (currTreeA.length == currTreeB.length) {
          check = true;
          for (x = 0; x < currTreeA.length; x++) {
            if (leafA.indexOf(currTreeA[x]) != leafB.indexOf(currTreeB[x])) {
              check = false;
            }
            if (check == true) {
              return [subtree1, subtree2]; // the common tree.
            }
          }
        }
        currTreeA = [];
        currTreeB = [];
      }
    }
  }
  return null;
} // Finds the first common subtree, like findFirst does with differences.

function reduce(f) {
  var out1 = f.a;
  var out2 = f.b;
  var holdArray = [];

  while (firstCommon(out1, out2) != null) {
    holdArray = firstCommon(out1, out2);
    holdArray[0].left = null;
    holdArray[0].right = null;
    holdArray[1].left = null;
    holdArray[1].right = null;
  }

  var output = new eltF(out1, out2);
  generatePreorder(output.a, output.leafA);
  generatePreorder(output.b, output.leafB);

  return output;
} // same way one would 'reduce' a tree pair with leaf exponents.

function isLeftChild(node) { // really, the parameter is in fact a caretNode..
  if ((node.parent == null) || node.parent.right == node) {
    return false; // is right or root
  } else {
    return true; // is left.
  }
} // remember, I do math in the structure I defined.

function refreshParents(root) {
  if (root.left != null) {
    root.left.parent = root;
    root.right.parent = root;
    refreshParents(root.left);
    refreshParents(root.right);
  }
} // some logistic clean-up.

function normalize(f) { // takes a reduced tree pair and outputs the normal form string.
  var rSpine = [];
  var positive = [];
  var negative = [];
  var exp = 0;
  var currNode = new caretNode(null);
  // refreshParents(f.a); Originally the parent thing was bugging me a little, something was wrong. I had neglected to handle it somewhere.
  // refreshParents(f.b); Now the problem is handled in parseArray method. But I should eventually get to the root of this.
  rightSpine(f.a, rSpine);
  for (x = 0; x < f.leafA.length; x++) {
    currNode = f.leafA[x];
    while (!rSpine.includes(currNode) && (isLeftChild(currNode))) {
      exp++;
      currNode = currNode.parent;
    }
    positive.push(exp);
    exp = 0;
  }
  rSpine = [];
  rightSpine(f.b, rSpine);
  for (x = 0; x < f.leafB.length; x++) {
    currNode = f.leafB[x];
    while (!rSpine.includes(currNode) && (isLeftChild(currNode))) {
      exp++;
      currNode = currNode.parent;
    }
    negative.push(exp);
    exp = 0;
  }

  var output = "Normal form : <br>[";
  var outhold = "";
  for (x = 0; x < positive.length; x++) {
    if (positive[x] != 0) {
      outhold += "(x<sub>" + x + "</sub>)<sup>" + positive[x] + "</sup> • ";
    }
  }
  if (outhold.charAt(outhold.length - 1) == ' ') {
    outhold = outhold.slice(0,-3);
  }
  if (outhold == "") { outhold += '1'; }
  output += outhold;
  output += "] • [";
  var outhold = "";
  for (x = 0; x < negative.length; x++) {
    if (negative[x] != 0) {
      outhold += "(x<sub>" + x + "</sub>)<sup>" + negative[x] + "</sup> • ";
    }
  }
  if (outhold.charAt(outhold.length - 1) == ' ') {
    outhold = outhold.slice(0,-3);
  }
  if (outhold == "") { outhold += '1'; }
  output += outhold;
  output += "]<sup>-1<sup>"

  return output;
}

function rightSpine(node, outArray) { // takes a root of a tree and pushes right-spine to an array
  outArray.push(node);
  if (node.right != null) {
    outArray.push(node.left);
    rightSpine(node.right, outArray);
  }
} // For comparison reasons.
