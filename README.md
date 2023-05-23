
# @sern/option

`@sern/option` is a TypeScript library that provides a type-safe and declarative builder to create options data for the Discord API.

## Installation

You can install `@sern/option` using npm or yarn:

```bash
npm install @sern/option
```
or

```bash
yarn add @sern/option
```

## Features

- Type-safe options builder: Create options for the Discord API with full type checking.
- Declarative and minimal syntax: Build options using a clean and intuitive syntax.
- Supports all option types: String, number, attachment, integer, user, channel, and mentionable and subcommands
- Validates data: checks names and description based on Discord Api regexes

## Usage

Here's an example of how to use `@sern/option` to create a subcommandgroup structure for the Discord API:

```javascript
import { str, name, description, NoValidator, Flags, subcommandgroup, subcommand } from '@sern/option';

const tree = subcommandgroup(
        name('group'),
        description('bunch of subcommands'),
        [
            subcommand(
                name("first"),
                description("second"),
                [
                 str(
                  name("choose"),
                  description("pick one of the following"),
                  NoValidator,
                  Flags.Required | Flags.Autocomplete),
                ]
            )]
        ) 
```

## Contributing

Contributions to `@sern/option` are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/sern-handler/option).

Before contributing, please make sure to read the [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for using `@sern/option`! If you have any questions or need further assistance, please feel free to reach out.
