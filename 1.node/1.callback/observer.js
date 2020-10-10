/**
 * 观察者模式
 */
//观察者
class Observer {
    constructor(name) {
        this.name = name
    }
    update(subject) {
        console.log(this.name, subject.name, subject.status)
    }
}

//被观察者
class Subject {
    constructor(name) {
        this.name = name;
        this.observer = new Set();// 存放观察者
    }

    setObserver(observer) {
        this.observer.add(observer)
    }

    setStatus(status) {
        this.status = status;
        let observer = [...this.observer];
        observer.forEach(item => item.update(this))
    }
}

let bady = new Subject("bady");
let o1 = new Observer("p");
let o2 = new Observer("m");
bady.setObserver(o1)
bady.setObserver(o2)
bady.setStatus("玩")