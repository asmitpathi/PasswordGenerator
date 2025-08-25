import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength]= useState(8);
  const [numberAllowed, setNumberAllowed]= useState(false);
  const [charAllowed, setCharAllowed]= useState(false);
  const [password, setPassword]= useState("");

  const passwordRef= useRef(null);

  const generatePassword= useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed){
      str+="0123456789";
    }
    if(charAllowed){
      str+="!@#$%^&*()_+=-[]{}\|;?/><.,~`"
    }

    for(let i=0; i<length; i++){
      let charIndex=Math.floor(Math.random()*str.length);
      pass+= str.charAt(charIndex);
    }

    setPassword(pass);
    
  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(()=>{
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();  //The ?. means only call this if passwordRef.current is not null/undefined
    passwordRef.current?.setSelectionRange(0,51);
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className='w-full h-auto max-w-md mx-auto shadow-md rounded-lg p-5 py-3 my-60 bg-gray-700 text-orange-800 font flec justify-center '>
        <h1 className="text-center text-white my-3 font-bold text-2xl">Password Generator</h1>
        <div className='flex rounded-lg overflow-hidden shadow-lg mb-4'>
          <input 
          type="text" 
          value={password}
          placeholder='Password'
          className='outline-none w-full py-1 px-3 bg-white'
          readOnly
          ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-indigo-600 text-white px-3 py-0.5 shrink-0 cursor-pointer hover:bg-indigo-700' >Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-2'>
            <input 
            type="range"
            min={6}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{
              setLength(e.target.value)
            }}  
            />
            <label className='text-orange-400'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input 
            type="checkbox" 
            checked={numberAllowed}
            id='numberInput'
            onChange={()=>{
              setNumberAllowed(prev=>!prev);
            }}
            />
            <label className='text-orange-400'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input 
            type="checkbox" 
            checked={charAllowed}
            id='charInput'
            onChange={()=>{
              setCharAllowed(prev=>!prev);
            }}
            />
            <label className='text-orange-400'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
