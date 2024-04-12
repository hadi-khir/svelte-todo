import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export function useStorage<Value>(
	key: string,
	initialValue: Value
): Writable<Value> {
	const serialize = JSON.stringify;
	const deserialize = JSON.parse;

	const storedValue: Value = deserialize(localStorage.getItem(key) ?? '{}');

	const store = writable(storedValue ? storedValue : initialValue);

	store.subscribe((value) => localStorage.setItem(key, serialize(value)));

	return store;
}
