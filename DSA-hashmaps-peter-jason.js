class HashMap {
  constructor(initialCapacity = 33){
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  static _hashString(string){
    let hash = 5381;
    for (let i=0; i<string.length; i++){
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    return this._slots[index].value;
  }

  set(key, value){
    const loadRatio = (this.length + 1)/ this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO){
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    this._slots[index]= {
      key,
      value,
      deleted: false
    };
    this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key){
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i=start; i<start + this._capacity; i++){
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || slot.key === key){
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;



function palindrome(string){
  string = string.toLowerCase();
  const word = new HashMap();
  for (let i = 0; i < string.length; i++){
    try {
      let count = word.get(string[i]);
      word.set(string[i], ++count);
    } catch (err){
      word.set(string[i], 1);
    }
  }

  const isEven = string.length % 2 === 0;
  if (isEven){
    for (let i = 0; i<string.length; i++){
      const num = word.get(string[i]);
      if (num % 2 !== 0){
        return false;
      }
    }
    return true;
  } else {
    let count = 0;
    for (let i = 0; i< string.length; i++){
      const num = word.get(string[i]);
      if (num %2 !== 0){
        count++;
        console.log(num);
      }
    }
    if (count > 1) {
      return false;
    } else {
      return true;
    }
  }

}



/* Anagram grouping
Write an algorithm to group a list of words into anagrams
Input/ Output
Input: List of words: ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']
Output : Grouping of Anagrams: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']] */

/* psuedocode
function (words) {
init a new Map() that will contain each word as a key
loop over list of words
  map.set(word[i])
  if there 

} */


// code

























function main(){
  //const lor = new HashMap();
  //lor.set('Hobbit','Bilbo');
  //lor.set('Hobbit','Frodo');
  //lor.set('Wizard','Gandolf');
  //lor.set('Human','Aragon');
  //lor.set('Elf','Legolas');
  //lor.set('Maiar','The Necromancer');
  //lor.set('Maiar','Sauron');
  //lor.set('RingBearer','Gollum');
  //lor.set('LadyOfLight','Galadriel');
  //lor.set('HalfElven','Arwen');
  //lor.set('Ent','Treebeard');
  //// console.log(lor._findSlot('Maiar')); // 17
  //// console.log(lor);
  //console.log(lor.get('Maiar')); // Sauron 
  console.log(palindrome('billy'));
  console.log(palindrome('billie'));
  console.log(palindrome('billib'));


}

main ();
