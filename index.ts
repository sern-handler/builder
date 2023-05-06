import * as assert from 'node:assert';

enum Flags {
    Required = 1 << 0,
    Autocomplete = 1 << 1,
    Nsfw = 1 << 2
}

type Brand<K, T> = K & { __brand: T }
type Name = Brand<string, 'Must be name'>
type Description = Brand<string, 'Must be description'>
function baseOption(
    type: number,
    name: string,
    description: string,
    flags: number
) {
    return { type, name, description }
}

function str(
    name: Name,
    description: Description,
    flags: number,
) {
    return baseOption(3, name, description, flags);
}

function num(
    name: Name,
    description: Description,
    flags: number,
) {
    return baseOption(10, name, description, flags);
}

function name(v: string): Name {
    assert.match(v, /^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$/, v + " does not match a command name")
    return v as Name;
}
type For = 'menus' | 'other';
function description<T extends For>(v: T extends 'menus' ? '' : string) : Description {
    assert.ok(0 < v.length && v.length < 100) 
    return v as unknown as Description;
}
