


class PromiseA{
    constructor(executer){
        this.states = Object.freeze({
            PENDING:"Pending",
            RESOLVED:"Resolved",
            REJECTED:"Rejected"
        }
)
        this.state = this.states.PENDING
        this.value = null;
        this.chain = []

        try{
            executer(this.resolve.bind(this),this.reject.bind(this))
        }catch(err){
            this.reject(error).bind(this)
        }
    }
    resolve(value){
        if(this.state !== this.states.PENDING) return
        this.state = this.states.RESOLVED
        this.value = value;
        this.chain.forEach(fn => fn(this.value))
    }
    reject(error){
        if(this.state !== this.states.PENDING) return
        this.state = this.states.REJECTED
        this.value = error;
    }
    then(onResolved){
        return new Promise((resolve,reject) => {
            this.chain.push(x => resolve(onResolved(x)))
        })
    }
    catch(onRejected){
        this.onReject(onRejected)
    }
}

const a = new PromiseA((resolve,reject) => {
    setTimeout(() => {resolve(5)}, 5000)
})

a.then(value => console.log(value + 5))