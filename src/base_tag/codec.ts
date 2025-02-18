// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import { Codec } from "../types.ts";
import {
  EncoderWithStats,
  withStatsEncoder,
  withUnsignedSupportEnabled,
} from "../vlq.ts";
import { decode } from "./decode.ts";
import { encode } from "./encode.ts";

const encoder = new EncoderWithStats();

export const CODEC: Codec = {
  name: "Base (tag)",
  description: `Same as "Base" but with various changes on top combined:
  * encode generated lines as VLQ rather than ";"
  * add a tag to signify items
  * combine items into a single "scopes" field
  * split variables/bindings into standalone items`,
  encode: withStatsEncoder(encoder, withUnsignedSupportEnabled(encode)),
  decode: withUnsignedSupportEnabled(decode),
  dumpVlqHistograms: encoder.dumpVlqHistograms.bind(encoder),
};
