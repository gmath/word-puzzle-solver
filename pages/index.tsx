import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import Head from 'next/head'

import {Container, Row, Button, Col} from 'react-bootstrap';

const Home: NextPage = () => {

  const [letters, setLetters] = useState<string>();
  const [length, setLength] = useState<number>();
  const [words, setWords] = useState<string[]>([]);
  const [colors, setColors] = useState<any>({});

  const solve = async () => {
    const res = await fetch(`/api/solve?letters=${letters}&length=${length}`);
    setWords(await res.json());
  }

  useEffect(() => {
    setColors({});
    setWords([]);
  }, [length, letters]);

  const onClick = (i:number) => {
    setColors((prevColors:any) => {
      return {
        ...prevColors,
        [i]: true,
      }
    });
  }

  return (
    <div>
      <Head>
        <title>Word Puzzle Solver</title>
      </Head>

      <h1 className="flex justify-center">
        Word Puzzle Solver
      </h1>

      <Container>
        <Row>
          <div className="flex flex-col">
            <input 
              type="text"
              defaultValue={letters} 
              className="border p-2 m-2" 
              onChange={(e) => setLetters(e.target.value)}
              placeholder="abcde"
            />
            <input 
              type="number" 
              defaultValue={length} 
              className="border p-2 m-2" 
              onChange={(e) => setLength(parseInt(e.target.value))} 
              placeholder="Enter length of target word"
            />
          </div>
        </Row>
        <Row>
          <div className="flex flex-col">
            <Button className="mt-2 m-1" onClick={solve}>Solve</Button>
          </div>
        </Row>
        <Row>
          <ul className="mt-2">
            {words.map((word, i) => {
              return <li key={word} className={`flex justify-center border-2 p-1 m-1 ${colors[i] ? "bg-green-100" : ""}`} onClick={() => onClick(i)}>{word}</li>
            })}
          </ul>
        </Row>
      </Container>
    </div>
  )
}

export default Home;
