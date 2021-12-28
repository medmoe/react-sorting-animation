import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Rect from "./components/Rect";
import {clear} from "@testing-library/user-event/dist/clear";

const App = () => {
    const [rects, setRects] = useState<number[]>([])
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [currMin, setCurrMin] = useState(0)
    const [start, setStart] = useState(false)
    const [speed, setSpeed] = useState(1)
    const [algo, setAlgo] = useState('0')


    useEffect(() => {
        if (start) {
            if (algo === '0') {
                const id = setInterval(bubbleSort, speed)
                return () => clearInterval(id)
            } else if (algo === '1') {
                const id = setInterval(selectionSort, speed)
                return () => clearInterval(id)
            }

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
        setCurrMin(0)
    }
    const sort_rects = () => {
        setStart(true)
    }
    const bubbleSort = () => {
        let arr = [...rects]
        let swap = arr[left]

        if (left === arr.length - right - 1) {
            setLeft(0)
            setRight(right + 1)
        }
        if (right < arr.length - 1 && left < arr.length - right - 1) {
            if (swap > arr[left + 1]) {
                arr[left] = arr[left + 1]
                arr[left + 1] = swap
                setRects(arr)
            }
            setLeft(left + 1)
        }
        if (right === arr.length) {
            setStart(false);
        }
    }
    const selectionSort = () => {
        let arr = [...rects]
        if (left === right) {
            setCurrMin(left)
        }
        if (left >= arr.length) {
            let temp = arr[right]
            arr[right] = arr[currMin]
            arr[currMin] = temp
            setRight(right + 1)
            setLeft(right)
            setRects(arr)
        }
        if (right < arr.length && left < arr.length) {
            if (arr[left] <= arr[currMin]) {
                setCurrMin(left)
            }
            setLeft(left + 1)
        }
        if (right === arr.length) {
            setStart(false)
        }
    }


    const adjustSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        let arr: number[] = []
        let size = parseInt(e.target.value);
        for (let i = 0; i < size; i++) {
            arr.push(i + (i * 2))
        }
        setRects(arr)
        setStart(false)
    }
    const adjustSpeed = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed(parseInt(e.target.value));
    }
    const pickAlgo = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // don't update algo when sorting process is running
        if (!start) {
            setAlgo(e.target.value)
        }
    }
    return (
        <div>
            <div>

                <button onClick={shuffle_rects}>Shuffle</button>
                <button onClick={sort_rects}>Sort</button>
                <label>
                    SIZE:
                    <input type='range'
                           min='10'
                           max='1000'
                           value={rects.length}
                           onChange={adjustSize}/>
                </label>
                <label>
                    SPEED:
                    <input type='range'
                           min='1'
                           max='1000'
                           onChange={adjustSpeed}/>

                </label>
                <label htmlFor='alogs'>select algorithm</label>
                <select name='alogs' onChange={pickAlgo}>
                    <option value='0'>Bubble Sort</option>
                    <option value='1'>Selection Sort</option>
                </select>
            </div>
            <div className='rects-container'>
                {rects.map(e => {
                    return <Rect height={e} key={e}/>
                })}
            </div>

        </div>
    );
}

export default App;
