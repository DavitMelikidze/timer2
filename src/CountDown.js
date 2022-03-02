import React, {useEffect, useState} from 'react';
import {Alert, Button} from "react-bootstrap";
import Timer from "./Timer";

function CountDown(){

    function toSeconds(hours,minutes,seconds){
        // if(!hours || !minutes || !seconds)return 180;
        if(!hours)hours=0;
        if(!seconds)seconds=0;
        if(!minutes)minutes=0;
        return 3600*hours + 60*minutes + Number(seconds);
    }

    const [count,setCount] = useState(new Timer());
    const [active,setActive] = useState(false);

    useEffect(()=>{
        if(active && count.decrease()===-1){
            setActive(false);
            alert('Timer is finished!');
        } else {
            const timeoutId = setTimeout(() => {
                if (active) {
                    if (count.decrease() !== -2)
                        setCount(new Timer(count.decrease()));
                }
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    },[active,count])

    function changeTimer(){
        const form = document.getElementById('CDF') //CountDownForm
        setCount(new Timer(toSeconds(form.hours.value,form.minutes.value,form.seconds.value)));
    }

    return(
        <div className='d-flex flex-column justify-content-center align-items-center bg-danger m-5 rounded-pill'>
            <form id='CDF' className='d-flex p-2 bg-secondary w-50 justify-content-center align-items-center m-3'
                  style={{borderRadius:'1rem'}}>
                <div>
                    {
                        active
                            ?
                            <Button onClick={()=>setActive(false)} className='w-100 my-2'>Stop</Button>
                            :
                            <Button onClick={()=>setActive(true)} className='w-100 my-2'>Start</Button>
                    }
                    <Button onClick={changeTimer}  className='w-100 my-2'>
                        Reset
                    </Button>
                </div>
                <div className='m-2'>
                    <input name="hours" type="number" placeholder='0' className='w-100'/>
                    <p>Hours</p>
                </div>
                <div className='m-2'>
                    <input name="minutes" type="number" placeholder='2' className='w-100'/>
                    <p>Minutes</p>
                </div>
                <div className='m-2'>
                    <input name="seconds" type="number" placeholder='0' className='w-100'/>
                    <p>Seconds</p>
                </div>
            </form>
            <Alert variant="success">
                {count.curTime}
            </Alert>
        </div>
    );

}

export default CountDown;
