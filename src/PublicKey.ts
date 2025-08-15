/*
 * Copyright (c) 2025 pixelgeniusid and its contributors.  All rights reserved.
 * Copyright (c) 2022 EOS Network Foundation (ENF) and its contributors.  All rights reserved.
 * Copyright (c) 2017-2020 block.one and its contributors.  All rights reserved.
 * MIT License
 * Oct 12, 2022 sourced from https://github.com/EOSIO/eosjs/archive/refs/tags/v22.1.0.zip
 */

import { ec as EC } from 'elliptic';
import {
    Key,
    KeyType,
    publicKeyToLegacyString,
    publicKeyToString,
    stringToPublicKey,
} from './vexjs-numeric';
import { constructElliptic } from './vexjs-key-conversions';

/** Represents/stores a public key and provides easy conversion for use with `elliptic` lib */
export class PublicKey {
    constructor(private key: Key, private ec: EC) {}

    /** Instantiate public key from an VEX-format public key */
    public static fromString(publicKeyStr: string, ec?: EC): PublicKey {
        const key = stringToPublicKey(publicKeyStr);
        if (!ec) {
            ec = constructElliptic(key.type);
        }
        return new PublicKey(key, ec);
    }

    /** Instantiate public key from an `elliptic`-format public key */
    public static fromElliptic(publicKey: EC.KeyPair, keyType: KeyType, ec?: EC): PublicKey {
        const x = publicKey.getPublic().getX().toArray('be', 32);
        const y = publicKey.getPublic().getY().toArray('be', 32);
        if (!ec) {
            ec = constructElliptic(keyType);
        }
        return new PublicKey({
            type: keyType,
            data: new Uint8Array([(y[31] & 1) ? 3 : 2].concat(x)),
        }, ec);
    }

    /** Export public key as VEXANIUM-format public key */
    public toString(): string {
        return publicKeyToString(this.key);
    }

    /** Export public key as Legacy VEX-format public key */
    public toLegacyString(): string {
        return publicKeyToLegacyString(this.key);
    }

    /** Export public key as `elliptic`-format public key */
    public toElliptic(): EC.KeyPair {
        return this.ec.keyPair({
            pub: Buffer.from(this.key.data),
        });
    }

    /** Get key type from key */
    public getType(): KeyType {
        return this.key.type;
    }

    /** Validate a public key */
    public isValid(): boolean {
        try {
            const ellipticPublicKey = this.toElliptic();
            const validationObj = ellipticPublicKey.validate();
            return validationObj.result;
        } catch {
            return false;
        }
    }
}
