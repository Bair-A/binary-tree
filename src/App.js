import './App.css';
// import BinaryRootComponent from './Components/BinaryRootComponent';
import {useEffect, useState, useRef} from "react";



function App() {
   const [root, setRoot] = useState(0);
   const [binaryTreeArr, setBinaryTreeArr] = useState([]);
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
            setBinaryTreeArr([{
               value : this.root.value,
               positionY: this.root.positionY + 'px',
               positionX: this.root.positionX + 'px',
            }]);
            console.log('new root')
            return
         }
         let currentNode = this.root;
         while (currentNode) {
            if (newNode.value < currentNode.value) {
               if (!currentNode.left) {
                  currentNode.left = newNode;
                  currentNode.left.positionY = currentNode.positionY + 20;
                  currentNode.left.positionX = currentNode.positionX - 20;
                  setBinaryTreeArr([...binaryTreeArr, {
                     value : currentNode.left.value,
                     positionY: currentNode.left.positionY + 'px',
                     positionX: currentNode.left.positionX + 'px',
                  }]);
                  console.log(binaryTreeArr);
                  return
               }
            } else {
               if (!currentNode.right) {
                  currentNode.right = newNode;
                  currentNode.right.positionY = currentNode.positionY + 20;
                  currentNode.right.positionX = currentNode.positionX + 20;
                  setBinaryTreeArr([...binaryTreeArr, {
                     value : currentNode.right.value,
                     positionY: currentNode.right.positionY + 'px',
                     positionX: currentNode.right.positionX + 'px',
                  }]);
                  return
               }
               currentNode = currentNode.right;
            }
         }
      }
   }
   const binaryTree = useRef(new BinaryTree());
   const handlerSpaceClick = (e) => {
      if (e.code === 'Space') {
         binaryTree.current.addNode(getNum());
         console.log(binaryTreeArr);
      }
   };
   useEffect(() => {
      document.addEventListener('keyup', handlerSpaceClick);
   }, [])
   return (
      <div className="App">
            {binaryTreeArr.map(item => <div key=item.positionX style={{position: 'absolute', left: item.positionX, top: item.positionY}}>{item.value}</div>)
         }
      </div>
   );
}

export default App;
