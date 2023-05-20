import * as assert from 'node:assert';
import { BaseOption, Choice, Choiceable, Description, Name, NoValidator, Validators, Subcommand, SubcommandGroup } from './types';
import { ApplicationCommandOptionType } from 'discord-api-types/v10'

export enum Flags {
    None = 0,
    Required = 1 << 0,
    Autocomplete = 1 << 1,
    Nsfw = 1 << 2
}
function mapFlags(flags: Flags): Record<string,unknown> {
    const output: Record<string,unknown> = {};

    if (flags & Flags.Required) {
        output.required = true;
    }

    if (flags & Flags.Autocomplete) {
        output.autocomplete = true;
    }

    if (flags & Flags.Nsfw) {
        output.nsfw = true;
    }

    return output;
}


function baseOption<T extends ApplicationCommandOptionType>(
    type: T,
    name: string,
    description: string,
    flags: Flags,
    other: Record<string, unknown> = {}
): BaseOption {
    return {
        type,
        name,
        description,
        ...mapFlags(flags),
        ...other 
    }
}
export function identity(name: string) {
    return { name, value: name };
}
export function choice<T extends Choiceable>( 
   choiceable: BaseOption & { type: T },
   choices: Choice<T>[]
): BaseOption {
    assert.notEqual(choiceable.autocomplete, true, "Cannot have autocomplete set to true with choices enabled")
    choiceable.choice = choices;
    return choiceable;
}
export function str<T extends ApplicationCommandOptionType.String>(
    name: Name,
    description: Description<T>,
    validators: { validate: Validators[T] } = NoValidator,
    flags: Flags = Flags.None,
) {
    return baseOption(ApplicationCommandOptionType.String, name, description, flags, validators?.validate);
}


export function num<T extends ApplicationCommandOptionType.Number>(
    name: Name,
    description: Description<T>,
    validators: { validate: Validators[T] },
    flags: Flags = Flags.None,
) {
    return baseOption(
        ApplicationCommandOptionType.Number,
        name,
        description,
        flags,
        validators.validate
    );
}

export function attachment(
    name: Name,
    description: Description<ApplicationCommandOptionType.Attachment>,
    flags: Flags
)
 {
    return baseOption(
        ApplicationCommandOptionType.Attachment,
        name,
        description,
        flags
    )
}


export function int(
    name: Name,
    description: Description<ApplicationCommandOptionType.Integer>,
    validators: { validate: Validators[ApplicationCommandOptionType.Number] },
    flags: Flags

) {
    return baseOption(
        ApplicationCommandOptionType.Integer,
        name,
        description,
        flags,
        validators.validate
    );
}

export function user(
    name: Name,
    description: Description<ApplicationCommandOptionType.User>,
    flags: Flags

) {
    return baseOption(
        ApplicationCommandOptionType.User,
        name,
        description,
        flags
    );
}

export function channel(
    name: Name,
    description: Description<ApplicationCommandOptionType.Channel>,
    flags: Flags

) {
    return baseOption(
        ApplicationCommandOptionType.Channel,
        name,
        description,
        flags
    );
}
export function mentionable(
    name: Name,
    description: Description<ApplicationCommandOptionType.Mentionable>,
    flags: Flags

) {
    return baseOption(
        ApplicationCommandOptionType.Mentionable,
        name,
        description,
        flags
    );
}

export function name(v: string): Name {
    //idk if unicode flag is set yet!
    assert.match(v, /^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$/gu, v + " does not match a valid command name")
    return v as Name;
}


export function description<T extends ApplicationCommandOptionType>(args: string) {
    assert.ok(0 <= args.length && args.length <= 100) 
    return args as unknown as Description<T>;
}

export function subcommand(
    name: Name,
    description: Description<ApplicationCommandOptionType.Subcommand>,
    options: BaseOption[] = [],
    flags: Flags = Flags.None
) {
   assert.ok(!(flags & (Flags.Autocomplete | Flags.Required)), "Cannot have autocomplete or required flag on subcommand");
   return baseOption(
        ApplicationCommandOptionType.Subcommand,
        name,
        description,
        flags,
        { options }
    ) as Subcommand;
}

export function subcommandgroup(
    name: Name,
    description: Description<ApplicationCommandOptionType.Subcommand>,
    options: (BaseOption & { type: ApplicationCommandOptionType.Subcommand })[],
    flags: Flags = Flags.None
) {
    assert.ok(!(flags & (Flags.Autocomplete | Flags.Required)), "Cannot have autocomplete or required flag on subcommandgroup");
    assert.ok(options.every(t => t.type === ApplicationCommandOptionType.Subcommand))
    return baseOption(
        ApplicationCommandOptionType.SubcommandGroup,
        name,
        description,
        flags,
        { options }
    ) as SubcommandGroup;
}
// for sern only
export function autocomplete<T>(b: BaseOption, cb: (args: T) => PromiseLike<unknown> | unknown ) {
    if(!b.autocomplete) {
       b.autocomplete = true    
    }
    return {
        ...b,
        command: {
            onEvent: [],
            execute: cb
        }
    }

}

export { Choice, NoValidator, BaseOption, SubcommandGroup, Subcommand };
