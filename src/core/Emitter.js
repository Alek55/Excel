export class Emitter {

    constructor() {
        this.listeners = {}
    }
    // принимаем уведомление от компонентов - произошло событие
    emit(eventName, ...args) {
        if(!Array.isArray(this.listeners[eventName])) return false
        this.listeners[eventName].forEach(fn => fn(...args))
        return true
    }
    // компоненты подписываются - присывлает свои коллеки, в которых будут обновляться их данные, если произойдет указанное событие
    subscribe(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || []
        this.listeners[eventName].push(fn)

        return () => {
            this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== fn) // удаляем fn из слушателей, в подписке сохраним в свойство и вызовем как функцию при удалении компноента
        }
    }

}