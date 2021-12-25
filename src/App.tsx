import React, {useState} from 'react';
import './App.css';
import Rect from "./components/Rect";

const App = () => {
    const [rects, setRects] = useState<number[]>([])

    const shuffle_rects = () => {
        let arr: number[] = rects.map(e => {
            return e
        })
        for (let i = 0; i < arr.length; i++){
            const j = Math.floor(Math.random() * (i + 1));
            const temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
        setRects(arr)
        console.log('iam here')
    }

    const handleChange = (e: any) => {
        let arr: number[] = []
        for (let i = 0; i < e.target.value; i++) {
            arr.push(i)
        }
        setRects(arr)
    }
    return (
        <div>
            <div>

                <button onClick={shuffle_rects}>Shuffle</button>
                <input type='range'
                       min='50'
                       max='1000'
                       value={rects.length}
                       onChange={handleChange}/>
            </div>
            <div className='rects-container'>
                {rects.map(e  => {
                  return <Rect height={e} key={e}  />
                })}
            </div>

        </div>
    )
}

export default App;
