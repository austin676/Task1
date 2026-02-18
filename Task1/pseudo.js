class LedgerNode {
    constructor(storage){
        this.storage = storage;
        this.state = "stopped";
    }

    start(){
        if(!this.storage.isAvailable()){
            throw new Error("Storage is not available");
        }

        if(!this.storage.verifyIntegrity()){
            throw new Error("Integrity check failed");
        }
        this.state = "operating";
    }
    shutdown(){
        if(this.state === "operating"){
            this.storage.flush();
            }
        this.state = "stopped";
    }
append(entry){
   this.ensureOperating();
   if(!this.validateStructure(entry)){
         throw new Error("Invalid entry structure");
}
    this.storage.write(entry);
}

read(index){
    return this.storage.read(index);
}

getStatus(){
    return{
        state:this.state,
        storageAvailable:this.storage.isAvailable(),
    };
  }

  ensureOperating(){
    if(this.state !== "operating"){
        throw new Error("Node is not operating");
    }
}
validateStructure(entry){
    if(!entry)       return false;
    if(!entry.timestamp)        return false;
    if(!entry.payload)        return false;
    return true;
    }
}

