import { ApplicationCommandOptionType, ChannelType, LocalizationMap } from "discord-api-types/v10";


export const NoValidator = { validate : {} };

export type Brand<K, T> = K & { __brand: T }
export type Name = Brand<string, 'Must be name'>
export type Description<_ extends ApplicationCommandOptionType> = Brand<string, 'Must be description'>

export interface BaseOption {
    type: ApplicationCommandOptionType
    name: string,
    description: string,
    description_localizations?: LocalizationMap | null;
    autocomplete?: boolean,
    name_localizations?: LocalizationMap | null, 
    choice?: Choice<Choiceable>[] 
    options?: BaseOption[],
    channel_types?: ChannelType[],
    min_value?: number;
    max_value?: number;
    min_length?: number;
    max_length?: number;
}
export interface Subcommand extends BaseOption {
    type: ApplicationCommandOptionType.Subcommand,
    name: string;
    description: string;
    min_value?: never;
    autocomplete?: false;
    max_value?: never;
    min_length?: never;
    max_length?: never;
}

export interface SubcommandGroup extends BaseOption {
    type: ApplicationCommandOptionType.SubcommandGroup,
    name: string;
    description: string;
    options?: Subcommand[]
    min_value?: never;
    autocomplete?: false;
    max_value?: never;
    min_length?: never;
    max_length?: never;
    required?: never;
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

