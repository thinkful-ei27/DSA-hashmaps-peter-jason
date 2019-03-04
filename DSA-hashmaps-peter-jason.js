class HashMap {
  constructor(initialCapacity = 33){
    this.length = 0;
    this._slots = [];
    this.capacity = initialCapacity;
  }

  static _hashString(string){
    let hash = 5381;
    for (let i=0; i<string.length; i++){
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  set(key, value){
    const loadRatio = (this.length + 1)/ this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO){
      this._resize(this.capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    this._slots[index]= {
      key,
      value
    };
    this.length++;
  }

  _findSlot(key){
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i=start; i<start + this._capacity; i++){
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || slot.key == key){
        return index;
      }
    }
  }


}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;


function main(){
  const lor = new HashMap();
  lor.set('Hobbit','Bilbo');
  lor.set('Hobbit','Frodo');
  lor.set('Wizard','Gandolf');
  lor.set('Human','Aragon');
  lor.set('Elf','Legolas');
  lor.set('Maiar','The Necromancer');
  lor.set('Maiar','Sauron');
  lor.set('RingBearer','Gollum');
  lor.set('LadyOfLight','Galadriel');
  lor.set('HalfElven','Arwen');
  lor.set('Ent','Treebeard');

  console.log(lor);
}

main ();
