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

export const NoValidator = { validate : {} };
export enum ChannelType {
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
export type Brand<K, T> = K & { __brand: T }
export type Name = Brand<string, 'Must be name'>
export type Description<_ extends ApplicationCommandOptionType> = Brand<string, 'Must be description'>

export interface BaseOption {
    type: ApplicationCommandOptionType
    name: string,
    description: string,
    autocomplete?: boolean,
    name_localizations?: unknown, //todo
    choice?: Choice<Choiceable>[] //todo
    options?: BaseOption[],
    channel_types?: ChannelType[],
    min_value?: number;
    max_value?: number;
    min_length?: number;
    max_length?: number;
}

interface OptionTypeToPrimitive {
    [ApplicationCommandOptionType.Number]: number;
    [ApplicationCommandOptionType.String]: string;
    [ApplicationCommandOptionType.Integer]: number;
}
export type Choiceable = 
    | ApplicationCommandOptionType.String  
    | ApplicationCommandOptionType.Number 
    | ApplicationCommandOptionType.Integer;


export interface Choice<T extends Choiceable> {
    name: string,
    value: OptionTypeToPrimitive[T] 
}

export interface Validators {
    [ApplicationCommandOptionType.Number]: { min_value?: number; max_value?: number }
    [ApplicationCommandOptionType.String]: { max_length?: number; min_length?: number },
}

