#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { runHook } from './policy.mjs';
const event = process.argv[2];
try {
  if (!['PreToolUse', 'PostToolUse', 'Stop'].includes(event)) throw new Error('Unsupported hook event');
  const input = JSON.parse(readFileSync(0, 'utf8'));
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid hook input');
  console.log(JSON.stringify(runHook(event, input)));
} catch (error) {
  if (event === 'PreToolUse') console.log(JSON.stringify({ hookSpecificOutput: { hookEventName: event, permissionDecision: 'deny', permissionDecisionReason: error.message } }));
  else console.log(JSON.stringify({ systemMessage: `design-harness hook failed: ${error.message}` }));
}
