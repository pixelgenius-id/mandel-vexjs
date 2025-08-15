import { TextDecoder, TextEncoder } from 'util';
import * as ser from "../vexjs-serialize";
import {SerialBuffer} from "../vexjs-serialize";
const transactionAbi = require('../transaction.abi.json');

// setup shared buffer re-established before every test
let buffer: SerialBuffer;
describe('Strict Deserialization Tests', () => {
    let textEncoder = new TextEncoder();
    let textDecoder = new TextDecoder();
    let transactionType: Map<string, ser.Type> = ser.getTypesFromAbi(ser.createInitialTypes(), transactionAbi);

    beforeEach( () => {
        buffer = new ser.SerialBuffer({
            textEncoder: textEncoder,
            textDecoder: textDecoder,
        });
    });

    it('out of range int8 128', () => {
        expect (() => {
            const hex = "80";
            const type = "int8";
            buffer.pushArray(ser.hexToUint8Array(hex));
            const thisType = ser.getType(transactionType, type);
            const testValue: number = thisType.deserialize(buffer);
            expect(testValue).toBeTruthy();
        }).toThrow();
    });

    it('out of range int8 -129', () => {
        expect ( () => {
            const hex = "7FFF";
            const expected = "-129";
            const type = "int8";
            buffer.pushArray(ser.hexToUint8Array(hex));
            const thisType = ser.getType(transactionType, type);
            const testValue: number = thisType.deserialize(buffer);
            expect(expected).toBeTruthy();
        }).toThrow();
    });

    it('out of range uint8 256', () => {
        expect ( () => {
            const hex = "0001";
            const expected = "256";
            const type = "uint8";
            buffer.pushArray(ser.hexToUint8Array(hex));
            const testValue = transactionType.get(type).deserialize(buffer);
            expect(expected).toBeTruthy();
        }).toThrow();
    });



});