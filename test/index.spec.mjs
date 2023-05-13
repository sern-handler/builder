import * as assert from 'node:assert/strict';

import { str, name , description } from '../dist/index.js'



assert.deepEqual(
    str(
        name("option"),
        description("a string option")
    ),
    {
        name: "option",
        description: "a string option",
        type: 3 
    }
);


assert.deepEqual(
    str(
        name("option"),
        description("a string option"),
        { validate: { max_length: 10, min_length: 0 } }
    ),
    {
        name: "option",
        description: "a string option",
        type: 3,
        max_length: 10,
        min_length: 0
    }
)

assert.throws(
    () => str(
        name("bad option name"),
        description("shid")
    )
)

assert.throws(
    () => str(
        name("bad option name"),
        description()
    )
)

console.log("OK")
