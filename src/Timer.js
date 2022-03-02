const pad = (num) => num < 10 ? `0${num}` : num.toString();

export default class Timer{
    #curTime = 120;
    constructor(timer) {
        if(timer || timer===0){
            this.curTime = timer;
        }
    }

    get curTime(){
        let tempCurTime = this.#curTime;
        const hours = Math.floor(tempCurTime/3600);
        tempCurTime = tempCurTime%3600;
        const minutes = Math.floor(tempCurTime/60);
        tempCurTime = tempCurTime%60;
        const seconds = tempCurTime;
        let s = '';
        s += pad(hours) + ':';
        s += pad(minutes) + ':'
        s += pad(seconds);
        return s;
    }

    set curTime(curTime){
        this.#curTime = curTime;
    }

    decrease() {
        return this.#curTime-1;
    }

}
