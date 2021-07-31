// sha256 이라는 암호화 
const SHA256 = require('crypto-js/sha256');


class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash; //DJKDJKSJKJFD(*&(&(*)))
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index + this.timestamp + this.data + this.nonce 
    ).toString();
  }
  //너는 4번이라는 블록 나는 1번이라는 블록 
  // 4 - 1 
}

class BlockChain {
  constructor(){
    this.chain = [this.createGenesis()];
  }

  //제네시스블록
  createGenesis() {
    return new Block(0, `${Date.now()}`, "Genesis_Block", "0");
  }

  //마지막 블록에 대한 정보 얻기
  lastestBlock() {
    return this.chain[this.chain.length - 1];
  }
  //블록추가
  addBlock(newBlock) {
    newBlock.previousHash = this.lastestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  checkVaild() {
    for(let i = 0; i< this.chain.length; i ++) {
      const currentblock = this.chain[i];
      const pre_block = this.chain[i-1];

      if (currentblock.hash !== currentblock.calculateHash()) {
        return false;;
      }
      if (currentblock.previousHash !== pre_block.hash) {
        return false
      }
    }
    return true
  }
}

let jsChain = new BlockChain();
let block_arr = [];

const create_block = (data) => {
  jsChain.addBlock(new Block({data : data}, `${Date.now}`));
  block_arr.push(jsChain);
  console.log(jsChain);
  return jsChain;
}

module.exports = {create_block};