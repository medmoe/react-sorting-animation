import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Rect from "./components/Rect";

const App = () => {
    const [rects, setRects] = useState<number[]>([])
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [start, setStart] = useState(false)
    const [speed, setSpeed] = useState(1)

    useEffect(() => {
        if (start) {
            const id = setInterval(bubbleSort, speed)
            return () => clearInterval(id)
        }
    })



    const shuffle_rects = () => {
        let arr: number[] = [...rects]
        for (let i = 0; i < arr.length; i++) {
            const l = Math.floor(Math.random() * (i + 1));
            const temp = arr[i]
            arr[i] = arr[l]
            arr[l] = temp
        }
        setRects(arr)
        setRight(0)
        setLeft(0)
    }
    const sort_rects = () => {
        setStart(true)
    }
    const bubbleSort = () => {
        let arr = [...rects]
        let swap = arr[left]

        if (left === arr.length - right - 1) {
            setLeft( 0)
            setRight( right + 1)
        }

        if (right < arr.length - 1 && left < arr.length - right - 1) {
            if (swap > arr[left + 1]) {
                arr[left] = arr[left + 1]
                arr[left + 1] = swap
                setRects(arr)

            }
            setLeft(left + 1)


        }
        if (right === arr.length){
            setStart(false);
        }
    }


        const adjustSize = (e: any) => {
            let arr: number[] = []
            for (let i = 0; i < e.target.value; i++) {
                arr.push(i + (i * 2))
            }
            setRects(arr)
            setStart(false)
        }
        const adjustSpeed = (e: any) => {
            setSpeed(e.target.value);
        }
        return (
            <div>
                <div>

                    <button onClick={shuffle_rects}>Shuffle</button>
                    <button onClick={sort_rects}>Sort</button>
                    <label>
                        SIZE:
                        <input type='range'
                               min='50'
                               max='1000'
                               value={rects.length}
                               onChange={adjustSize}/>
                    </label>
                    <label>
                        SPEED:
                    <input type='range'
                           min='1'
                           max='1000'
                           onChange={adjustSpeed} />

                    </label>
                </div>
                <div className='rects-container'>
                    {rects.map(e => {
                        return <Rect height={e} key={e}/>
                    })}
                </div>

            </div>
        )
    }

export default App;
