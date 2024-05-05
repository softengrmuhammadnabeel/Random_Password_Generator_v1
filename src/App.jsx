import { useCallback, useEffect, useRef } from "react";
import { useState } from "react"


function App() {

  const [Length, setLength] = useState(8)
  const [IsNumberAllowed, setNumberAllowed] = useState(false);
  const [IsCharacterAllowed, setCharacterAllowed] = useState(false);
  const [Password, setPassword] = useState('');

  // ref in initial there is no ref in paswordRef
  const passwordRef = useRef(null)

  // useCallback is a react hook which let you fn def in cache mem bw re-renders 


  const PasswordGen = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    // if something is allowed add them in the str for password generation in future
    IsNumberAllowed ? str += '0123456789' : ''
    IsCharacterAllowed ? str += '!@#$%^&*()_+"?}{' : ''
    // console.log(str);

    for (let i = 0; i < Length; i++) {
      let RandomNum = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(RandomNum)
    }

    setPassword(pass)


    console.log(pass);
    // if change in anyting to optimize the method in cache
  }, [Length, IsNumberAllowed, IsCharacterAllowed, setPassword])

  // callback for copy the password
  const CopyPasswordToClipBoard = useCallback(() => {

    window.navigator.clipboard.writeText(Password);
    const input = passwordRef.current;

    // Select the text in the input field
    input.select();
    setTimeout(()=>{
      input.selectionStart=0;
      input.selectionEnd=0;
    },1000)



  }, [setPassword]);


  // useEffect 
  useEffect(() => {
    PasswordGen()
    // if change in anything to run the method 
  }, [PasswordGen, IsCharacterAllowed, IsNumberAllowed, Length])




  return (
    <>
      <div className="grid grid-cols-1 max-w-xl mx-auto bg-black  rounded-lg my-20 p-10" >
        <h1 className="text-3xl text-center font-bold text-white pb-5">Password Generator</h1>
        <div className="w-full mx-auto text-center px-2 py-2 flex flex-row ">
          <input type="text"
            value={Password}
            placeholder="Password"
            readOnly
            ref={passwordRef}  //now we have ref of this input field in passwordRef 
            className="w-full rounded-l-md outline-none px-4 py-1" />


          <button
            className="text-white bg-sky-500 rounded-r-md px-4 py-1 font-bold"
            onClick={CopyPasswordToClipBoard}

          >Copy</button>
        </div>

        <div className=" flex w-full px-2 py-2 gap-3 item-center">

          <div>
            <input type="range" min={8} max={30}
              value={Length}
              onChange={(e) => { setLength(e.target.value) }}
            />


            <label className="text-white"> Length : {Length}</label>
          </div>

          <div>
            <input type="checkbox"
              defaultChecked={IsNumberAllowed}
              // previous value will not remains 
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label className="text-white">Number</label>
          </div>

          <div>
            <input type="checkbox"
              defaultChecked={IsCharacterAllowed}
              // previous value will not remains
              onChange={() => {
                setCharacterAllowed((prev) => !prev)
              }}
            />

            <label className="text-white">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
