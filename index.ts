import * as assert from 'node:assert';

export enum Flags {
    None = 0,
    Required = 1 << 0,
    Autocomplete = 1 << 1,
    Nsfw = 1 << 2
}
export enum ApplicationCommandOptionType {
    Subcommand = 1,
    SubcommandGroup = 2,
    String = 3,
    Integer = 4,
    Boolean = 5,
    User = 6,
    Channel = 7,
    Role = 8,
    Mentionable = 9,
    Number = 10,
    Attachment = 11
}
export declare enum ChannelType {
    /**
     * A text channel within a guild
     */
    GuildText = 0,
    /**
     * A direct message between users
     */
    DM = 1,
    /**
     * A voice channel within a guild
     */
    GuildVoice = 2,
    /**
     * A direct message between multiple users
     */
    GroupDM = 3,
    /**
     * An organizational category that contains up to 50 channels
     *
     * See https://support.discord.com/hc/articles/115001580171
     */
    GuildCategory = 4,
    /**
     * A channel that users can follow and crosspost into their own guild
     *
     * See https://support.discord.com/hc/articles/360032008192
     */
    GuildAnnouncement = 5,
    /**
     * A temporary sub-channel within a Guild Announcement channel
     */
    AnnouncementThread = 10,
    /**
     * A temporary sub-channel within a Guild Text or Guild Forum channel
     */
    PublicThread = 11,
    /**
     * A temporary sub-channel within a Guild Text channel that is only viewable by those invited and those with the Manage Threads permission
     */
    PrivateThread = 12,
    /**
     * A voice channel for hosting events with an audience
     *
     * See https://support.discord.com/hc/articles/1500005513722
     */
    GuildStageVoice = 13,
    /**
     * The channel in a Student Hub containing the listed servers
     *
     * See https://support.discord.com/hc/articles/4406046651927
     */
    GuildDirectory = 14,
    /**
     * A channel that can only contain threads
     */
    GuildForum = 15,
    /**
     * A channel that users can follow and crosspost into their own guild
     *
     * @deprecated This is the old name for {@apilink ChannelType#GuildAnnouncement}
     *
     * See https://support.discord.com/hc/articles/360032008192
     */
    GuildNews = 5,
    /**
     * A temporary sub-channel within a Guild Announcement channel
     *
     * @deprecated This is the old name for {@apilink ChannelType#AnnouncementThread}
     */
    GuildNewsThread = 10,
    /**
     * A temporary sub-channel within a Guild Text channel
     *
     * @deprecated This is the old name for {@apilink ChannelType#PublicThread}
     */
    GuildPublicThread = 11,
    /**
     * A temporary sub-channel within a Guild Text channel that is only viewable by those invited and those with the Manage Threads permission
     *
     * @deprecated This is the old name for {@apilink ChannelType#PrivateThread}
     */
    GuildPrivateThread = 12
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


type Brand<K, T> = K & { __brand: T }
type Name = Brand<string, 'Must be name'>
type Description<_ extends ApplicationCommandOptionType> = Brand<string, 'Must be description'>

interface BaseOption {
    type: ApplicationCommandOptionType
    name: string,
    description: string,
    autocomplete?: boolean,
    name_localizations?: unknown,
    choice?: {}[] //todo
    options?: BaseOption[],
    channel_types?: ChannelType[],
    min_value?: number;
    max_value?: number;
    min_length?: number;
    max_length?: number;
}



interface Validators {
    [ApplicationCommandOptionType.Number]: { min_value?: number; max_value?: number }
    [ApplicationCommandOptionType.String]: { max_length?: number; min_length?: number },
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
type Choiceable = 
    | ApplicationCommandOptionType.String  
    | ApplicationCommandOptionType.Number 
    | ApplicationCommandOptionType.Integer;


export function str<T extends ApplicationCommandOptionType.String>(
    name: Name,
    description: Description<T>,
    validators?: { validate: Validators[T] },
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


export function integer(
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


