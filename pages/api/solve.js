
import {words} from './words.js';

const countByLetter = (word) => Array.from(word).reduce((acc, letter) => {
    if (Object.keys(acc).includes(letter)) {
        acc[letter] += 1;
    } else {
        acc[letter] = 1;
    }
    return acc;
}, {});

const canUse = (word, allowedLetters) => {
    const countMap = countByLetter(word);
    
    return Object.entries(countMap).every(([letter, count]) => {
        return allowedLetters[letter] && count <= allowedLetters[letter]
    });
}

const findCandidates = (length, letters, words) => {
    const allowedLetters = countByLetter(letters);
    const wordList = words.filter(word => word.length === length);
    return wordList.filter(word => canUse(word, allowedLetters));
}


async function solve(letters, length) {
    return findCandidates(length, letters, words);
}

async function handler(req, res) {
    if ( req.method === "GET" ) {
        const {letters, length} = req.query
        const words = await solve(letters, JSON.parse(length));
        return res.status(200).send(words);
    }
    return res.status(422).send('method not supported');
};

export default handler;