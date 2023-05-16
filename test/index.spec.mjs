import * as assert from 'node:assert/strict';

import { str, name , description, Flags, choice, identity, subcommand, ApplicationCommandOptionType, subcommandgroup } from '../dist/index.js'



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

assert.deepEqual(
    str(
        name("option"),
        description("option"),
        {},
        Flags.Nsfw | Flags.Required
    ),
    {
        type: 3,
        name: "option",
        description: "option",
        nsfw: true,
        required: true
    }
)
assert.deepEqual(
    choice(
      str(
        name("option"),
        description("option"),
        {},
        Flags.Nsfw | Flags.Required
      ),
      [identity("option1"), identity("option2")]
    ),
    {
        type: 3,
        name: "option",
        description: "option",
        nsfw: true,
        required: true,
        choice: [
            { name: "option1", value: "option1" },
            { name: "option2", value: "option2" }
        ]
    }
);
assert.deepEqual(
    choice(
      str(
        name("option"),
        description("option"),
        {},
        Flags.Nsfw | Flags.Required
      ),
      [identity("option1"), identity("option2")]
    ),
    {
        type: 3,
        name: "option",
        description: "option",
        nsfw: true,
        required: true,
        choice: [
            { name: "option1", value: "option1" },
            { name: "option2", value: "option2" }
        ]
    }
);

assert.throws(
    () => str(
        name("bad option name"),
        description("shid")
    ),
    "name fails regex"
)

assert.throws(
    () => str(
        name("bad option name"),
        description()
    ),  
    "No description"
)

assert.deepStrictEqual(
   subcommand(
    name("eat"),
    description("eat cheese"),
    [
      str( name("gouda"), description("smoked gouda")),
      str( name("parmesan"), description("yummy parm"))
    ],
   ),
   {
    type: ApplicationCommandOptionType.Subcommand,
    name: "eat",
    description: "eat cheese",
    options: [
     { name: "gouda", description: "smoked gouda", type: 3 },
     { name: "parmesan", description: "yummy parm", type: 3 },
    ]
   }

)

assert.deepStrictEqual(
   subcommandgroup(
    name("eat"),
    description("eat cheese"),
    [
      subcommand(
        name("eat"),
        description("eat cheese"),
        [
           str( name("gouda"), description("smoked gouda")),
           str( name("parmesan"), description("yummy parm"))
        ]
      ),
    ],
   ),
   {
    type: ApplicationCommandOptionType.SubcommandGroup,
    name: "eat",
    description: "eat cheese",
    options: [
     { 
        name: "eat",
        description: "eat cheese",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
            str( name("gouda"), description("smoked gouda")),
            str( name("parmesan"), description("yummy parm"))
        ]
     }
    ]
   }

)
console.log("OK")
