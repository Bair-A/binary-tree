import './App.css';
import {useEffect, useState, useRef} from "react";

const getNum = () => {
   const num = Math.round(Math.random() * 100);
   const sign = Math.round(Math.random()) ? 1 : -1;
   return num * sign;
}

class Node {
   constructor(num) {
      this.value = num;
      this.left = null;
      this.right = null;
      this.positionY = null;
      this.positionX = null;
      this.key = null;
   }
}

class BinaryTree {
   constructor() {
      this.root = null;
   }
   addNode(num) {
      const newNode = new Node(num);
      if (!this.root) {
         this.root = newNode;
         this.root.positionY = 10;
         this.root.positionX = document.documentElement.clientWidth / 2;
         this.key = +new Date();
         return
      }
      let currentNode = this.root;
      while (currentNode) {
         if (newNode.value < currentNode.value) {
            if (!currentNode.left) {
               currentNode.left = newNode;
               currentNode.left.positionY = currentNode.positionY + 50;
               currentNode.left.positionX = currentNode.positionX - 50;
               currentNode.left.key = +new Date();
               return
            }
            currentNode = currentNode.left;
         } else {
            if (!currentNode.right) {
               currentNode.right = newNode;
               currentNode.right.positionY = currentNode.positionY + 50;
               currentNode.right.positionX = currentNode.positionX + 50;
               currentNode.right.key = +new Date();
               return
            }
            currentNode = currentNode.right;
         }
      }
   }
}

function App() {
   const [binaryTreeArr, setBinaryTreeArr] = useState([]);
   const binaryTree = useRef(new BinaryTree());
   const sortBinaryTree = (tree) => {
      const queue = [tree.root];
      const renderArr = [];
      while (queue.length > 0) {
         const node = queue.shift();
         renderArr.push(node);
         if (node.left) {
            queue.push(node.left);
         }
         if (node.right) {
            queue.push(node.right);
         }
      }
      setBinaryTreeArr(renderArr);
   }

   const handlerSpaceClick = (e) => {
      if (e.code === 'Space') {
         binaryTree.current.addNode(getNum());
         sortBinaryTree(binaryTree.current);
         console.log(binaryTreeArr);
      }
   };
   useEffect(() => {
      document.addEventListener('keyup', handlerSpaceClick);
   }, [])
   return (
      <div className="App">
            {binaryTreeArr.map(item => <div key={item.key} style={{position: 'absolute', left: item.positionX, top: item.positionY}}>{item.value}</div>)}
      </div>
   );
}

export default App;
